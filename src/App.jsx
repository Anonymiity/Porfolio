import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LaunchSequence from "./components/LaunchSequence";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";


export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LaunchSequence />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  );
}