// src/components/Forest.jsx

import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Forest = () => {
  const { scene: treeModel } = useGLTF('/models/tree.glb'); // Ensure you have a tree model

  const trees = [];

  // Generate multiple trees randomly positioned
  for (let i = 0; i < 50; i++) {
    const position = [
      (Math.random() - 0.5) * 100,
      0,
      (Math.random() - 0.5) * 100,
    ];
    const scale = [1, 1, 1];
    const rotation = [0, Math.random() * Math.PI * 2, 0];
    trees.push(
      <primitive
        object={treeModel.clone()}
        position={position}
        scale={scale}
        rotation={rotation}
        key={`tree-${i}`}
        castShadow
        receiveShadow
      />
    );
  }

  return <group>{trees}</group>;
};

export default Forest;
