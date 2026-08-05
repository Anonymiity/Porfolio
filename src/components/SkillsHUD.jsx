import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Wind, Layers3, Code2, Cpu, Rocket, X, ChevronRight } from "lucide-react";
import skillsData from "./data/Skills.json";

const iconMap = {
  Wind,
  Layers3,
  Activity,
  Code2,
  Cpu,
  Rocket,
  ShieldCheck: Activity
};

const proficiencyConfig = {
  EXPERT: { color: "text-emerald-300", bg: "bg-emerald-400/10", border: "border-emerald-400/30", gauge: "from-emerald-400 to-emerald-300" },
  ADVANCED: { color: "text-cyan-300", bg: "bg-cyan-400/10", border: "border-cyan-400/30", gauge: "from-cyan-400 to-sky-300" },
  PROFICIENT: { color: "text-amber-300", bg: "bg-amber-400/10", border: "border-amber-400/30", gauge: "from-amber-400 to-yellow-300" },
  FAMILIAR: { color: "text-gray-300", bg: "bg-gray-400/10", border: "border-gray-400/30", gauge: "from-gray-400 to-gray-300" }
};

const categories = ["All", "Structures", "Propulsion", "Software", "Simulation", "Design"];

export default function SkillsHUD() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState(null);

  const filteredSkills = activeCategory === "All"
    ? skillsData.checklist.items
    : skillsData.checklist.items.filter(s => {
        const catMap = {
          "Structural Analysis": "Structures",
          "Propulsion": "Propulsion",
          "CFD & Aerodynamics": "Simulation",
          "Simulation": "Simulation",
          "Programming": "Software",
          "CAD & Design": "Design"
        };
        return catMap[s.name] === activeCategory;
      });

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[#050816] px-6 py-28 text-white"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_35%)]" />
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:80px_80px]" />
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.3),transparent_70%)] animate-pulse" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">
            {skillsData.header.subtitle}
          </p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            {skillsData.header.title.normal}{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              {skillsData.header.title.highlight}
            </span>
          </h2>
          <p className="mt-5 mx-auto max-w-2xl text-lg leading-9 text-gray-300">
            {skillsData.header.description}
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                activeCategory === cat
                  ? "border-cyan-400/60 bg-cyan-400/20 text-cyan-300"
                  : "border-white/10 bg-white/5 text-gray-400 hover:border-cyan-400/30 hover:text-cyan-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              const Icon = iconMap[skill.icon] || Activity;
              const config = proficiencyConfig[skill.status] || proficiencyConfig.PROFICIENT;

              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  onClick={() => setSelectedSkill(skill)}
                  className="group cursor-pointer overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-md transition hover:border-cyan-400/40 hover:shadow-cyan-500/10"
                >
                  <div className="flex items-start justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${config.border} ${config.bg}`}>
                      <Icon size={22} className={config.color} />
                    </div>
                    <span className={`rounded-full border ${config.border} ${config.bg} px-3 py-1 text-xs font-bold uppercase tracking-wider ${config.color}`}>
                      {skill.status}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold group-hover:text-cyan-300 transition">
                    {skill.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {skill.details}
                  </p>

                  {/* Gauge */}
                  <div className="mt-5">
                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                      <span>Proficiency</span>
                      <span className={config.color}>{skill.level}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full bg-gradient-to-r ${config.gauge}`}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-1 text-sm text-cyan-400 opacity-0 transition group-hover:opacity-100">
                    View Details <ChevronRight size={14} />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Systems Status */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 grid gap-6 md:grid-cols-2"
        >
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-md">
            <h3 className="text-lg font-semibold text-cyan-300 mb-6">System Status</h3>
            <div className="space-y-4">
              {skillsData.systems.map((system) => (
                <div key={system.label} className="flex items-center justify-between">
                  <span className="text-gray-300">{system.label}</span>
                  <span className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {system.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-md">
            <h3 className="text-lg font-semibold text-cyan-300 mb-6">Engineering Toolbox</h3>
            <div className="flex flex-wrap gap-2">
              {skillsData.flightStack.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-lg border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-cyan-100 transition hover:border-cyan-400/30 hover:bg-cyan-400/10"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Skill Detail Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <SkillDetailModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function SkillDetailModal({ skill, onClose }) {
  const Icon = iconMap[skill.icon] || Activity;
  const config = proficiencyConfig[skill.status] || proficiencyConfig.PROFICIENT;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-lg rounded-[2rem] border border-white/10 bg-[#0a0f1e] p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full border border-white/10 bg-white/5 p-2 text-gray-400 hover:border-cyan-400/50 hover:text-cyan-300"
        >
          <X size={20} />
        </button>

        <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl border ${config.border} ${config.bg}`}>
          <Icon size={32} className={config.color} />
        </div>

        <h2 className="mt-6 text-2xl font-bold">{skill.name}</h2>
        <span className={`mt-2 inline-block rounded-full border ${config.border} ${config.bg} px-3 py-1 text-xs font-bold uppercase tracking-wider ${config.color}`}>
          {skill.status} • {skill.level}%
        </span>

        <p className="mt-6 leading-7 text-gray-300">{skill.details}</p>

        <div className="mt-6">
          <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Proficiency</h4>
          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${config.gauge}`}
              style={{ width: `${skill.level}%` }}
            />
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4">
          <p className="text-sm text-cyan-300 font-medium">
            💡 Tip: Click on any project in the Projects section to see this skill in action.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}