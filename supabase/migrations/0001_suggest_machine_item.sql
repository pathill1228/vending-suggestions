-- Run this in the Supabase SQL editor (Database > SQL Editor).
--
-- Defines suggest_machine_item, called by the suggestion forms to insert a
-- new suggestion or, if the same item was already suggested for a machine,
-- increment its suggestion_count instead of creating a duplicate row.
--
-- SECURITY DEFINER makes the function run with the privileges of whoever
-- owns it (normally the postgres/table-owner role) rather than the calling
-- anon role, so it can:
--   1. read the `machines` table to resolve a machine name to its id, and
--   2. write to machine_suggestions
-- even though anon has no direct select/insert/update grant on either table.
-- Anon only gets to write through this exact insert/increment logic, and
-- only ever reads a machine's id indirectly by name -- never arbitrary rows.

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'machine_suggestions_machine_id_normalized_name_key'
  ) then
    alter table machine_suggestions
      add constraint machine_suggestions_machine_id_normalized_name_key
      unique (machine_id, normalized_name);
  end if;
end $$;

alter table machine_suggestions
  alter column category drop not null;

drop function if exists suggest_machine_item(uuid, text);
drop function if exists suggest_machine_item(uuid, text, text);
drop function if exists suggest_machine_item(text, text, text);

create or replace function suggest_machine_item(
  p_machine_name text,
  p_item_name text,
  p_category text default null
) returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_machine_id uuid;
  v_normalized text := lower(trim(p_item_name));
begin
  select id into v_machine_id from machines where name = p_machine_name;

  if v_machine_id is null then
    raise exception 'No machine found with name %', p_machine_name;
  end if;

  insert into machine_suggestions (machine_id, item_name, normalized_name, category, suggestion_count)
  values (v_machine_id, trim(p_item_name), v_normalized, p_category, 1)
  on conflict (machine_id, normalized_name)
  do update set
    suggestion_count = machine_suggestions.suggestion_count + 1,
    updated_at = now();
end;
$$;
