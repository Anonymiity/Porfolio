import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  ContactShadows,
  Float,
} from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  RotateCcw,
  Ruler,
  Weight,
  Zap,
  Beaker,
  ChevronRight,
  Crosshair,
  Maximize2,
} from "lucide-react";
import RocketModel from "./RocketModel";
import rocketParts from "./data/RocketParts.json";

/* ─── Camera Animator ─── */
function CameraAnimator({ focusedPart, controlsRef }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(2.2, 1.2, 3.2));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (focusedPart) {
      targetPos.current.set(1.2, 0.3, 2.2);
    } else {
      targetPos.current.set(2.2, 1.2, 3.2);
    }
  }, [focusedPart]);

  useFrame((state, delta) => {
    camera.position.lerp(targetPos.current, delta * 2.5);
    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLook.current, delta * 2.5);
      controlsRef.current.update();
    }
  });

  return null;
}

/* ─── Main Component ─── */
export default function RocketCanvas() {
  const [hoveredPartName, setHoveredPartName] = useState(null);
  const [focusedPartName, setFocusedPartName] = useState(null);
  const controlsRef = useRef();

  const hoveredData = hoveredPartName ? rocketParts[hoveredPartName] : null;
  const focusedData = focusedPartName ? rocketParts[focusedPartName] : null;

  const handlePartHover = (name) => setHoveredPartName(name);
  const handlePartClick = (name) => setFocusedPartName(name);
  const handleCloseFocus = () => setFocusedPartName(null);

  return (
    <div className="relative w-full h-full">
      {/* ─── HOVER INFO CARD (Normal Mode) ─── */}
      <AnimatePresence>
        {hoveredData && !focusedPartName && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-6 left-6 z-40 w-72 rounded-2xl border border-white/10 bg-black/70 p-5 text-white backdrop-blur-2xl shadow-2xl"
          >
            <div
              className="h-1 rounded-full mb-4"
              style={{ background: hoveredData.color }}
            />
            <h2 className="text-2xl font-bold">{hoveredData.displayName}</h2>
            <p className="mt-2 text-sm text-gray-400 leading-relaxed">
              {hoveredData.description}
            </p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Material</span>
                <span className="text-cyan-300">{hoveredData.material}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-cyan-400/70">
              <Crosshair size={12} />
              <span>Click to inspect part</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 3D CANVAS ─── */}
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [2.2, 1.2, 3.2], fov: 35 }}
      >
        <CameraAnimator focusedPart={focusedPartName} controlsRef={controlsRef} />

        <ambientLight intensity={1.4} />
        <directionalLight position={[6, 8, 5]} intensity={5} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
        <directionalLight position={[-5, 4, -4]} intensity={2} />
        <pointLight position={[0, 2, 2]} intensity={30} distance={15} />

        <Environment preset="city" />

        <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.35}>
          <RocketModel
            onPartHover={handlePartHover}
            onPartClick={handlePartClick}
            focusedPart={focusedPartName}
          />
        </Float>

        <ContactShadows
          position={[0, -1.35, 0]}
          opacity={focusedPartName ? 0.15 : 0.45}
          blur={2.5}
          scale={12}
          far={5}
        />

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom
          enableDamping
          dampingFactor={0.08}
          minDistance={focusedPartName ? 1.5 : 2}
          maxDistance={focusedPartName ? 4 : 5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
          autoRotate={!!focusedPartName}
          autoRotateSpeed={focusedPartName ? 3 : 0.4}
        />
      </Canvas>

      {/* ─── FOCUS MODE: Center Reticle ─── */}
      <AnimatePresence>
        {focusedPartName && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
          >
            <div className="relative h-64 w-64">
              <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-cyan-400/40" />
              <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-cyan-400/40" />
              <div className="absolute left-0 bottom-0 h-8 w-8 border-l-2 border-b-2 border-cyan-400/40" />
              <div className="absolute right-0 bottom-0 h-8 w-8 border-r-2 border-b-2 border-cyan-400/40" />
              <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/60" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FOCUS MODE: DETAIL PANEL ─── */}
      {/* FIXED to the right edge of the entire viewport, not the canvas */}
      <AnimatePresence>
        {focusedData && (
          <motion.div
            initial={{ opacity: 0, x: 120 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 120 }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed right-0 top-13 z-[60] h-screen w-full max-w-md overflow-y-auto border-l border-white/10 bg-[#050816]/95 backdrop-blur-2xl"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {/* Hide webkit scrollbar inline */}
            <style>{`div::-webkit-scrollbar { display: none !important; }`}</style>

            {/* Close Button */}
            <button
              onClick={handleCloseFocus}
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition hover:border-cyan-400/50 hover:text-cyan-300 hover:bg-cyan-400/10"
            >
              <X size={18} />
            </button>

            <div className="p-8 pt-16">
              {/* Part Header */}
              <div className="flex items-center gap-4">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${focusedData.color}30, ${focusedData.color}10)`,
                    border: `1px solid ${focusedData.color}50`,
                    boxShadow: `0 0 20px ${focusedData.color}30`,
                  }}
                >
                  <Maximize2 size={24} style={{ color: focusedData.color }} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white">
                    {focusedData.displayName}
                  </h2>
                  <p className="mt-1 text-sm text-gray-400">{focusedData.material}</p>
                </div>
              </div>

              {/* Color Bar */}
              <div
                className="mt-6 h-1 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${focusedData.color}, transparent)`,
                }}
              />

              {/* Full Description */}
              <div className="mt-6">
                <p className="text-sm leading-relaxed text-gray-300">
                  {focusedData.fullDescription}
                </p>
              </div>

              {/* Quick Stats */}
              

              {/* Specifications Table */}
              <div className="mt-6">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-3">
                  <Beaker size={14} className="text-cyan-400" />
                  Technical Specifications
                </h3>
                <div className="space-y-2">
                  {Object.entries(focusedData.specifications || {}).map(([key, val]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-4 py-2.5"
                    >
                      <span className="text-sm text-gray-400">{key}</span>
                      <span className="text-sm font-mono font-semibold text-cyan-200">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Functions */}
              <div className="mt-6">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-3">
                  <RotateCcw size={14} className="text-emerald-400" />
                  Primary Functions
                </h3>
                <div className="space-y-2">
                  {focusedData.functions?.map((func, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <ChevronRight size={14} className="mt-0.5 shrink-0 text-cyan-400/60" />
                      <span className="text-sm text-gray-300">{func}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Material Properties */}
              <div className="mt-6">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-3">
                  <Beaker size={14} className="text-purple-400" />
                  Material Properties
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(focusedData.materialProperties || {}).map(([key, val]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-4 py-2"
                    >
                      <span className="text-xs text-gray-500">{key}</span>
                      <span className="text-xs font-mono font-semibold text-gray-300">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering Notes */}
              <div className="mt-6 rounded-xl border border-amber-400/10 bg-amber-400/5 p-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400/70 mb-2">
                  Engineering Notes
                </h3>
                <p className="text-sm leading-relaxed text-gray-400 italic">
                  {focusedData.engineeringNotes}
                </p>
              </div>

              {/* Bottom hint */}
              <div className="mt-8 pb-8 text-center">
                <p className="text-xs text-gray-600">
                  Drag the 3D model to rotate • Scroll to zoom
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}