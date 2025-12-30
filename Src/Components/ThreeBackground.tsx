import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;
    
    // Camera Setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      3000
    );
    camera.position.set(0, 50, 100);
    camera.lookAt(0, 0, 0);

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: false
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create particle wave system
    const gridSize = 150;
    const particleCount = gridSize * gridSize;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const spacing = 3;
    const halfGrid = (gridSize * spacing) / 2;

    // Initialize particle grid
    let index = 0;
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = i * spacing - halfGrid;
        const z = j * spacing - halfGrid;
        
        positions[index * 3] = x;
        positions[index * 3 + 1] = 0;
        positions[index * 3 + 2] = z;

        // Vomit green / Matrix-style green palette
        const distanceFromCenter = Math.sqrt(
          Math.pow(x / halfGrid, 2) + Math.pow(z / halfGrid, 2)
        );
        const fade = Math.max(0.1, 1 - distanceFromCenter * 0.7);
        
        // Green gradient with yellowish tint
        colors[index * 3] = 0.25 * fade;     // R - adds yellowish tint
        colors[index * 3 + 1] = 0.55 * fade; // G - dominant green
        colors[index * 3 + 2] = 0.1 * fade;  // B - minimal for that vomit green look
        
        index++;
      }
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle material - subtle and elegant
    const particleMaterial = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Animation
    let time = 0;
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      time += 0.006;

      const positions = particles.attributes.position.array as Float32Array;
      
      let index = 0;
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          const x = positions[index * 3];
          const z = positions[index * 3 + 2];
          
          // Smooth flowing wave patterns
          const distance = Math.sqrt(x * x + z * z);
          const wave1 = Math.sin(x * 0.015 + time) * 15;
          const wave2 = Math.cos(z * 0.018 + time * 0.7) * 12;
          const wave3 = Math.sin(distance * 0.015 - time * 1.2) * 8;
          
          positions[index * 3 + 1] = wave1 + wave2 + wave3;
          
          index++;
        }
      }
      
      particles.attributes.position.needsUpdate = true;

      // Very slow rotation
      particleSystem.rotation.y = time * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Window Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
      
      particles.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <>
      <div 
        ref={containerRef} 
        className="fixed inset-0 -z-10 blur-sm" 
        aria-hidden="true"
      />
      {/* Dark overlay for text readability */}
      <div 
        className="fixed inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/80 pointer-events-none"
        aria-hidden="true"
      />
    </>
  );
};

export default ThreeBackground;
