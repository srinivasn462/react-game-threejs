// src/components/Projectile.jsx (Updated)

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useSphere } from '@react-three/cannon';
import * as THREE from 'three';

const Projectile = ({ position, direction, removeProjectile }) => {
  const { scene } = useGLTF('/models/projectile.glb');
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: position,
    velocity: [direction.x * 10, direction.y * 10, direction.z * 10],
    onCollide: () => {
      console.log('Hit!');
      removeProjectile();
      // Implement additional logic like reducing health, etc.
    },
  }));

  // Automatically remove projectile after a certain time
  useFrame(() => {
    api.velocity.set(direction.x * 10, direction.y * 10, direction.z * 10);
  });

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <primitive object={scene} />
    </mesh>
  );
};

export default Projectile;
