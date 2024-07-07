import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const Leaf = ({ position, velocity, scale, rotation }) => {
  const leafRef = useRef();
  const leafTexture = useTexture('/leaf.png'); // Adjust the path to your texture

  const [mouse, setMouse] = useState(new THREE.Vector2(0, 0));

  const handleMouseMove = (event) => {
    setMouse(new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    ));
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame(() => {
    leafRef.current.position.add(velocity);
    leafRef.current.rotation.z += 0.01; // Adding rotation

    // Apply cursor reactivity
    const distance = leafRef.current.position.distanceTo(new THREE.Vector3(mouse.x * 10, mouse.y * 10, 0));
    if (distance < 2) {
      leafRef.current.position.add(velocity.clone().multiplyScalar(-1));
    }

    if (leafRef.current.position.y < -10) {
      leafRef.current.position.y = 10;
      leafRef.current.position.x = Math.random() * 20 - 10;
    }
  });

  return (
    <mesh ref={leafRef} position={position} scale={scale} rotation={rotation}>
      <planeGeometry args={[2, 2]} /> {/* Increased size */}
      <meshStandardMaterial map={leafTexture} transparent={true} side={THREE.DoubleSide} />
    </mesh>
  );
};

const FallingLeaves = () => {
  const leaves = Array.from({ length: 10 }, () => ({
    position: new THREE.Vector3(Math.random() * 20 - 10, Math.random() * 20, Math.random() * 20 - 10),
    velocity: new THREE.Vector3((Math.random() - 0.5) * 0.1, -0.1, (Math.random() - 0.5) * 0.1),
    scale: new THREE.Vector3(Math.random() * 1 + 1, Math.random() * 1 + 1, 1), // Increased scale
    rotation: new THREE.Euler(0, 0, Math.random() * Math.PI * 2),
  }));

  return (
    <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh',zIndex:-1 }} camera={{ position: [0, 0, 20] }}> {/* Adjusted camera for better view */}
      <ambientLight />
      <directionalLight position={[0, 10, 10]} />
      <OrbitControls />
      {leaves.map((leaf, index) => (
        <Leaf
          key={index}
          position={leaf.position}
          velocity={leaf.velocity}
          scale={leaf.scale}
          rotation={leaf.rotation}
        />
      ))}
    </Canvas>
  );
};

export default FallingLeaves;
