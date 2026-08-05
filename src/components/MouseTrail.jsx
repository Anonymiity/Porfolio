import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export default function MouseTrail() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const mouse = useRef({ x: -100, y: -100 });
  const particles = useRef([]);
  const rafId = useRef(null);
  const accentColor = useRef("rgba(34,211,238,0.6)");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function getAccent() {
      const root = getComputedStyle(document.documentElement);
      const primary = root.getPropertyValue("--accent-primary").trim() || "#22d3ee";
      let r, g, b;
      if (primary.startsWith("#")) {
        const hex = primary.replace("#", "");
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
      } else {
        r = 34; g = 211; b = 238;
      }
      accentColor.current = `rgba(${r},${g},${b},`;
    }
    getAccent();

    const observer = new MutationObserver(getAccent);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    function onMove(e) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      for (let i = 0; i < 2; i++) {
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 6,
          y: e.clientY + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          life: 1,
          decay: 0.015 + Math.random() * 0.02,
          size: 2 + Math.random() * 3,
        });
      }
    }

    window.addEventListener("mousemove", onMove);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current = particles.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        p.size *= 0.97;

        if (p.life <= 0) return false;

        const alpha = p.life * 0.6;
        const color = accentColor.current + alpha + ")";

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = accentColor.current + (alpha * 0.15) + ")";
        ctx.fill();

        return true;
      });

      rafId.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}