import React, { useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { Palette, ChevronDown, Check } from "lucide-react";
import navbarData from "../components/data/Navbar.json";

export default function Navbar() {
  const { theme, setTheme, themes, dropdownOpen, setDropdownOpen } = useTheme();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setDropdownOpen]);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] bg-[var(--bg-primary)]/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-[var(--text-primary)]">
        {/* Logo */}
        <div className="font-bold tracking-[0.2em] flex flex-row items-center gap-x-2">
          <div className="text-[var(--accent-primary)] font-extrabold">{navbarData.logo}</div>
          <div className="text-[var(--text-primary)] text-xs text-align-bottom">{navbarData.subs}</div>
        </div>

        {/* Navigation */}
        <div className="hidden gap-6 md:flex items-center">
          {navbarData.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-[var(--accent-primary)]"
            >
              {link.title}
            </a>
          ))}
        </div>

        {/* Theme Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--accent-secondary)_30%,transparent)] bg-[color-mix(in_srgb,var(--accent-secondary)_10%,transparent)] px-4 py-2 text-sm font-medium text-[var(--accent-primary)] transition hover:bg-[color-mix(in_srgb,var(--accent-secondary)_20%,transparent)]"
          >
            <Palette size={16} />
            <span className="hidden sm:inline">Theme</span>
            <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 max-h-80 overflow-y-auto scrollbar-none rounded-2xl border border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] bg-[var(--bg-secondary)] shadow-2xl backdrop-blur-xl overflow-hidden">
              <div className="p-2 space-y-1">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setDropdownOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                      theme === t.id
                        ? "bg-[color-mix(in_srgb,var(--accent-secondary)_15%,transparent)] text-[var(--accent-primary)]"
                        : "text-[var(--text-secondary)] hover:bg-[color-mix(in_srgb,var(--text-primary)_5%,transparent)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    <span className="text-lg">{t.icon}</span>
                    <span className="flex-1 font-medium">{t.name}</span>
                    {theme === t.id && <Check size={16} className="text-[var(--accent-primary)]" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}