'use client';

import { Canvas } from '@react-three/fiber';
import Particles from './Particles';
import { Suspense, useState, useEffect } from 'react';

export default function ParticleBackground() {
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Check if WebGL is supported
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setIsSupported(false);
    }
  }, []);

  if (!isSupported) {
    return null;
  }

  return (
    <div className="fixed inset-0 w-full h-full -z-10 opacity-30">
      <Canvas camera={{ position: [0, 0, 10] }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <Particles count={50} />
        </Suspense>
      </Canvas>
    </div>
  );
}

