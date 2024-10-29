// src/components/Car.jsx (Updated with Collision Detection)

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useBox } from '@react-three/cannon';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import useKeyboardControls from '../hooks/useKeyboardControls'; // Import the custom hook
const Car = () => {
  const [health, setHealth] = useState(100);
  const group = useRef();
  const { scene } = useGLTF('/models/luxury_car.glb');

  // Physics box for collision detection
  const [ref] = useBox(() => ({
    mass: 0,
    position: [0, 0, 0],
    args: [2, 1, 4], // Adjust based on car model dimensions
    onCollide: () => {
      setHealth((prev) => prev - 10);
      console.log('Car Hit! Health:', health);
    },
  }));

  // Move the car based on controls (as previously implemented)
  const keys = useKeyboardControls();
  const speed = 0.2;
  const rotationSpeed = 0.02;

  useFrame((state, delta) => {
    if (keys.ArrowUp) {
      group.current.position.z -= speed;
      ref.current.position.z = group.current.position.z;
    }
    if (keys.ArrowDown) {
      group.current.position.z += speed;
      ref.current.position.z = group.current.position.z;
    }
    if (keys.ArrowLeft) {
      group.current.rotation.y += rotationSpeed;
      ref.current.rotation.y = group.current.rotation.y;
    }
    if (keys.ArrowRight) {
      group.current.rotation.y -= rotationSpeed;
      ref.current.rotation.y = group.current.rotation.y;
    }

    // Boundary Constraints
    group.current.position.x = THREE.MathUtils.clamp(group.current.position.x, -10, 10);
    group.current.position.z = THREE.MathUtils.clamp(group.current.position.z, -100, 0);
    ref.current.position.x = group.current.position.x;
    ref.current.position.z = group.current.position.z;
  });

  return (
    <>
      <group
        ref={group}
        position={[0, 0, 0]}
        scale={[0.5, 0.5, 0.5]}
        castShadow
        receiveShadow
      >
        <primitive object={scene} />
      </group>
      {/* Invisible physics box for collision */}
      <mesh ref={ref} visible={false}>
        <boxGeometry args={[2, 1, 4]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
      {/* Display Health */}
      <Html position={[0, 5, 0]}>
        <div style={{ color: 'white', fontSize: '1.5em' }}>Health: {health}</div>
      </Html>
    </>
  );
};

export default Car;
