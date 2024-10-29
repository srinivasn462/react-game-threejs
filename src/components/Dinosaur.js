// src/components/Dinosaur.jsx

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Dinosaur = () => {
  const group = useRef();
  const { scene } = useGLTF('/models/dinosaur.glb'); // Ensure the path is correct

  // Example: Move the dinosaur towards the car
  useFrame((state, delta) => {
    group.current.position.z += 0.2;
    if (group.current.position.z > 10) {
      group.current.position.z = -10;
      group.current.position.x = (Math.random() - 0.5) * 20; // Randomize x position
    }
  });

  return (
    <group
      ref={group}
      position={[5, 0, -10]}
      scale={[0.3, 0.3, 0.3]}
      castShadow
      receiveShadow
    >
      <primitive object={scene} />
    </group>
  );
};

export default Dinosaur;
