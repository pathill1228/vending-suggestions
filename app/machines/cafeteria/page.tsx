"use client";

import { Molle, Oooh_Baby } from "next/font/google";
import Nav from "../../components/nav";

const molle = Molle({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

const ooohBaby = Oooh_Baby({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-red-900">
      <Nav />
      <div className="flex-1 flex flex-col items-center px-4 pt-8">
        <h1
          className={`${molle.className} mt-10 text-5xl text-gray-50 mb-6 text-stroke`}
        >
          Cafeteria
        </h1>
        <div className="w-full max-w-sm bg-gray-50 rounded-3xl shadow-lg p-6 flex flex-col items-center text-center">
          <h2 className={`${molle.className} text-2xl text-red-950`}>
            Give us your Input!
          </h2>
          <p
            className={`${ooohBaby.className} text-gray-500 text-sm mt-2 font-bold`}
          >
            What would you like to see in the vending machine?
          </p>
          <input
            type="text"
            className="w-full bg-gray-100 rounded-full px-4 py-3 mt-6 inset-shadow-sm text-gray-950 text-center text-m"
          />
          <button
            className={`${molle.className} bg-red-950 text-gray-50 px-8 py-2 rounded-full mt-6`}
          >
            Submit
          </button>
        </div>
      </div>
      <footer className="text-center text-gray-50 text-xs py-4 bg-red-950">
        © North Hill Holdings LLC. All Rights Reserved.
      </footer>
    </div>
  );
}
