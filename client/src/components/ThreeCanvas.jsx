import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = currentMount.clientWidth || 600;
    const height = currentMount.clientHeight || 420;

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 220;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 1. Central Rotating Cyber Globe / Particle Sphere
    const particleCount = 450;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const radius = 75;
    const colorA = new THREE.Color('#ef4444'); // Red
    const colorB = new THREE.Color('#0ea5e9'); // Sky Blue
    const colorC = new THREE.Color('#8b5cf6'); // Light Purple

    for (let i = 0; i < particleCount; i++) {
      // Fibonacci sphere distribution
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color gradient across particles
      const mixedColor = colorA.clone().lerp(i % 2 === 0 ? colorB : colorC, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMaterial = new THREE.PointsMaterial({
      size: 3.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.NormalBlending
    });

    const particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);

    // 2. Geometric Wireframe Sphere Ring (Inner Core)
    const wireGeo = new THREE.IcosahedronGeometry(radius * 0.98, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9, // Sky Blue
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const wireSphere = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireSphere);

    // 3. Orbital Data Rings
    const ringGeo = new THREE.RingGeometry(radius * 1.25, radius * 1.28, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6, // Light Purple
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    scene.add(ringMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = currentMount.getBoundingClientRect();
      mouseX = (event.clientX - rect.left - width / 2) * 0.0015;
      mouseY = (event.clientY - rect.top - height / 2) * 0.0015;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Window Resize
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotations
      particles.rotation.y = elapsedTime * 0.18 + targetX;
      particles.rotation.x = targetY * 0.5;

      wireSphere.rotation.y = elapsedTime * 0.18 + targetX;
      wireSphere.rotation.x = targetY * 0.5;

      ringMesh.rotation.z = elapsedTime * 0.12;
      ringMesh.rotation.y = targetX * 0.8;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      pMaterial.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: '100%', 
        height: '100%', 
        minHeight: '380px',
        position: 'relative',
        cursor: 'grab'
      }} 
    />
  );
};

export default ThreeCanvas;
