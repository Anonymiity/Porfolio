import { useState } from "react";

import { Canvas } from "@react-three/fiber";

import {
  Environment,
  OrbitControls,
  ContactShadows,
  Float,
} from "@react-three/drei";

import RocketModel from "./RocketModel";

export default function RocketCanvas() {
  const [hoveredPart, setHoveredPart] = useState(null);

  return (
    <div className="relative w-full h-full">

      {/* ================= INFO CARD ================= */}

      {hoveredPart && (
        <div
          className="
          absolute
          top-0
          left-0
          z-50
          w-70
          rounded-3xl
          border
          border-white/10
          bg-black/60
          backdrop-blur-xl
          p-6
          text-white
          shadow-2xl
        "
        >
          <div
            className="h-1 rounded-full mb-5"
            style={{
              background: hoveredPart.color,
            }}
          />

          <h2 className="text-3xl font-bold">
            {hoveredPart.displayName}
          </h2>

          <p className="text-gray-400 mt-2">
            {hoveredPart.description}
          </p>

          <div className="mt-6 space-y-4">

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Material
              </p>

              <p className="text-lg">
                {hoveredPart.material}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Mass
              </p>

              <p className="text-lg">
                {hoveredPart.mass}
              </p>
            </div>

          </div>
        </div>
      )}

      {/* ================= CANVAS ================= */}

      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          alpha: true,
          antialias: true
        }}
        camera={{
          position: [2.2, 1.2, 3.2],
          fov: 35
        }}
      >

        <ambientLight intensity={1.4} />

        <directionalLight
          position={[6, 8, 5]}
          intensity={5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <directionalLight
          position={[-5, 4, -4]}
          intensity={2}
        />

        <pointLight
          position={[0, 2, 2]}
          intensity={30}
          distance={15}
        />

        <Environment preset="city" />

        <Float
          speed={1.2}
          rotationIntensity={0.25}
          floatIntensity={0.35}
        >
          <RocketModel onPartHover={setHoveredPart} />
        </Float>

        <ContactShadows
          position={[0, -1.35, 0]}
          opacity={0.45}
          blur={2.5}
          scale={12}
          far={5}
        />

        <OrbitControls
          enablePan={false}
          enableZoom
          enableDamping
          dampingFactor={0.08}
          minDistance={2}
          maxDistance={5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
          autoRotate
          autoRotateSpeed={0.4}
        />
      </Canvas>

    </div>
  );
}