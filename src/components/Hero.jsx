import React, { useEffect, useState } from "react";
import RocketCanvas from "./RocketCanvas";
import heroData from "../components/data/Hero.json";

export default function Hero() {
  const fullText = heroData.title.typing;

  const [typedText, setTypedText] = useState("");
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    let index = 0;

    const timer = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;

      if (index === fullText.length) {
        clearInterval(timer);

        setTimeout(() => {
          setShowContent(true);
        }, 500);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [fullText]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816] text-white mb-10">

      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_55%)]" />
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-8xl flex-col items-center justify-center px-6 pt-20 lg:flex-row lg:gap-16">

        {/* Rocket */}
        <div className="order-1  mt-12 flex w-full flex-1 items-center justify-center lg:order-1 lg:mt-0">

          <div className="relative h-[560px] w-full max-w-[640px]">

            <div className="absolute inset-0 rounded-[2rem] blur-3xl" />

            <div className="relative h-[600px] w-full">

              <section className="relative h-screen w-full">

                <div className="absolute inset-0">
                  <RocketCanvas />
                </div>

              </section>

            </div>

          </div>

        </div>

        {/* Text */}
        <div className="order-2 flex-1 space-y-8 text-center lg:text-left">

          {/* Badge */}

          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300 backdrop-blur-md">

            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_3px_rgba(34,211,238,0.8)]" />

            {heroData.badge.text}

          </div>

          <div className="space-y-4">

            <p className="text-sm uppercase tracking-[0.4em] text-gray-400">
              {heroData.subtitle}
            </p>

            <h1 className="text-5xl font-bold leading-tight md:text-6xl xl:text-7xl">

              {heroData.title.prefix}

              <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">

                {typedText}

                <span className="ml-1 animate-pulse text-cyan-300">
                  |
                </span>

              </span>

            </h1>

            <div
              className={`space-y-8 transition-all duration-700 ${
                showContent
                  ? "opacity-100 translate-y-0"
                  : "pointer-events-none opacity-0 translate-y-4"
              }`}
            >

              <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-300 lg:mx-0">
                {heroData.description}
              </p>

              {/* Buttons */}

              <div className="flex flex-wrap justify-center gap-4 lg:justify-start">

                {heroData.buttons.map((button, index) => (

                  <a
                    key={index}
                    href={button.link}
                    className={
                      button.variant === "primary"
                        ? "rounded-full bg-cyan-400 px-7 py-3 font-semibold text-black transition duration-300 hover:scale-105 hover:bg-cyan-300"
                        : "rounded-full border border-cyan-400/60 bg-white/5 px-7 py-3 font-semibold text-cyan-300 backdrop-blur-md transition duration-300 hover:scale-105 hover:bg-cyan-400 hover:text-black"
                    }
                  >
                    {button.text}
                  </a>

                ))}

              </div>

              {/* Stats */}

              <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">

                {heroData.stats.map((stat, index) => (

                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
                  >

                    <p className="text-2xl font-bold text-cyan-300">
                      {stat.value}
                    </p>

                    <p className="text-sm text-gray-400">
                      {stat.label}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}