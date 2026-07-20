import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Activity,
  ShieldCheck,
  Code2,
  Layers3,
  Wind,
} from "lucide-react";

import skillsData from "../data/Skills.json";

const iconMap = {
  Wind,
  Layers3,
  Activity,
  Code2,
  ShieldCheck,
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[#050816] px-6 py-28 text-white"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_35%)]" />
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
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

          <p className="mt-5 text-lg leading-8 text-gray-300">
            {skillsData.header.description}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12">

          {/* LEFT PANEL */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-8"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-md md:p-8">

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_30%)]" />

              <div className="relative z-10">

                <div className="flex items-center justify-between gap-4">

                  <div>

                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
                      {skillsData.checklist.subtitle}
                    </p>

                    <h3 className="mt-2 text-2xl font-semibold">
                      {skillsData.checklist.title}
                    </h3>

                  </div>

                  <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs text-cyan-300">
                    {skillsData.checklist.badge}
                  </div>

                </div>

                <motion.div
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className="mt-8 space-y-4"
                >
                  {skillsData.checklist.items.map((skill) => {
                    const Icon = iconMap[skill.icon];

                    return (
                      <motion.div
                        key={skill.name}
                        variants={item}
                        whileHover={{ y: -4 }}
                        className="group rounded-3xl border border-white/10 bg-black/20 p-5 transition hover:border-cyan-400/40"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                          <div className="flex items-center gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">

                              {Icon && <Icon size={22} />}

                            </div>

                            <div>

                              <h4 className="text-xl font-semibold text-white">
                                {skill.name}
                              </h4>

                              <p className="mt-1 text-sm text-gray-400">
                                {skill.details}
                              </p>

                            </div>

                          </div>

                          <div className="flex items-center gap-3">

                            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1 text-xs font-semibold tracking-[0.25em] text-emerald-300">
                              {skill.status}
                            </span>

                            <CheckCircle2
                              className="text-emerald-300"
                              size={20}
                            />

                          </div>

                        </div>

                        {/* Progress */}

                        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">

                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.9,
                              ease: "easeOut",
                            }}
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500"
                          />

                        </div>

                        <div className="mt-2 flex justify-between text-xs text-gray-400">

                          <span>Readiness</span>

                          <span>{skill.level}%</span>

                        </div>

                      </motion.div>
                    );
                  })}
                </motion.div>

              </div>
            </div>
          </motion.div>

          {/* RIGHT PANEL */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 space-y-6"
          >
            {/* Summary */}

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-md">

              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
                {skillsData.summary.subtitle}
              </p>

              <h3 className="mt-3 text-2xl font-semibold">
                {skillsData.summary.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-300">
                {skillsData.summary.description}
              </p>

            </div>

            {/* Operational Cards */}

            <div className="grid gap-4">

              {skillsData.systems.map((system) => (

                <div
                  key={system.label}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md"
                >

                  <span className="font-medium text-white">
                    {system.label}
                  </span>

                  <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
                    {system.status}
                  </span>

                </div>

              ))}

            </div>

            {/* Flight Stack */}

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-md">

              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
                {skillsData.flightStack.title}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">

                {skillsData.flightStack.tools.map((tool) => (

                  <span
                    key={tool}
                    className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-cyan-100"
                  >
                    {tool}
                  </span>

                ))}

              </div>

            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}