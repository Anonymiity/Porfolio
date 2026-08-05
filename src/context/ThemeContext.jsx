import React, { createContext, useContext, useState, useEffect } from "react";

const themes = [
  // { id: "midnight-neon", name: "Midnight Neon", icon: "🌙" },
  // { id: "desert-mirage", name: "Desert Mirage", icon: "🏜️" },
  // { id: "cosmic-blush", name: "Cosmic Blush", icon: "💜" },
  // { id: "vintage-vinyl", name: "Vintage Vinyl", icon: "🎵" },
  // { id: "velvet-moss", name: "Velvet Moss", icon: "🌿" },
  // { id: "copper-mine", name: "Copper Mine", icon: "⛏️" },
  // { id: "lemon-matcha", name: "Lemon Matcha", icon: "🍵" },
  // { id: "lavender-mist", name: "Lavender Mist", icon: "💐" },
  // { id: "vanilla-espresso", name: "Vanilla Espresso", icon: "☕" },

  { id: "midnight-neon", name: "Midnight Neon", icon: "🌙" },
  { id: "iron-core", name: "Iron Core", icon: "⚙️" },
  { id: "spider-verse", name: "Spider-Verse", icon: "🕷️" },
  { id: "deep-space", name: "Deep Space", icon: "🌌" },
  { id: "royal-gujarat", name: "Royal Gujarat", icon: "🪔" },
  { id: "arabian-nights", name: "Arabian Nights", icon: "🌙" },
  { id: "sakura-bloom", name: "Sakura Bloom", icon: "🌸" },
  { id: "forest-temple", name: "Forest Temple", icon: "🌿" },
  { id: "phoenix-fire", name: "Phoenix Fire", icon: "🔥" },
  { id: "ocean-depth", name: "Ocean Depth", icon: "🌊" }
];

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("portfolio-theme") || "midnight-neon";
    }
    return "midnight-neon";
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes, dropdownOpen, setDropdownOpen }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};