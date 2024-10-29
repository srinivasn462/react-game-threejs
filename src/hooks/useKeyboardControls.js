// src/hooks/useKeyboardControls.js

import { useState, useEffect } from 'react';

const useKeyboardControls = () => {
  const [keys, setKeys] = useState({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    Space: false,
  });

  const downHandler = ({ key }) => {
    if (key in keys) {
      setKeys((prev) => ({ ...prev, [key]: true }));
    }
  };

  const upHandler = ({ key }) => {
    if (key in keys) {
      setKeys((prev) => ({ ...prev, [key]: false }));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  return keys;
};

export default useKeyboardControls;
