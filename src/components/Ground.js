// src/components/Ground.jsx

import React from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
const Ground = () => {
  const texture = useTexture('/textures/ground_texture.jpg');
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(100, 100); // Repeat the texture to cover the area

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Ground;
