import React, { useEffect, useState } from "react";
import RocketCanvas from "./RocketCanvas";
import heroData from "../components/data/Hero.json";
import { ChevronDown } from "lucide-react";

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

  const scrollToContent = () => {
    const skillsSection = document.getElementById("info");
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] mb-10">

      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,color-mix(in_srgb,var(--accent-secondary)_16%,transparent),transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--gradient-to)_8%,transparent),transparent_55%)]" />
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(color-mix(in_srgb,var(--text-primary)_6%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--text-primary)_6%,transparent)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-8xl flex-col items-center justify-center px-6 pt-20 lg:flex-row lg:gap-16">

        {/* Rocket */}
        <div className="order-1 mt-12 flex w-full flex-1 items-center justify-center lg:order-1 lg:mt-0">

          <div className="relative h-[560px] w-full max-w-[640px]">

            <div className="absolute inset-0 rounded-[2rem] blur-3xl" />
            {/* Mobile Scroll Down Arrow */}
            <div className="lg:hidden absolute inset-0 bottom-20 left-0 right-0 z-1 flex flex-col items-center animate-bounce-slow">
              <button
                onClick={scrollToContent}
                className="flex flex-col items-center gap-2 text-[var(--accent-primary)] transition hover:text-[var(--accent-primary)]"
              >
                <span className="text-xs uppercase tracking-[0.3em] font-medium">Scroll Down</span>
                <ChevronDown size={28} className="animate-pulse" />
              </button>
            </div>
            <div className="relative h-[600px] w-full">

              <section className="relative h-screen w-full">

                <div className="absolute inset-1">
                  <RocketCanvas />
                </div>

              </section>

            </div>

          </div>

        </div>

        {/* Text */}
        <div id="info" className="order-2 flex-1 space-y-8 text-center lg:text-left">

          {/* Badge */}

          <div className="inline-flex items-center gap-3 rounded-full border border-[color-mix(in_srgb,var(--accent-secondary)_30%,transparent)] bg-[color-mix(in_srgb,var(--accent-secondary)_10%,transparent)] px-4 py-2 text-sm text-[var(--accent-primary)] backdrop-blur-md">

            <span className="h-2 w-2 rounded-full bg-[var(--accent-primary)] shadow-[0_0_12px_3px_var(--accent-glow)]" />

            {heroData.badge.text}

          </div>

          <div className="space-y-4">

            <p className="text-sm uppercase tracking-[0.4em] text-[var(--text-muted)]">
              {heroData.subtitle}
            </p>

            <h1 className="text-5xl font-bold leading-tight md:text-6xl xl:text-7xl">

              {heroData.title.prefix}

              <span className="block bg-gradient-to-r from-[var(--accent-primary)] via-[var(--gradient-mid)] to-[var(--gradient-to)] bg-clip-text text-transparent">

                {typedText}

                <span className="ml-1 animate-pulse text-[var(--accent-primary)]">
                  |
                </span>

              </span>

            </h1>

            <div
              className={`space-y-8 transition-all duration-700 ${showContent
                ? "opacity-100 translate-y-0"
                : "pointer-events-none opacity-0 translate-y-4"
                }`}
            >

              <p className="mx-auto max-w-2xl text-lg leading-8 text-[var(--text-secondary)] lg:mx-0">
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
                        ? "rounded-full bg-[var(--accent-secondary)] px-7 py-3 font-semibold text-[var(--bg-primary)] transition duration-300 hover:scale-105 hover:bg-[var(--accent-primary)]"
                        : "rounded-full border border-[color-mix(in_srgb,var(--accent-secondary)_60%,transparent)] bg-[color-mix(in_srgb,var(--text-primary)_5%,transparent)] px-7 py-3 font-semibold text-[var(--accent-primary)] backdrop-blur-md transition duration-300 hover:scale-105 hover:bg-[var(--accent-secondary)] hover:text-[var(--bg-primary)]"
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
                    className="rounded-2xl border border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] bg-[color-mix(in_srgb,var(--text-primary)_5%,transparent)] p-4 backdrop-blur-md"
                  >

                    <p className="text-2xl font-bold text-[var(--accent-primary)]">
                      {stat.value}
                    </p>

                    <p className="text-sm text-[var(--text-muted)]">
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