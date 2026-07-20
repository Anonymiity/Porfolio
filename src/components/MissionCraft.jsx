import React from "react";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Bounds } from "@react-three/drei";
import RocketModel from "./RocketModel";
import config from "../data/missioncraft.json";

export default function MissionCraft() {
  return (
    <div
      className="w-full"
      style={{ height: config.canvas.height }}
    >
      <Canvas
        shadows={config.canvas.shadows}
        camera={config.camera}
      >
        {/* Lights */}
        <ambientLight
          intensity={config.lights.ambient.intensity}
        />

        <directionalLight
          position={config.lights.directional.position}
          intensity={config.lights.directional.intensity}
          castShadow={config.lights.directional.castShadow}
        />

        <pointLight
          position={config.lights.point.position}
          intensity={config.lights.point.intensity}
        />

        {/* Model */}
        <Bounds
          fit={config.bounds.fit}
          clip={config.bounds.clip}
          observe={config.bounds.observe}
          margin={config.bounds.margin}
        >
          <Float
            speed={config.float.speed}
            rotationIntensity={config.float.rotationIntensity}
            floatIntensity={config.float.floatIntensity}
          >
            <RocketModel />
          </Float>
        </Bounds>

        {/* Controls */}
        <OrbitControls
          target={config.controls.target}
          enablePan={config.controls.enablePan}
          enableDamping={config.controls.enableDamping}
          dampingFactor={config.controls.dampingFactor}
          minDistance={config.controls.minDistance}
          maxDistance={config.controls.maxDistance}
          minPolarAngle={config.controls.minPolarAngle}
          maxPolarAngle={config.controls.maxPolarAngle}
        />
      </Canvas>
    </div>
  );
}