// src/components/Loader.jsx

import React from 'react';
import { Html, useProgress } from '@react-three/drei';

const Loader = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div style={styles.container}>
        <div style={styles.spinner}></div>
        <div style={styles.text}>{progress.toFixed(0)}% loaded</div>
      </div>
    </Html>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '1.5em',
    background: 'rgba(0, 0, 0, 0.5)',
    padding: '20px',
    borderRadius: '10px',
  },
  // Inside styles.spinner in Loader.jsx
spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '10px',
  },
  text: {
    marginTop: '10px',
  },
};

export default Loader;
