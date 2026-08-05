import React from "react";
import navbarData from "../components/data/Navbar.json";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#050816]/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-white">

        {/* Logo */}

        <div className="font-bold tracking-[0.2em] flex flex-row items-center gap-x-2">
          <div className="text-cyan-300">{navbarData.logo}</div>
          <div className="text-white text-xs text-align-bottom">{navbarData.subs}</div>
        </div>

        {/* Navigation */}

        <div className="hidden gap-6 md:flex">

          {navbarData.links.map((link) => (

            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-cyan-300"
            >
              {link.title}
            </a>

          ))}

        </div>

      </nav>
    </header>
  );
}