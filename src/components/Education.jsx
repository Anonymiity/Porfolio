import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, MapPin, Calendar } from "lucide-react";
import educationData from "./data/Education.json";

export default function Education() {
  const { header, education, certifications } = educationData;

  return (
    <section
      id="education"
      className="relative overflow-hidden bg-[var(--bg-primary)] px-6 py-28 text-[var(--text-primary)]"
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
            Academic Background
          </p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            {header.title}
          </h2>
          <p className="mt-5 text-lg leading-9 text-[var(--text-secondary)]">
            {header.description}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Degree Card */}
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden rounded-[2rem] border border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] bg-[color-mix(in_srgb,var(--text-primary)_5%,transparent)] p-8 shadow-[0_10px_40px_-10px_color-mix(in_srgb,var(--accent-glow)_10%,transparent)] backdrop-blur-md"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_srgb,var(--accent-secondary)_12%,transparent),transparent_30%)]" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[color-mix(in_srgb,var(--accent-secondary)_30%,transparent)] bg-[color-mix(in_srgb,var(--accent-secondary)_10%,transparent)] text-[var(--accent-primary)]">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{edu.degree}</h3>
                    <p className="text-[var(--accent-primary)] font-semibold">{edu.institution}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-4 text-sm text-[var(--text-muted)]">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-[var(--accent-secondary)]" />
                    {edu.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-[var(--accent-secondary)]" />
                    {edu.duration}
                  </span>
                  <span className="rounded-full border border-[color-mix(in_srgb,var(--accent-secondary)_30%,transparent)] bg-[color-mix(in_srgb,var(--accent-secondary)_10%,transparent)] px-3 py-1 text-[var(--accent-primary)] font-medium">
                    CGPA: {edu.cgpa}
                  </span>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm uppercase tracking-[0.3em] text-[var(--text-muted)] mb-3">
                    Key Coursework
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course) => (
                      <span
                        key={course}
                        className="rounded-full border border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] bg-[color-mix(in_srgb,var(--bg-primary)_20%,transparent)] px-3 py-1 text-xs text-[var(--accent-primary)]"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm uppercase tracking-[0.3em] text-[var(--text-muted)] mb-3">
                    Achievements
                  </h4>
                  <div className="space-y-2">
                    {edu.achievements.map((achievement) => (
                      <div key={achievement} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <Award size={14} className="text-[var(--highlight-secondary)]" />
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Certifications Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[2rem] border border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] bg-[color-mix(in_srgb,var(--text-primary)_5%,transparent)] p-8 shadow-[0_10px_40px_-10px_color-mix(in_srgb,var(--accent-glow)_10%,transparent)] backdrop-blur-md"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--accent-secondary)_12%,transparent),transparent_30%)]" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[color-mix(in_srgb,var(--accent-secondary)_30%,transparent)] bg-[color-mix(in_srgb,var(--accent-secondary)_10%,transparent)] text-[var(--accent-primary)]">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-2xl font-bold">Certifications</h3>
              </div>

              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 4 }}
                    className="group flex items-center justify-between rounded-xl border border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] bg-[color-mix(in_srgb,var(--bg-primary)_20%,transparent)] p-4 transition hover:border-[color-mix(in_srgb,var(--accent-secondary)_40%,transparent)]"
                  >
                    <div>
                      <h4 className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition">
                        {cert.name}
                      </h4>
                      <p className="text-sm text-[var(--text-muted)] mt-1">{cert.issuer}</p>
                    </div>
                    <span className="rounded-full border border-[color-mix(in_srgb,var(--accent-secondary)_30%,transparent)] bg-[color-mix(in_srgb,var(--accent-secondary)_10%,transparent)] px-3 py-1 text-xs text-[var(--accent-primary)]">
                      {cert.year}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}