import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Particles({ count = 500 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 30,
        y: (Math.random() - 0.5) * 30,
        z: (Math.random() - 0.5) * 40 - 10,
        speed: 0.1 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    for (let i = 0; i < count; i++) {
        const p = particles[i];
        const t = state.clock.elapsedTime * p.speed + p.phase;
        
        // Gentle drifting
        dummy.position.set(
            p.x + Math.sin(t) * 2,
            p.y + Math.cos(t) * 2,
            p.z + Math.sin(t * 0.5) * 2
        );
        
        // Small size
        const scale = 0.5 + Math.sin(t * 5) * 0.2;
        dummy.scale.setScalar(scale);
        
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial color="#FFB703" transparent opacity={0.4} />
    </instancedMesh>
  );
}
