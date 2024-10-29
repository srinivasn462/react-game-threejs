// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { useGLTF } from '@react-three/drei';

// Preload models
useGLTF.preload('/models/luxury_car.glb');
useGLTF.preload('/models/dinosaur.glb');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
