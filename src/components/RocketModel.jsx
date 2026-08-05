import { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";

export default function RocketModel({ onPartHover, onPartClick, focusedPart }) {
  const { scene } = useGLTF("/models/rocket.glb");

  const parts = useRef({});
  const originalPositions = useRef({});
  const originalScales = useRef({});
  const isFocusMode = !!focusedPart;

  useEffect(() => {
    scene.traverse((child) => {
      if (!child.isMesh) return;

      child.castShadow = true;
      child.receiveShadow = true;
      child.frustumCulled = false;

      child.material = new THREE.MeshPhysicalMaterial({
        color: "#d9d9d9",
        metalness: 1,
        roughness: 0.22,
        clearcoat: 0.5,
      });

      parts.current[child.name] = child;
      originalPositions.current[child.name] = child.position.clone();
      originalScales.current[child.name] = child.scale.clone();
    });
  }, [scene]);

  // Handle focus mode transitions
  useEffect(() => {
    if (!focusedPart) {
      // RESET: Return all parts to original state
      Object.values(parts.current).forEach((mesh) => {
        const orig = originalPositions.current[mesh.name];
        const origScale = originalScales.current[mesh.name];

        gsap.to(mesh.position, {
          x: orig.x,
          y: orig.y,
          z: orig.z,
          duration: 0.9,
          ease: "power3.inOut",
        });

        gsap.to(mesh.scale, {
          x: origScale.x,
          y: origScale.y,
          z: origScale.z,
          duration: 0.9,
          ease: "power3.inOut",
        });

        gsap.to(mesh.material, {
          opacity: 1,
          transparent: false,
          duration: 0.6,
          onComplete: () => {
            mesh.visible = true;
          },
        });

        // Reset emissive
        gsap.to(mesh.material, {
          emissiveIntensity: 0,
          duration: 0.5,
        });
      });
      return;
    }

    // FOCUS: Isolate selected part, hide others
    Object.values(parts.current).forEach((mesh) => {
      if (mesh.name === focusedPart) {
        // Selected part: move to center, scale up, glow
        gsap.to(mesh.position, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1,
          ease: "power3.inOut",
        });

        gsap.to(mesh.scale, {
          x: 2.8,
          y: 2.8,
          z: 2.8,
          duration: 1,
          ease: "power3.inOut",
        });

        gsap.to(mesh.material, {
          opacity: 1,
          transparent: false,
          emissive: new THREE.Color(mesh.material.color),
          emissiveIntensity: 0.15,
          duration: 0.6,
        });

        mesh.visible = true;
      } else {
        // Other parts: fade out then hide
        gsap.to(mesh.material, {
          opacity: 0.02,
          transparent: true,
          duration: 0.5,
          onComplete: () => {
            if (mesh.name !== focusedPart) mesh.visible = false;
          },
        });
      }
    });
  }, [focusedPart]);

  const explodeOffsets = {
    "mesh_2_1": new THREE.Vector3(0, 0.18, 0),
    "Payload-1": new THREE.Vector3(0, 0.08, 0),
    "Bulkhead-1": new THREE.Vector3(0, 0.03, 0),
    "Main_Body_Tube-1": new THREE.Vector3(0, -0.03, 0),
    "Fins-1": new THREE.Vector3(0, -0.08, 0),
    "Tail_Section-1": new THREE.Vector3(0, -0.15, 0),
    "mesh_2": new THREE.Vector3(0, 0.13, 0)
  };

  function explodeRocket() {
    if (isFocusMode) return;
    Object.values(parts.current).forEach((mesh) => {
      const o = originalPositions.current[mesh.name];
      const off = explodeOffsets[mesh.name] || new THREE.Vector3();
      gsap.to(mesh.position, {
        x: o.x + off.x,
        y: o.y + off.y,
        z: o.z + off.z,
        duration: 0.8,
        ease: "power2.out",
      });
    });
  }

  function assembleRocket() {
    if (isFocusMode) return;
    onPartHover?.(null);
    Object.values(parts.current).forEach((mesh) => {
      const o = originalPositions.current[mesh.name];
      gsap.to(mesh.position, {
        x: o.x,
        y: o.y,
        z: o.z,
        duration: 0.8,
      });
      gsap.to(mesh.material, {
        opacity: 1,
        transparent: false,
        transmission: 0,
        duration: 0.25,
      });
    });
  }

  function handlePointerOver(e) {
    if (isFocusMode) return;
    e.stopPropagation();
    const hovered = e.object;

    onPartHover?.(
      hovered.name
    );

    const body = parts.current["Main_Body_Tube-1"];

    Object.values(parts.current).forEach((mesh) => {
      if (mesh === hovered) {
        gsap.to(mesh.material, {
          opacity: 1,
          transparent: false,
          duration: 0.25,
        });
      } else {
        gsap.to(mesh.material, {
          opacity: 0.5,
          transparent: true,
          duration: 0.25,
        });
      }
    });

    if (
      hovered.name === "Main_Body_Tube-1" ||
      hovered.name === "Payload-1" ||
      hovered.name === "Bulkhead-1"
    ) {
      gsap.to(body.material, {
        opacity: 0.12,
        transparent: true,
        transmission: 0.9,
        duration: 0.35,
      });
      ["Payload-1", "Bulkhead-1"].forEach((name) => {
        if (parts.current[name]) {
          gsap.to(parts.current[name].material, {
            opacity: 1,
            transparent: false,
            duration: 0.3,
          });
        }
      });
    }
  }

  function handlePointerOut() {
    if (isFocusMode) return;
    onPartHover?.(null);
    Object.values(parts.current).forEach((mesh) => {
      gsap.to(mesh.material, {
        opacity: 1,
        transparent: false,
        transmission: 0,
        duration: 0.25,
      });
    });
  }

  function handleClick(e) {
    e.stopPropagation();
    if (isFocusMode) return;
    const clicked = e.object;
    if (clicked && clicked.name) {
      onPartClick?.(clicked.name);
    }
  }

  return (
    <primitive
      object={scene}
      scale={2}
      onPointerEnter={explodeRocket}
      onPointerLeave={assembleRocket}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    />
  );
}

useGLTF.preload("/models/rocket.glb");