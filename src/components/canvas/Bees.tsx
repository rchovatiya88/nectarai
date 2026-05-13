import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BeesProps {
  count?: number;
  radius?: number;
  center?: [number, number, number];
  burst?: boolean;
}

export default function Bees({ count = 20, radius = 4, center = [0, 0, 0], burst = false }: BeesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * radius,
        y: (Math.random() - 0.5) * radius,
        z: (Math.random() - 0.5) * radius,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        speedZ: (Math.random() - 0.5) * 2,
        phase: Math.random() * Math.PI * 2
      });
    }
    return temp;
  }, [count, radius]);

  useFrame((state, delta) => {
    if (!meshRef.current || !groupRef.current) return;
    
    // Group orbits slowly
    groupRef.current.rotation.y += delta * 0.1;

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      
      const t = state.clock.elapsedTime + p.phase;
      
      // Complex erratic motion simulating bees
      const x = p.x + Math.sin(t * p.speedX) * (burst ? 2 : 0.5);
      const y = p.y + Math.cos(t * p.speedY) * (burst ? 2 : 0.5);
      const z = p.z + Math.sin(t * p.speedZ) * (burst ? 2 : 0.5);
      
      dummy.position.set(x, y, z);
      
      // Face direction of movement roughly
      dummy.lookAt(
        p.x + Math.sin((t+0.1) * p.speedX) * (burst ? 2 : 0.5),
        p.y + Math.cos((t+0.1) * p.speedY) * (burst ? 2 : 0.5),
        p.z + Math.sin((t+0.1) * p.speedZ) * (burst ? 2 : 0.5)
      );
      
      dummy.scale.setScalar(burst ? 1.5 : 1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef} position={center}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <capsuleGeometry args={[0.02, 0.08, 4, 4]} />
        <meshStandardMaterial 
          color="#FFD166" 
          emissive="#FFD166"
          emissiveIntensity={2}
          toneMapped={false} 
        />
      </instancedMesh>
    </group>
  );
}
