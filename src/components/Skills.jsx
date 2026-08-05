import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crosshair,
  Orbit,
  Zap,
  Star,
  Radio,
  Telescope,
  X,
  Clock,
  FolderOpen,
  Trophy,
  Sparkles,
  Activity,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import skillsData from "./data/Skills.json";

/* ─── Starfield Background ─── */
function Starfield() {
  const stars = useMemo(() => {
    return Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 20 + 10,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-[var(--text-primary)]"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.speed}s infinite ease-in-out alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0% { opacity: 0.2; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}

/* ─── Orbital Ring ─── */
function OrbitalRing({ radius, color, duration, reverse = false }) {
  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-20"
      style={{
        width: radius * 2,
        height: radius * 2,
        borderColor: color,
        boxShadow: `0 0 30px ${color}20, inset 0 0 30px ${color}10`,
      }}
    >
      {/* Sweeping radar line */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, ${color}30 60deg, transparent 120deg)`,
          animation: `spin ${duration}s linear infinite ${reverse ? "reverse" : ""}`,
        }}
      />
    </div>
  );
}

/* ─── Planet ─── */
function Planet({ planet, ringRadius, onSelect, isSelected, isHovered, onHover }) {
  const orbitRef = useRef(null);
  const [angle, setAngle] = useState(planet.startAngle);

  useEffect(() => {
    let raf;
    let start = performance.now();
    const duration = planet.orbitDuration * 1000;

    const animate = (now) => {
      const elapsed = now - start;
      const progress = (elapsed % duration) / duration;
      const newAngle = planet.startAngle + progress * 360;
      setAngle(newAngle);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [planet.orbitDuration, planet.startAngle]);

  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * ringRadius;
  const y = Math.sin(rad) * ringRadius;

  const isActive = isSelected || isHovered;

  return (
    <div
      ref={orbitRef}
      className="absolute left-1/2 top-1/2 pointer-events-auto"
      style={{
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        zIndex: isActive ? 50 : 10,
        transition: "z-index 0.3s",
      }}
    >
      <motion.div
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect(planet)}
        onMouseEnter={() => onHover(planet.id)}
        onMouseLeave={() => onHover(null)}
        className="relative flex cursor-pointer items-center justify-center rounded-full"
        style={{
          width: planet.size,
          height: planet.size,
          background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}88, transparent)`,
          boxShadow: isActive
            ? `0 0 40px ${planet.color}, 0 0 80px ${planet.color}60, inset 0 0 20px color-mix(in_srgb,var(--text-primary)_30%,transparent)`
            : `0 0 20px ${planet.color}80, inset 0 0 10px color-mix(in_srgb,var(--text-primary)_20%,transparent)`,
          transition: "box-shadow 0.4s ease",
        }}
      >
        {/* Planet surface texture */}
        <div
          className="absolute inset-1 rounded-full opacity-40"
          style={{
            background: `repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(0,0,0,0.3) 3px, rgba(0,0,0,0.3) 6px)`,
          }}
        />
        {/* Label */}
        <span
          className={`absolute -bottom-7 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
            isActive ? "text-[var(--text-primary)]" : "text-[var(--text-dim)]"
          }`}
        >
          {planet.name}
        </span>
        {/* Level badge */}
        <div
          className="absolute -top-3 flex h-5 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--text-primary)_20%,transparent)] bg-[color-mix(in_srgb,var(--bg-primary)_60%,transparent)] px-1.5 text-[9px] font-black text-[var(--text-primary)] backdrop-blur-sm"
        >
          L{planet.level}
        </div>
      </motion.div>

      {/* Orbit trail when active */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed"
          style={{
            width: ringRadius * 2,
            height: ringRadius * 2,
            borderColor: `${planet.color}40`,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}

/* ─── Asteroid Belt ─── */
function AsteroidBelt() {
  const asteroids = useMemo(() => {
    return skillsData.asteroids.map((name, i) => ({
      name,
      angle: (i / skillsData.asteroids.length) * 360 + Math.random() * 20,
      radius: 260 + Math.random() * 40,
      size: 4 + Math.random() * 4,
      speed: 80 + Math.random() * 40,
    }));
  }, []);

  return (
    <>
      {asteroids.map((a, i) => (
        <Asteroid key={i} {...a} />
      ))}
    </>
  );
}

function Asteroid({ name, angle, radius, size, speed }) {
  const [currentAngle, setCurrentAngle] = useState(angle);

  useEffect(() => {
    let raf;
    let start = performance.now();
    const duration = speed * 1000;

    const animate = (now) => {
      const elapsed = now - start;
      const progress = (elapsed % duration) / duration;
      setCurrentAngle(angle + progress * 360);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [angle, speed]);

  const rad = (currentAngle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;

  return (
    <div
      className="absolute left-1/2 top-1/2 group pointer-events-auto"
      style={{
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
      }}
    >
      <div
        className="rounded-full bg-[color-mix(in_srgb,var(--text-muted)_40%,transparent)] transition-all duration-300 group-hover:bg-[color-mix(in_srgb,var(--accent-secondary)_80%,transparent)] group-hover:shadow-lg group-hover:shadow-[0_0_20px_color-mix(in_srgb,var(--accent-secondary)_50%,transparent)]"
        style={{ width: size, height: size }}
        title={name}
      />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[9px] font-mono text-[var(--accent-primary)] opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none bg-[color-mix(in_srgb,var(--bg-primary)_80%,transparent)] px-1.5 py-0.5 rounded">
        {name}
      </span>
    </div>
  );
}

/* ─── Central Star (You) ─── */
function CentralStar() {
  const { star } = skillsData;

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
      {/* Outer glow rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 rounded-full bg-[color-mix(in_srgb,var(--highlight-secondary)_10%,transparent)] blur-3xl animate-pulse" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 rounded-full bg-[color-mix(in_srgb,var(--accent-secondary)_20%,transparent)] blur-2xl" />

      {/* Core */}
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[var(--highlight-primary)] via-[var(--highlight-secondary)] to-[#fef08a] shadow-[0_0_60px_color-mix(in_srgb,var(--highlight-secondary)_80%,transparent)]">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[color-mix(in_srgb,var(--text-primary)_40%,transparent)] to-transparent" />
        <span className="text-xs font-black text-[color-mix(in_srgb,var(--bg-primary)_70%,transparent)]">TL</span>
      </div>

      {/* Name ring */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
        <p className="text-sm font-bold tracking-widest text-[var(--text-primary)]">{star.name}</p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent-primary)]">{star.class}</p>
      </div>
    </div>
  );
}

/* ─── Planet Detail Overlay ─── */
function PlanetDetail({ planet, onClose }) {
  if (!planet) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="absolute left-1/2 top-1/2 z-50 w-72 -translate-x-1/2 -translate-y-1/2 sm:w-80 md:w-96"
      >
        <div
          className="relative overflow-hidden rounded-3xl border p-6 backdrop-blur-2xl"
          style={{
            borderColor: `${planet.color}50`,
            background: `linear-gradient(135deg, rgba(10,15,30,0.95), rgba(10,15,30,0.8))`,
            boxShadow: `0 0 60px ${planet.color}30, inset 0 0 30px ${planet.color}10`,
          }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-1 text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
          >
            <X size={18} />
          </button>

          {/* Planet visual */}
          <div className="flex items-center gap-4">
            <div
              className="h-14 w-14 rounded-full"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}88)`,
                boxShadow: `0 0 30px ${planet.color}`,
              }}
            />
            <div>
              <h3 className="text-2xl font-black text-[var(--text-primary)]">{planet.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    background: `${planet.color}20`,
                    color: planet.color,
                    border: `1px solid ${planet.color}50`,
                  }}
                >
                </span>
                <span className="text-xs text-[var(--text-muted)]">Level {planet.level}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="mt-5 text-sm leading-relaxed text-[var(--text-secondary)]">
            {planet.description}
          </p>

          {/* Stats */}
          <div className="mt-5 flex gap-4">
            <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
              <FolderOpen size={12} className="text-[var(--accent-secondary)]" />
              {planet.projects} projects
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
              <Clock size={12} className="text-[var(--accent-secondary)]" />
              {planet.years} years
            </div>
          </div>

          {/* Moons (tools) */}
          <div className="mt-5">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--text-dim)] mb-2">Orbiting Tools</p>
            <div className="flex flex-wrap gap-2">
              {planet.moons.map((moon) => (
                <span
                  key={moon}
                  className="rounded-full border border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] bg-[color-mix(in_srgb,var(--text-primary)_5%,transparent)] px-3 py-1 text-xs font-mono text-[var(--accent-primary)]"
                >
                  {moon}
                </span>
              ))}
            </div>
          </div>

          {/* XP bar */}
          <div className="mt-5">
            <div className="flex justify-between text-[10px] text-[var(--text-dim)] mb-1">
              <span>XP to Next Level</span>
              <span style={{ color: planet.color }}>{planet.level}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--text-primary)_5%,transparent)]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${planet.level}%`,
                  background: `linear-gradient(90deg, ${planet.color}, white)`,
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── HUD Overlay (Top Info) ─── */
function HUDOverlay() {
  const { star, systems } = skillsData;

  return (
    <div className="absolute inset-x-0 top-0 z-30 pointer-events-none px-6 py-6">
      <div className="mx-auto flex max-w-6xl justify-between">
        {/* Left: Identity */}
        <div className="pointer-events-auto">
          <div className="flex items-center gap-2">
            <Radio size={14} className="text-[var(--status-online)] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--status-online)]">
              {star.status}
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-black tracking-tight text-[var(--text-primary)]">
            {star.name}
          </h1>
          <p className="text-xs text-[var(--text-muted)]">{star.class} &bull; L{star.level}</p>
        </div>

        {/* Right: Systems */}
        <div className="hidden md:block pointer-events-auto">
          <div className="flex gap-4">
            {systems.map((sys) => (
              <div key={sys.name} className="text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--status-online)] animate-pulse" />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--status-online)]">
                    {sys.status}
                  </span>
                </div>
                <p className="text-xs font-mono text-[var(--text-secondary)]">{sys.name}</p>
                <div className="mt-1 h-1 w-16 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--text-primary)_10%,transparent)]">
                  <div
                    className="h-full rounded-full bg-[var(--status-online)]"
                    style={{ width: `${sys.load}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Bottom Controls ─── */
function BottomControls({ activeFilter, setFilter }) {
  const filters = ["ALL", "CORE", "SIM", "TECH"];

  return (
    <div className="absolute bottom-0 inset-x-0 z-30 flex justify-center pb-8">
      <div className="flex gap-2 rounded-full border border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] bg-[color-mix(in_srgb,var(--bg-primary)_40%,transparent)] p-2 backdrop-blur-xl">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f === activeFilter ? "ALL" : f)}
            className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
              activeFilter === f
                ? "bg-[color-mix(in_srgb,var(--accent-secondary)_20%,transparent)] text-[var(--accent-primary)] border border-[color-mix(in_srgb,var(--accent-secondary)_40%,transparent)]"
                : "text-[var(--text-dim)] hover:text-[var(--text-secondary)]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Mobile Skills List View ─── */
function MobileSkillsList({ planets, onSelect }) {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="md:hidden w-full px-4 pb-8 space-y-4">
      {planets.map((planet) => {
        const isExpanded = expandedId === planet.id;
        return (
          <motion.div
            key={planet.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] bg-[color-mix(in_srgb,var(--text-primary)_5%,transparent)] p-4 backdrop-blur-md"
            style={{ borderColor: isExpanded ? `${planet.color}50` : undefined }}
          >
            <button
              onClick={() => setExpandedId(isExpanded ? null : planet.id)}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-full flex-shrink-0"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}88)`,
                    boxShadow: `0 0 20px ${planet.color}60`,
                  }}
                />
                <div className="text-left">
                  <h4 className="text-lg font-bold text-[var(--text-primary)]">{planet.name}</h4>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      background: `${planet.color}20`,
                      color: planet.color,
                      border: `1px solid ${planet.color}50`,
                    }}
                  >
                    {planet.rarity}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--text-muted)]">L{planet.level}</span>
                {isExpanded ? <ChevronUp size={18} className="text-[var(--accent-secondary)]" /> : <ChevronDown size={18} className="text-[var(--text-dim)]" />}
              </div>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] mt-4 space-y-4">
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {planet.description}
                    </p>

                    <div className="flex gap-4 text-xs text-[var(--text-muted)]">
                      <span className="flex items-center gap-1">
                        <FolderOpen size={12} className="text-[var(--accent-secondary)]" />
                        {planet.projects} projects
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-[var(--accent-secondary)]" />
                        {planet.years} years
                      </span>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--text-dim)] mb-2">Orbiting Tools</p>
                      <div className="flex flex-wrap gap-2">
                        {planet.moons.map((moon) => (
                          <span
                            key={moon}
                            className="rounded-full border border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] bg-[color-mix(in_srgb,var(--text-primary)_5%,transparent)] px-3 py-1 text-xs font-mono text-[var(--accent-primary)]"
                          >
                            {moon}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] text-[var(--text-dim)] mb-1">
                        <span>Proficiency</span>
                        <span style={{ color: planet.color }}>{planet.level}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--text-primary)_5%,transparent)]">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${planet.level}%`,
                            background: `linear-gradient(90deg, ${planet.color}, white)`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── Main Skills Component ─── */
export default function Skills() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [filter, setFilter] = useState("ALL");

  const ringRadii = { 1: 140, 2: 220, 3: 300 };

  const filteredPlanets = useMemo(() => {
    if (filter === "ALL") return skillsData.planets;
    return skillsData.planets.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section
      id="skills"
      className="relative min-h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] py-20 md:py-0 md:h-screen"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--accent-secondary)_6%,transparent),transparent_60%)]" />
      <Starfield />

      {/* HUD */}
      <HUDOverlay />

      {/* Desktop: Solar System Container */}
      <div className="hidden md:flex absolute inset-0 items-center justify-center">
        <div className="relative h-[700px] w-[700px] max-w-full">

          {/* Orbital rings */}
          {skillsData.orbits.map((ring) => (
            <OrbitalRing
              key={ring.ring}
              radius={ringRadii[ring.ring]}
              color={ring.glow}
              duration={30 + ring.ring * 10}
              reverse={ring.ring % 2 === 0}
            />
          ))}

          {/* Asteroid belt */}
          <AsteroidBelt />

          {/* Central Star */}
          <CentralStar />

          {/* Planets */}
          {filteredPlanets.map((planet) => (
            <Planet
              key={planet.id}
              planet={planet}
              ringRadius={ringRadii[planet.ring]}
              onSelect={setSelectedPlanet}
              isSelected={selectedPlanet?.id === planet.id}
              isHovered={hoveredPlanet === planet.id}
              onHover={setHoveredPlanet}
            />
          ))}

          {/* Planet Detail Modal */}
          <AnimatePresence>
            {selectedPlanet && (
              <PlanetDetail
                planet={selectedPlanet}
                onClose={() => setSelectedPlanet(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile: Skills List View */}
      <div className="md:hidden pt-32">
        <div className="text-center px-6 mb-8">
          <p className="text-sm uppercase tracking-[0.4em] text-[var(--accent-primary)]">
            ORBITAL SYSTEMS ONLINE
          </p>
          <h2 className="mt-4 text-3xl font-bold">
            Skill{" "}
            <span className="bg-gradient-to-r from-[var(--accent-primary)] via-[var(--gradient-mid)] to-[var(--gradient-to)] bg-clip-text text-transparent">
              Universe
            </span>
          </h2>
          <p className="mt-3 text-[var(--text-muted)] text-sm">
            Tap any planet to scan its surface
          </p>
        </div>
        <MobileSkillsList planets={filteredPlanets} onSelect={setSelectedPlanet} />
      </div>

      {/* Bottom filter controls */}
      <div className="hidden md:block">
        <BottomControls activeFilter={filter} setFilter={setFilter} />
      </div>

      {/* Mobile filter controls */}
      <div className="md:hidden bottom-4 left-0 right-0 z-40 flex justify-center">
        <div className="flex gap-2 rounded-full border border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] bg-[color-mix(in_srgb,var(--bg-primary)_80%,transparent)] p-2 backdrop-blur-xl">
          {["ALL", "CORE", "SIM", "TECH"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f === filter ? "ALL" : f)}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                filter === f
                  ? "bg-[color-mix(in_srgb,var(--accent-secondary)_20%,transparent)] text-[var(--accent-primary)] border border-[color-mix(in_srgb,var(--accent-secondary)_40%,transparent)]"
                  : "text-[var(--text-dim)] hover:text-[var(--text-secondary)]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute bottom-8 left-8 z-30 pointer-events-none hidden md:block">
        <div className="flex items-center gap-2 text-[10px] text-[var(--text-dim)] uppercase tracking-widest">
          <Telescope size={12} />
          <span>Scan a planet to analyze</span>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-30 pointer-events-none hidden md:block text-right">
        <div className="text-[10px] text-[var(--text-dim)] uppercase tracking-widest">
          Orbital Systems v2.0
        </div>
        <div className="mt-1 text-xs font-mono text-[color-mix(in_srgb,var(--accent-secondary)_60%,transparent)]">
          {skillsData.planets.length} planets &bull; {skillsData.asteroids.length} asteroids (Skills)
        </div>
      </div>

      {/* Global spin animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}