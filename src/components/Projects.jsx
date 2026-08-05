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
      className="relative overflow-hidden bg-[#050816] px-6 py-28 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_35%)]" />
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">
            Portfolio
          </p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            {projectsData.header.title}
          </h2>
          <p className="mt-5 text-lg leading-9 text-gray-300">
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
              className="group cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-lg shadow-cyan-500/5 transition-all duration-300 hover:border-cyan-400/60 hover:shadow-cyan-500/20"
            >
              {/* Project Image Placeholder */}
              <div className="relative mb-6 h-48 overflow-hidden rounded-xl border border-white/10 bg-black/20">
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
                <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-900/20 to-blue-900/20 ${project.image ? 'hidden' : 'flex'}`}>
                  <span className="text-4xl font-bold text-cyan-400/30">{project.type[0]}</span>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="rounded-full border border-cyan-400/30 bg-black/50 backdrop-blur-md px-3 py-1 text-xs font-medium text-cyan-300">
                    {project.type}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition">
                {project.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-400 line-clamp-3">
                {project.description}
              </p>

              {/* Meta info */}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500">
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
                  <span className="text-cyan-400/70">{project.role}</span>
                )}
              </div>

              {/* Tech Stack */}
              {project.techStack && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-[10px] text-gray-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-[10px] text-gray-400">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>
              )}

              <div className="mt-5 flex items-center gap-2 text-sm font-medium text-cyan-400 opacity-0 transition group-hover:opacity-100">
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto scrollbar-none rounded-[2rem] border border-white/10 bg-[#0a0f1e] p-8 shadow-2xl shadow-cyan-500/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full border border-white/10 bg-white/5 p-2 text-gray-400 transition hover:border-cyan-400/50 hover:text-cyan-300"
        >
          <CloseIcon size={20} />
        </button>

        <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
          {project.type}
        </span>

        <h2 className="mt-4 text-3xl font-bold">{project.title}</h2>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400">
          {project.duration && (
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-cyan-400" />
              {project.duration}
            </span>
          )}
          {project.teamSize && (
            <span className="flex items-center gap-1.5">
              <Users size={14} className="text-cyan-400" />
              {project.role} &bull; Team of {project.teamSize}
            </span>
          )}
        </div>

        <div className="mt-6 h-64 overflow-hidden rounded-xl border border-white/10 relative">
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
          <div className={`absolute overflow-y-auto inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-900/20 to-blue-900/20 ${project.image ? 'hidden' : 'flex'}`}>
            <span className="text-6xl font-bold text-cyan-400/20">{project.type[0]}</span>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-cyan-300">Overview</h3>
          <p className="mt-2 leading-8 text-gray-300">{project.description}</p>
        </div>

        {project.techStack && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-cyan-300">Technologies</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-sm text-cyan-300"
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
              className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-2.5 font-semibold text-black transition hover:bg-cyan-300"
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
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 font-semibold text-white transition hover:border-cyan-400/60 hover:bg-cyan-400/10"
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
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 font-semibold text-white transition hover:border-cyan-400/60 hover:bg-cyan-400/10"
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