import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import rocketParts from "./data/RocketParts.json";

export default function RocketModel({ onPartHover }) {
  const { scene } = useGLTF("/models/rocket.glb");

  const parts = useRef({});
  const originalPositions = useRef({});

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
    });
  }, [scene]);

  const explodeOffsets = {
    "mesh_2_1": new THREE.Vector3(0,0.18,0),
    "Payload-1": new THREE.Vector3(0,0.08,0),
    "Bulkhead-1": new THREE.Vector3(0,0.03,0),
    "Main_Body_Tube-1": new THREE.Vector3(0,-0.03,0),
    "Fins-1": new THREE.Vector3(0,-0.08,0),
    "Tail_Section-1": new THREE.Vector3(0,-0.15,0),
    "mesh_2": new THREE.Vector3(0,0.13,0)
  };

  function explodeRocket() {
    Object.values(parts.current).forEach(mesh=>{
      const o=originalPositions.current[mesh.name];
      const off=explodeOffsets[mesh.name]||new THREE.Vector3();
      gsap.to(mesh.position,{
        x:o.x+off.x,
        y:o.y+off.y,
        z:o.z+off.z,
        duration:0.8,
        ease:"power2.out"
      });
    });
  }

  function assembleRocket(){
    onPartHover?.(null);

    Object.values(parts.current).forEach(mesh=>{
      const o=originalPositions.current[mesh.name];

      gsap.to(mesh.position,{
        x:o.x,
        y:o.y,
        z:o.z,
        duration:0.8
      });

      gsap.to(mesh.material,{
        opacity:1,
        transparent:false,
        transmission:0,
        duration:0.25
      });
    });
  }

  function handlePointerOver(e){
    e.stopPropagation();

    const hovered=e.object;

    onPartHover?.(
      rocketParts[hovered.name] || {
        displayName:hovered.name,
        material:"Unknown",
        mass:"-",
        description:""
      }
    );

    const body=parts.current["Main_Body_Tube-1"];

    Object.values(parts.current).forEach(mesh=>{

      if(mesh===hovered){

        gsap.to(mesh.material,{
          opacity:1,
          transparent:false,
          duration:0.25
        });

      }else{

        gsap.to(mesh.material,{
          opacity:0.5,
          transparent:true,
          duration:0.25
        });

      }

    });

    if(
      hovered.name==="Main_Body_Tube-1" ||
      hovered.name==="Payload-1" ||
      hovered.name==="Bulkhead-1"
    ){
      gsap.to(body.material,{
        opacity:0.12,
        transparent:true,
        transmission:0.9,
        duration:0.35
      });

      ["Payload-1","Bulkhead-1"].forEach(name=>{
        if(parts.current[name]){
          gsap.to(parts.current[name].material,{
            opacity:1,
            transparent:false,
            duration:0.3
          });
        }
      });
    }
  }

  function handlePointerOut(){
    onPartHover?.(null);

    Object.values(parts.current).forEach(mesh=>{
      gsap.to(mesh.material,{
        opacity:1,
        transparent:false,
        transmission:0,
        duration:0.25
      });
    });
  }

  return(
    <primitive
      object={scene}
      scale={2}
      onPointerEnter={explodeRocket}
      onPointerLeave={assembleRocket}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  );
}

useGLTF.preload("/models/rocket.glb");
