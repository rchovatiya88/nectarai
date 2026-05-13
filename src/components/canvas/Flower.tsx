import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FlowerProps {
  position?: [number, number, number];
  scale?: number;
  dim?: boolean;
}

export default function Flower({ position = [0, 0, 0], scale = 1, dim = false }: FlowerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const petalsRef = useRef<THREE.InstancedMesh>(null);
  
  const petalCount = 12;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (!groupRef.current || !petalsRef.current) return;
    
    groupRef.current.rotation.y += delta * 0.2;
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

    for (let i = 0; i < petalCount; i++) {
      const angle = (i / petalCount) * Math.PI * 2;
      const radius = 0.5;
      
      // Breathing effect
      const breath = Math.sin(state.clock.elapsedTime + i) * 0.05;
      
      dummy.position.set(
        Math.cos(angle) * (radius + breath),
        Math.sin(angle) * (radius + breath),
        0
      );
      
      dummy.rotation.set(0, 0, angle);
      dummy.scale.set(1, 2, 0.1);
      dummy.updateMatrix();
      petalsRef.current.setMatrixAt(i, dummy.matrix);
    }
    petalsRef.current.instanceMatrix.needsUpdate = true;
  });

  const baseColor = dim ? "#333333" : "#FFB703";
  const emissiveColor = dim ? "#000000" : "#F5B700";
  const emissiveInt = dim ? 0 : 2;

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Core */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial 
          color={dim ? "#111" : "#FFD166"} 
          emissive={dim ? "#000" : "#FFD166"} 
          emissiveIntensity={dim ? 0 : 1}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Petals */}
      <instancedMesh ref={petalsRef} args={[undefined, undefined, petalCount]}>
        <capsuleGeometry args={[0.1, 0.5, 4, 8]} />
        <meshStandardMaterial 
          color={baseColor} 
          emissive={emissiveColor}
          emissiveIntensity={emissiveInt}
          transparent={true}
          opacity={0.8}
          roughness={0.4}
        />
      </instancedMesh>
    </group>
  );
}
