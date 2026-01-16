import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useScroll, motion } from 'framer-motion';

// --- Components ---

const ModuleBlock = ({ position, rotation, color, scale }: { position: [number, number, number], rotation: [number, number, number], color: string, scale: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    // Subtle breathing animation
    meshRef.current.position.y += Math.sin(state.clock.getElapsedTime() * 0.5 + position[0]) * 0.002;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <RoundedBox
        ref={meshRef}
        args={[1, 1, 1]} // Width, Height, Depth
        radius={0.05}
        smoothness={4}
        scale={scale}
        position={position}
        rotation={rotation}
      >
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.1}
          envMapIntensity={1}
          transparent
          opacity={0.9}
        />
      </RoundedBox>
    </Float>
  );
};

interface SceneContentProps {
  scrollY: number;
}

const SceneContent: React.FC<SceneContentProps> = ({ scrollY }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse, viewport } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;

    // Mouse parallax
    const x = (mouse.x * viewport.width) / 50;
    const y = (mouse.y * viewport.height) / 50;
    
    // Smooth lerp for mouse movement
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, y, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x, 0.1);

    // Continuous slow rotation + Scroll based rotation
    groupRef.current.rotation.y += 0.002 + (scrollY * 0.0005);
    groupRef.current.rotation.z = scrollY * 0.0002;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
        {/* Abstract "System" Composition */}
        
        {/* Core */}
        <ModuleBlock position={[0, 0, 0]} rotation={[0, 0, 0]} color="#4f46e5" scale={1.2} />
        
        {/* Satellites */}
        <ModuleBlock position={[1.5, 0.5, 0.5]} rotation={[0.5, 1, 0]} color="#818cf8" scale={0.7} />
        <ModuleBlock position={[-1.2, -0.8, -0.5]} rotation={[1, 0, 0.5]} color="#6366f1" scale={0.6} />
        <ModuleBlock position={[-0.5, 1.2, -0.8]} rotation={[0, 0.5, 1]} color="#a5b4fc" scale={0.5} />
        
        {/* Floating details */}
        <ModuleBlock position={[0.8, -1.2, 1]} rotation={[0.2, 0.2, 0]} color="#e0e7ff" scale={0.3} />
        <ModuleBlock position={[-1.5, 0.2, 0.8]} rotation={[0.4, 0.4, 0.4]} color="#c7d2fe" scale={0.4} />

        {/* Wireframe hints (using thin boxes) */}
        <mesh position={[0, 0, -1]} rotation={[0, 0, Math.PI / 4]}>
            <torusGeometry args={[2.5, 0.02, 16, 100]} />
            <meshBasicMaterial color="#4f46e5" transparent opacity={0.1} />
        </mesh>
         <mesh position={[0, 0, -1]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[3, 0.01, 16, 100]} />
            <meshBasicMaterial color="#818cf8" transparent opacity={0.1} />
        </mesh>

    </group>
  );
};

export const Scene: React.FC = () => {
    // We listen to window scroll to affect the 3D scene
    const [scrollY, setScrollY] = React.useState(0);

    React.useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]} // Optimize pixel ratio
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#6366f1" />
        
        {/* Nice studio lighting environment */}
        <Environment preset="city" />
        
        <SceneContent scrollY={scrollY} />
      </Canvas>
    </div>
  );
};