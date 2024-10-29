// src/components/Scene.jsx (Updated)

import React, { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import Ground from './Ground';
import Forest from './Forest';
import Car from './Car';
import * as THREE from 'three';
import Dinosaur from './Dinosaur';
import Projectile from './Projectile';
import Loader from './Loader';
import useKeyboardControls from '../hooks/useKeyboardControls';

const Scene = () => {
  const [projectiles, setProjectiles] = useState([]);
  const keys = useKeyboardControls();

  // Handle shooting
  React.useEffect(() => {
    if (keys.Space) {
      const newProjectile = {
        id: Date.now(),
        position: [0, 2, 0], // Starting position relative to the dinosaur
        direction: new THREE.Vector3(0, 0, 1), // Direction towards the car
      };
      setProjectiles((prev) => [...prev, newProjectile]);
    }
  }, [keys.Space]);

  // Remove projectiles that are out of bounds or have collided
  React.useEffect(() => {
    const interval = setInterval(() => {
      setProjectiles((prev) =>
        prev.filter(
          (proj) =>
            proj.position[2] < 50 // Adjust as per game dimensions
        )
      );
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

  return (
    <Canvas shadows camera={{ position: [0, 5, 15], fov: 60 }}>
      <ambientLight intensity={0.5} />

      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <Suspense fallback={<Loader />}>
        <Physics>
          <Environment preset="sunset" />
          <Ground />
          <Forest />
          <Car />
          <Dinosaur />
          {projectiles.map((proj) => (
            <Projectile
              key={proj.id}
              position={proj.position}
              direction={proj.direction}
              removeProjectile={() =>
                setProjectiles((prev) => prev.filter((p) => p.id !== proj.id))
              }
            />
          ))}
        </Physics>
      </Suspense>

      <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2} />
    </Canvas>
  );
};

export default Scene;
