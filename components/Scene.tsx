import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import { ComputerMascot } from './ComputerMascot';

const SceneContent = () => {
  return (
    <>
      <Float
        speed={2.5}
        rotationIntensity={0.1}
        floatIntensity={0.4}
        floatingRange={[-0.1, 0.1]}
      >
        <ComputerMascot position={[1.8, -0.5, 0]} rotation={[0, -0.3, 0]} scale={0.75} />
      </Float>

      {/* Abstract Tech Shapes - Low Poly & Simple Materials */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
        <mesh position={[3.5, 2, -2]} scale={0.3}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#ccff00" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh position={[0, -2, -1]} scale={0.25}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#00f3ff" wireframe transparent opacity={0.2} />
        </mesh>
      </Float>
    </>
  )
}

export const Scene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 35 }}
        dpr={[1, 1.5]} // Optimize DPR for performance
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.1} />
        <spotLight
          position={[5, 10, 5]}
          angle={0.5}
          penumbra={1}
          intensity={1}
        />
        <pointLight position={[-5, 0, 5]} intensity={0.6} color="#e4e4e7" />
        <pointLight position={[2, 0, 2]} intensity={0.8} color="#00f3ff" distance={4} />

        <Environment preset="city" />

        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>

        {/* Cheaper shadows */}
        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#000000" />
      </Canvas>
    </div>
  );
};