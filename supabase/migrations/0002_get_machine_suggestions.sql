-- Run this in the Supabase SQL editor (Database > SQL Editor).
--
-- Returns all suggestions for a given machine, most-suggested first.
-- SECURITY DEFINER so it can read machine_suggestions/machines even though
-- anon has no direct select grant on those tables (see 0001).

create or replace function get_machine_suggestions(p_machine_name text)
returns table (
  item_name text,
  category text,
  suggestion_count int,
  created_at timestamptz,
  updated_at timestamptz
)
language sql
security definer
set search_path = public
as $$
  select ms.item_name, ms.category, ms.suggestion_count, ms.created_at, ms.updated_at
  from machine_suggestions ms
  join machines m on m.id = ms.machine_id
  where m.name = p_machine_name
  order by ms.suggestion_count desc;
$$;
