"use client";

import Image from "next/image";
import Nav from "../../components/nav";

export default function Home() {
  return (
    <div>
      <Nav />
      <h1>Cafeteria</h1>
      <div>
        <h2>Give us your Input!</h2>
        <p>Tell us what you'd like to see in the vending machine.</p>
        <input type="text" placeholder="Your suggestion here..." />
        <button>Submit</button>
      </div>
    </div>
  );
}
