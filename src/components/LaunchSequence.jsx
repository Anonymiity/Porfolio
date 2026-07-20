import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Milestone,
  Compass,
  Layers3,
  Code2,
  ShieldCheck,
} from "lucide-react";

const timelineItems = [
  {
    title: "Analyze",
    desc: "CFD, aerodynamic reasoning, and engineering problem decomposition.",
    icon: Compass,
  },
  {
    title: "Design",
    desc: "Concept development, CAD refinement, and configuration planning.",
    icon: Layers3,
  },
  {
    title: "Simulate",
    desc: "MATLAB, Python, and numerical modeling for performance prediction.",
    icon: Code2,
  },
  {
    title: "Validate",
    desc: "Verification, result comparison, documentation, and review.",
    icon: ShieldCheck,
  },
];

const checklistItems = [
  "Aerodynamics Analysis",
  "Structural Design",
  "Simulation Modeling",
  "Python / MATLAB",
  "Verification & Validation",
];

export default function LaunchSequence() {
  const [shown, setShown] = useState([]);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    checklistItems.forEach((item, index) => {
      // Step 1: item appears
      setTimeout(() => {
        setShown((prev) => [...prev, item]);
      }, 500 * index);

      // Step 2: item gets checked
      setTimeout(() => {
        setChecked((prev) => [...prev, item]);
      }, 700 * (index + 1));
    });
  }, []);

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[#050816] px-6 py-28 text-white"
    >
      {/* background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_35%)]" />
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">
            Launch Sequence
          </p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            Skills presented like a{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              pre-flight checklist
            </span>
          </h2>
          <p className="mt-5 text-lg leading-8 text-gray-300">
            A cinematic aerospace-inspired section with a mission timeline and a live checklist.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          {/* Left: timeline with spacecraft icon */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="relative min-h-[725px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-md md:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_30%)]" />

              <div className="relative z-10">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
                  Mission Timeline
                </p>
                <h3 className="mt-2 text-2xl font-semibold">Engineering Workflow</h3>

                {/* timeline area */}
                <div className="relative mt-10 pl-14">
                  {/* vertical line */}
                  <div className="absolute left-6 top-0 h-full w-px bg-cyan-400/25" />

                  {/* moving spacecraft icon */}
                  <motion.img
                    src="/images/spacecraft.png"
                    alt="Spacecraft Icon"
                    className="absolute left-[-18px] z-20 h-20 w-20 drop-shadow-[0_0_18px_rgba(34,211,238,0.65)]"
                    initial={{ top: "100%" }}
                    animate={{ top: "0%" }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "linear",
                    }}
                  />

                  <div className="space-y-12">
                    {timelineItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.title} className="relative">
                          

                          <div className="pb-2">
                            <h4 className="text-xl font-semibold">{item.title}</h4>
                            <p className="mt-2 text-sm leading-6 text-gray-300">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

      {/* Right: orbit map */}
<motion.div
  initial={{ opacity: 0, x: 30 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, amount: 0.25 }}
  transition={{ duration: 0.7 }}
  className="lg:col-span-5"
>
  <div className="relative min-h-[620px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-md">
    {/* background glow */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.10),transparent_45%)]" />
    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:70px_70px]" />

    <div className="relative z-10">
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
        Capability Orbit
      </p>
      <h3 className="mt-2 text-2xl font-semibold">
        Aerospace Engineer Skill Map
      </h3>
      <p className="mt-4 max-w-md text-sm leading-7 text-gray-300">
        A visual system map of my engineering capabilities arranged in orbit
        layers around a central aerospace identity.
      </p>

      {/* orbit area */}
      <div className="relative mx-auto mt-10 flex h-[500px] w-full max-w-[500px] items-center justify-center">
        {/* outer ring */}
        <div className="absolute h-[420px] w-[420px] rounded-full border border-cyan-400/15" />
        {/* middle ring */}
        <div className="absolute h-[300px] w-[300px] rounded-full border border-cyan-400/20" />
        {/* inner ring */}
        <div className="absolute h-[180px] w-[180px] rounded-full border border-cyan-400/25" />

        {/* center hub */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="z-20 flex h-32 w-32 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-center shadow-[0_0_30px_rgba(34,211,238,0.2)]"
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-300">
              Core
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              Aerospace
            </p>
            <p className="text-sm font-semibold text-white">Engineer</p>
          </div>
        </motion.div>

        {/* Ring 1 items */}
        <motion.div
          whileHover={{ scale: 1.06 }}
          className="absolute left-1/2 top-3 -translate-x-1/2"
        >
          <OrbitItem title="Aerodynamics" subtitle="CFD / Flow" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.06 }}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <OrbitItem title="Structures" subtitle="FEA / Composites" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.06 }}
          className="absolute left-1/2 bottom-3 -translate-x-1/2"
        >
          <OrbitItem title="Simulation" subtitle="Models / Python" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.06 }}
          className="absolute left-3 top-1/2 -translate-y-1/2"
        >
          <OrbitItem title="Controls" subtitle="Dynamics" />
        </motion.div>

        {/* Ring 2 items */}
        <motion.div
          whileHover={{ scale: 1.06 }}
          className="absolute left-[18%] top-[18%]"
        >
          <OrbitItem title="MATLAB" subtitle="Numerical Work" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.06 }}
          className="absolute right-[18%] top-[18%]"
        >
          <OrbitItem title="Python" subtitle="Automation" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.06 }}
          className="absolute left-[18%] bottom-[18%]"
        >
          <OrbitItem title="CFD" subtitle="Flow Analysis" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.06 }}
          className="absolute right-[18%] bottom-[18%]"
        >
          <OrbitItem title="FEA" subtitle="Stress Study" />
        </motion.div>

        {/* Ring 3 items */}
        <motion.div
          whileHover={{ scale: 1.06 }}
          className="absolute left-[24%] top-[42%]"
        >
          <OrbitItem title="Validation" subtitle="Verification" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.06 }}
          className="absolute right-[24%] top-[42%]"
        >
          <OrbitItem title="Design" subtitle="Concepts" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.06 }}
          className="absolute left-[42%] top-[24%]"
        >
          <OrbitItem title="Optimization" subtitle="Performance" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.06 }}
          className="absolute left-[42%] bottom-[24%]"
        >
          <OrbitItem title="Systems" subtitle="Thinking" />
        </motion.div>
      </div>
    </div>
  </div>
</motion.div>
          
        </div>
      </div>
    </section>
  );
}

function OrbitItem({ title, subtitle }) {
  return (
    <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border border-cyan-400/25 bg-black/25 px-2 text-center shadow-lg shadow-cyan-500/10 backdrop-blur-md">
      <p className="text-[11px] font-semibold leading-tight text-cyan-200">
        {title}
      </p>
      <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-gray-400">
        {subtitle}
      </p>
    </div>
  );
}