"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

function GlassShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const { mouse, viewport } = useThree();
  const prefersReducedMotion = useReducedMotion();

  // Create a custom twisted torus knot for a unique "intelligent shape"
  const geometry = useMemo(() => new THREE.TorusKnotGeometry(1.5, 0.6, 128, 32, 2, 3), []);

  useFrame((state, delta) => {
    if (!meshRef.current || prefersReducedMotion) return;
    
    // Subtle idle rotation
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.15;
    
    // Parallax response to mouse cursor
    const targetX = (mouse.x * viewport.width) / 10;
    const targetY = (mouse.y * viewport.height) / 10;
    
    // Damped cursor tracking for a premium feel
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * delta * 2;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * delta * 2;
  });

  return (
    <Float 
      speed={prefersReducedMotion ? 0 : 1.5} 
      rotationIntensity={prefersReducedMotion ? 0 : 0.5} 
      floatIntensity={prefersReducedMotion ? 0 : 1}
    >
      <mesh ref={meshRef} geometry={geometry}>
        <MeshTransmissionMaterial
          ref={materialRef}
          backside
          samples={4}
          thickness={1.2}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.2}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#7c3aed" // Violet 600
          roughness={0.15}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={1} // glass effect
          ior={1.5}
        />
      </mesh>
    </Float>
  );
}

// Background particles for subtle depth
function Particles({ count = 50 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 0.5 + Math.random() * 0.5;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -5 + Math.random() * 10;
      const yFactor = -5 + Math.random() * 10;
      const zFactor = -5 + Math.random() * 10;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state, delta) => {
    if (!mesh.current || prefersReducedMotion) return;
    
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed * delta * 10;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s * 0.05, s * 0.05, s * 0.05);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[new THREE.SphereGeometry(1, 8, 8), undefined, count]}>
      <meshBasicMaterial color="#a78bfa" transparent opacity={0.3} />
    </instancedMesh>
  );
}

export function Ambient3D({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60 dark:opacity-40 transition-opacity duration-1000">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]} // limit dpr for performance
        gl={{ antialias: true, alpha: true }}
      >
        {/* Soft lighting setup for premium rendering */}
        <ambientLight intensity={isDarkMode ? 0.2 : 0.8} />
        <directionalLight position={[10, 10, 5]} intensity={isDarkMode ? 2 : 1.5} color="#c4b5fd" />
        <directionalLight position={[-10, -10, -5]} intensity={isDarkMode ? 1 : 0.5} color="#8b5cf6" />
        
        <GlassShape />
        <Particles count={isDarkMode ? 40 : 20} />
        
        {/* Environment map provides the reflections necessary for premium glass */}
        <Environment preset={isDarkMode ? "night" : "city"} />
      </Canvas>
    </div>
  );
}

export default Ambient3D;
