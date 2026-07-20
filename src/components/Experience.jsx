import React from "react";
import experienceData from "../components/data/Experience.json";

export default function Experience() {
  return (
    <section
      id="experience"
      className="bg-[#050816] px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl">

        <h2 className="text-4xl font-bold">
          {experienceData.header.title}
        </h2>

        <p className="mt-3 text-gray-400">
          {experienceData.header.description}
        </p>

        <div className="mt-10 space-y-6">

          {experienceData.timeline.map((item, index) => (

            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >

              <p className="text-sm text-cyan-300">
                {item.duration}
              </p>

              <h3 className="mt-2 text-2xl font-semibold">
                {item.role}
              </h3>

              <p className="text-gray-400">
                {item.organization}
              </p>

              <p className="mt-3 text-gray-300">
                {item.description}
              </p>

            </div>

          ))}

        </div>
      </div>
    </section>
  );
}