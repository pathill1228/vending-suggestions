"use client";

import Image from "next/image";
import { Slant as Hamburger } from "hamburger-react";

export default function Nav() {
  return (
    <nav className="bg-red-950 p-4 text-red-50 flex flex-row justify-between items-center">
      <Image
        src="/SwauLogo.png"
        alt="Swau Logo"
        width={50}
        height={50}
        className="inline-block mr-2"
      />
      <Hamburger size={20} />
    </nav>
  );
}
