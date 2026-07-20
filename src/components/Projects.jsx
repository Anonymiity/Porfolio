import React from "react";
import projectsData from "../components/data/Projects.json";

export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-[#070d1a] px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl">

        <h2 className="text-4xl font-bold">
          {projectsData.header.title}
        </h2>

        <p className="mt-3 text-gray-400">
          {projectsData.header.description}
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          {projectsData.projects.map((project, index) => (

            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-cyan-500/5 transition hover:border-cyan-400/60"
            >

              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                {project.type}
              </p>
              <h3 className="mt-3 text-2xl font-semibold">
                {project.title}
                {/* {console.log(project.title, project.description, project.type)} */}
              </h3>

              <p className="mt-4 text-gray-400">
                {project.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}