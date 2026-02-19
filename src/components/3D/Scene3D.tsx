'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Environment, Float } from '@react-three/drei';
import { Suspense } from 'react';

function AnimatedSphere() {
  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 100, 200]} scale={2}>
        <MeshDistortMaterial
          color="#22c55e"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          <AnimatedSphere />
          <Environment preset="city" />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
