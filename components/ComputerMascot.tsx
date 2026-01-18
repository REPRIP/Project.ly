import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface ComputerMascotProps {
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: number;
}

export const ComputerMascot: React.FC<ComputerMascotProps> = ({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1
}) => {
    const groupRef = useRef<THREE.Group>(null);
    const { mouse, viewport } = useThree();
    const [blink, setBlink] = useState(false);

    // Blinking logic - Optimized to avoid memory leaks
    useEffect(() => {
        let timeoutId: number;
        const blinkLoop = () => {
            setBlink(true);
            setTimeout(() => setBlink(false), 150);
            timeoutId = window.setTimeout(blinkLoop, Math.random() * 4000 + 2000);
        };
        timeoutId = window.setTimeout(blinkLoop, 2000);
        return () => clearTimeout(timeoutId);
    }, []);

    // Animate to look at mouse - Optimized lerp
    useFrame((state, delta) => {
        if (groupRef.current) {
            const x = (mouse.x * viewport.width) / 15;
            const y = (mouse.y * viewport.height) / 15;

            // Frame-rate independent smoothing
            const smoothing = 1 - Math.pow(0.05, delta * 60);

            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.2, 0.1); // Increased speed slightly for responsiveness
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.2, 0.1);
        }
    });

    const bodyColor = "#f4f4f5"; // zinc-100
    const screenBezelColor = "#18181b"; // zinc-950
    const screenColor = "#09090b"; // zinc-950
    const eyeColor = "#00f3ff"; // Neon Blue

    return (
        <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
            {/* Monitor Main Body */}
            <RoundedBox args={[2.2, 1.7, 1]} radius={0.3} smoothness={4}>
                <meshStandardMaterial color={bodyColor} roughness={0.4} />
            </RoundedBox>

            {/* Screen Bezel Inset */}
            <RoundedBox args={[1.9, 1.4, 0.1]} radius={0.1} smoothness={4} position={[0, 0, 0.51]}>
                <meshStandardMaterial color={screenBezelColor} roughness={0.8} />
            </RoundedBox>

            {/* The Screen Display - Simple plane is faster */}
            <mesh position={[0, 0, 0.57]}>
                <planeGeometry args={[1.75, 1.25]} />
                <meshStandardMaterial color={screenColor} roughness={0.2} metalness={0.8} />
            </mesh>

            {/* Face Group */}
            <group position={[0, 0.05, 0.58]}>
                {/* Eyes */}
                <Eye position={[-0.4, 0.1, 0]} blink={blink} color={eyeColor} />
                <Eye position={[0.4, 0.1, 0]} blink={blink} color={eyeColor} />
            </group>

            {/* Stand Neck */}
            <mesh position={[0, -1.0, 0]}>
                <cylinderGeometry args={[0.2, 0.25, 0.5, 32]} />
                <meshStandardMaterial color={bodyColor} roughness={0.4} />
            </mesh>

            {/* Stand Base */}
            <RoundedBox args={[1.2, 0.15, 1]} radius={0.1} smoothness={4} position={[0, -1.25, 0]}>
                <meshStandardMaterial color={bodyColor} roughness={0.4} />
            </RoundedBox>

            {/* Antenna */}
            <group position={[0.5, 0.85, 0]} rotation={[0, 0, -0.1]}>
                <mesh position={[0, 0.3, 0]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.6]} />
                    <meshStandardMaterial color="#71717a" />
                </mesh>
                <mesh position={[0, 0.6, 0]}>
                    <sphereGeometry args={[0.18, 32, 32]} />
                    <meshStandardMaterial color="#ccff00" emissive="#ccff00" emissiveIntensity={1.2} toneMapped={false} />
                </mesh>
            </group>

            {/* Hands */}
            <mesh position={[-0.9, -1.2, 0.6]} rotation={[-0.2, 0.1, -0.2]}>
                <capsuleGeometry args={[0.12, 0.3, 4, 8]} />
                <meshStandardMaterial color={bodyColor} />
            </mesh>
            <mesh position={[0.9, -1.2, 0.6]} rotation={[-0.2, -0.1, 0.2]}>
                <capsuleGeometry args={[0.12, 0.3, 4, 8]} />
                <meshStandardMaterial color={bodyColor} />
            </mesh>
        </group>
    );
};

const Eye = ({ position, blink, color }: { position: [number, number, number], blink: boolean, color: string }) => (
    <group position={position}>
        <mesh scale={[1, blink ? 0.05 : 1, 1]}>
            <capsuleGeometry args={[0.13, 0.25, 4, 8]} />
            <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
        {!blink && (
            <mesh position={[0.06, 0.1, 0.05]} scale={1}>
                <circleGeometry args={[0.06, 16]} />
                <meshBasicMaterial color="white" />
            </mesh>
        )}
    </group>
);
