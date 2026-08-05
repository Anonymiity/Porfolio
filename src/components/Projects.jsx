import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, FileText, Users, Clock, X as CloseIcon } from "lucide-react";
import GithubIcon from "/icons/github.png";
import XIcon from "/icons/twitter.png";
import projectsData from "./data/Projects.json";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      id="projects"
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
            Portfolio
          </p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            {projectsData.header.title}
          </h2>
          <p className="mt-5 text-lg leading-9 text-[var(--text-secondary)]">
            {projectsData.header.description}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.projects.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer overflow-hidden rounded-[2rem] border border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] bg-[color-mix(in_srgb,var(--text-primary)_5%,transparent)] p-6 shadow-lg shadow-[0_4px_20px_-5px_color-mix(in_srgb,var(--accent-glow)_5%,transparent)] transition-all duration-300 hover:border-[color-mix(in_srgb,var(--accent-secondary)_60%,transparent)] hover:shadow-[0_10px_40px_-10px_color-mix(in_srgb,var(--accent-glow)_20%,transparent)]"
            >
              {/* Project Image Placeholder */}
              <div className="relative mb-6 h-48 overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] bg-[color-mix(in_srgb,var(--bg-primary)_20%,transparent)]">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[color-mix(in_srgb,var(--accent-secondary)_20%,transparent)] to-[color-mix(in_srgb,var(--gradient-to)_20%,transparent)] ${project.image ? 'hidden' : 'flex'}`}>
                  <span className="text-4xl font-bold text-[color-mix(in_srgb,var(--accent-secondary)_30%,transparent)]">{project.type[0]}</span>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="rounded-full border border-[color-mix(in_srgb,var(--accent-secondary)_30%,transparent)] bg-[color-mix(in_srgb,var(--bg-primary)_50%,transparent)] backdrop-blur-md px-3 py-1 text-xs font-medium text-[var(--accent-primary)]">
                    {project.type}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition">
                {project.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[var(--text-muted)] line-clamp-3">
                {project.description}
              </p>

              {/* Meta info */}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[var(--text-dim)]">
                {project.duration && (
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {project.duration}
                  </span>
                )}
                {project.teamSize && (
                  <span className="flex items-center gap-1">
                    <Users size={12} />
                    Team of {project.teamSize}
                  </span>
                )}
                {project.role && (
                  <span className="text-[color-mix(in_srgb,var(--accent-secondary)_70%,transparent)]">{project.role}</span>
                )}
              </div>

              {/* Tech Stack */}
              {project.techStack && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] bg-[color-mix(in_srgb,var(--bg-primary)_20%,transparent)] px-2 py-0.5 text-[10px] text-[var(--text-muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="rounded-full border border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] bg-[color-mix(in_srgb,var(--bg-primary)_20%,transparent)] px-2 py-0.5 text-[10px] text-[var(--text-muted)]">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>
              )}

              <div className="mt-5 flex items-center gap-2 text-sm font-medium text-[var(--accent-secondary)] opacity-0 transition group-hover:opacity-100">
                View Details
                <ExternalLink size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[color-mix(in_srgb,var(--bg-primary)_80%,transparent)] backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto scrollbar-none rounded-[2rem] border border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] bg-[var(--bg-secondary)] p-8 shadow-2xl shadow-[0_10px_40px_-10px_color-mix(in_srgb,var(--accent-glow)_10%,transparent)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full border border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] bg-[color-mix(in_srgb,var(--text-primary)_5%,transparent)] p-2 text-[var(--text-muted)] transition hover:border-[color-mix(in_srgb,var(--accent-secondary)_50%,transparent)] hover:text-[var(--accent-primary)]"
        >
          <CloseIcon size={20} />
        </button>

        <span className="inline-block rounded-full border border-[color-mix(in_srgb,var(--accent-secondary)_30%,transparent)] bg-[color-mix(in_srgb,var(--accent-secondary)_10%,transparent)] px-3 py-1 text-xs font-medium text-[var(--accent-primary)]">
          {project.type}
        </span>

        <h2 className="mt-4 text-3xl font-bold">{project.title}</h2>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--text-muted)]">
          {project.duration && (
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-[var(--accent-secondary)]" />
              {project.duration}
            </span>
          )}
          {project.teamSize && (
            <span className="flex items-center gap-1.5">
              <Users size={14} className="text-[var(--accent-secondary)]" />
              {project.role} &bull; Team of {project.teamSize}
            </span>
          )}
        </div>

        <div className="mt-6 h-64 overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] relative">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-fill"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : null}
          <div className={`absolute overflow-y-auto inset-0 flex items-center justify-center bg-gradient-to-br from-[color-mix(in_srgb,var(--accent-secondary)_20%,transparent)] to-[color-mix(in_srgb,var(--gradient-to)_20%,transparent)] ${project.image ? 'hidden' : 'flex'}`}>
            <span className="text-6xl font-bold text-[color-mix(in_srgb,var(--accent-secondary)_20%,transparent)]">{project.type[0]}</span>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-[var(--accent-primary)]">Overview</h3>
          <p className="mt-2 leading-8 text-[var(--text-secondary)]">{project.description}</p>
        </div>

        {project.techStack && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-[var(--accent-primary)]">Technologies</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[color-mix(in_srgb,var(--accent-secondary)_30%,transparent)] bg-[color-mix(in_srgb,var(--accent-secondary)_10%,transparent)] px-4 py-1.5 text-sm text-[var(--accent-primary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
                    {project.link && project.link !== "#" && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-secondary)] px-6 py-2.5 font-semibold text-[var(--bg-primary)] transition hover:bg-[var(--accent-primary)]"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
          {project.github && project.github !== "#" && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--text-primary)_20%,transparent)] bg-[color-mix(in_srgb,var(--text-primary)_5%,transparent)] px-6 py-2.5 font-semibold text-[var(--text-primary)] transition hover:border-[color-mix(in_srgb,var(--accent-secondary)_60%,transparent)] hover:bg-[color-mix(in_srgb,var(--accent-secondary)_10%,transparent)]"
            >
              <img src={GithubIcon} alt="GitHub" className="h-4 w-4" />
              Source Code
            </a>
          )}
          {project.report && project.report !== "#" && (
            <a
              href={project.report}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--text-primary)_20%,transparent)] bg-[color-mix(in_srgb,var(--text-primary)_5%,transparent)] px-6 py-2.5 font-semibold text-[var(--text-primary)] transition hover:border-[color-mix(in_srgb,var(--accent-secondary)_60%,transparent)] hover:bg-[color-mix(in_srgb,var(--accent-secondary)_10%,transparent)]"
            >
              <FileText size={16} />
              View Report
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}