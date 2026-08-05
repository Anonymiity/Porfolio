import React from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Award, Wrench } from "lucide-react";
import experienceData from "./data/Experience.json";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[var(--bg-secondary)] px-6 py-28 text-[var(--text-primary)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,color-mix(in_srgb,var(--accent-secondary)_12%,transparent),transparent_35%)]" />
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(color-mix(in_srgb,var(--text-primary)_5%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--text-primary)_5%,transparent)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-[var(--accent-primary)]">
            Career Timeline
          </p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            {experienceData.header.title}
          </h2>
          <p className="mt-5 text-lg leading-9 text-[var(--text-secondary)]">
            {experienceData.header.description}
          </p>
        </motion.div>

        <div className="relative mt-14 space-y-8">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 hidden h-full w-px bg-[color-mix(in_srgb,var(--accent-secondary)_25%,transparent)] md:block" />

          {experienceData.timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="relative md:pl-20"
            >
              {/* Timeline dot */}
              <div className="absolute left-6 top-8 hidden h-4 w-4 rounded-full border-2 border-[var(--accent-secondary)] bg-[var(--bg-secondary)] md:block">
                <div className="absolute inset-0.5 rounded-full bg-[var(--accent-secondary)]" />
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] bg-[color-mix(in_srgb,var(--text-primary)_5%,transparent)] p-8 shadow-lg shadow-[0_4px_20px_-5px_color-mix(in_srgb,var(--accent-glow)_5%,transparent)] backdrop-blur-md transition hover:border-[color-mix(in_srgb,var(--accent-secondary)_40%,transparent)]">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      {item.logo && (
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] bg-[color-mix(in_srgb,var(--text-primary)_5%,transparent)]">
                          <img
                            src={item.logo}
                            alt={item.organization}
                            className="h-10 w-10 object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="text-2xl font-bold">{item.role}</h3>
                        <p className="text-lg text-[var(--accent-primary)] font-semibold">
                          {item.organization}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--text-muted)]">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-[var(--accent-secondary)]" />
                        {item.duration}
                      </span>
                      {item.location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-[var(--accent-secondary)]" />
                          {item.location}
                        </span>
                      )}
                    </div>

                    <ul className="mt-6 space-y-3">
                      {item.description.map((desc, i) => (
                        <li key={i} className="flex gap-3 text-[var(--text-secondary)] leading-7">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-secondary)]" />
                          {desc}
                        </li>
                      ))}
                    </ul>

                    {/* Highlights */}
                    {item.highlights && (
                      <div className="mt-6 rounded-xl border border-[color-mix(in_srgb,var(--highlight-secondary)_20%,transparent)] bg-[color-mix(in_srgb,var(--highlight-secondary)_5%,transparent)] p-4">
                        <h4 className="flex items-center gap-2 text-sm font-semibold text-[var(--highlight-primary)] uppercase tracking-wider mb-3">
                          <Award size={16} />
                          Key Impact
                        </h4>
                        <ul className="space-y-2">
                          {item.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--highlight-secondary)]" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Skills */}
                    {item.skills && (
                      <div className="mt-6">
                        <h4 className="flex items-center gap-2 text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
                          <Wrench size={16} />
                          Tools & Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-[color-mix(in_srgb,var(--accent-secondary)_30%,transparent)] bg-[color-mix(in_srgb,var(--accent-secondary)_10%,transparent)] px-3 py-1 text-xs text-[var(--accent-primary)] transition hover:bg-[color-mix(in_srgb,var(--accent-secondary)_20%,transparent)]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}