"use client";

import { useState, FormEvent } from "react";
import { Molle, Oooh_Baby } from "next/font/google";
import Nav from "../../components/nav";
import { supabase } from "../../lib/supabase";

const molle = Molle({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

const ooohBaby = Oooh_Baby({
  subsets: ["latin"],
  weight: "400",
});

const MACHINE_NAME = "Cafeteria";

export default function Home() {
  const [suggestion, setSuggestion] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = suggestion.trim();
    if (!trimmed) return;

    setStatus("submitting");

    const { error } = await supabase.rpc("suggest_machine_item", {
      p_machine_name: MACHINE_NAME,
      p_item_name: trimmed,
      p_category: "snack",
    });

    if (error) {
      console.error("Failed to submit suggestion:", error);
      setStatus("error");
      return;
    }

    setSuggestion("");
    setStatus("success");
  }

  return (
    <div className="flex flex-col min-h-screen bg-red-900">
      <Nav />
      <div className="flex-1 flex flex-col items-center px-4 pt-8">
        <h1
          className={`${molle.className} mt-8 text-5xl text-gray-50 mb-8 text-stroke`}
        >
          Cafeteria
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-gray-50 rounded-3xl shadow-lg p-6 flex flex-col items-center text-center"
        >
          <h2 className={`${molle.className} text-2xl text-red-950`}>
            Give us your Input!
          </h2>
          <p
            className={`${ooohBaby.className} text-gray-950 text-sm mt-2 font-bold`}
          >
            What would you like to see in the vending machine?
          </p>
          <input
            type="text"
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            className="w-full bg-gray-100 rounded-full px-4 py-3 mt-6 inset-shadow-sm text-gray-950 text-center text-m"
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className={`${molle.className} bg-red-950 text-gray-50 px-8 py-2 rounded-full mt-6 disabled:opacity-50`}
          >
            Submit
          </button>
          {status === "success" && (
            <p className="text-green-700 text-xs mt-3">
              Thanks for your suggestion!
            </p>
          )}
          {status === "error" && (
            <p className="text-red-700 text-xs mt-3">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
      <footer className="text-center text-gray-50 text-xs py-4 bg-red-950">
        © North Hill Holdings LLC. All Rights Reserved.
      </footer>
    </div>
  );
}
