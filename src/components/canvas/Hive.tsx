import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";

interface HiveProps {
  position?: [number, number, number];
  scale?: number;
  core?: boolean;
}

export default function Hive({ position = [0, 0, 0], scale = 1, core = false }: HiveProps) {
  const groupRef = useRef<THREE.Group>(null);
  const hexRef = useRef<THREE.InstancedMesh>(null);
  const scroll = useScroll();

  const count = core ? 100 : 40;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Create a grid of hexagons
  const positions = useMemo(() => {
    const pos = [];
    const radius = core ? 4 : 2;
    for (let i = 0; i < count; i++) {
      const r = radius * Math.sqrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      // Cylinder radius is 0.5 roughly
      // Snap to some grid roughly
      pos.push({
        x: r * Math.cos(theta),
        y: r * Math.sin(theta),
        z: (Math.random() - 0.5) * (core ? 2 : 1),
        speed: 0.2 + Math.random() * 0.5
      });
    }
    return pos;
  }, [count, core]);

  useFrame((state, delta) => {
    if (!groupRef.current || !hexRef.current) return;
    
    groupRef.current.rotation.y += delta * 0.05;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;

    // Pulse based on scroll
    const scrollPulse = core ? scroll.offset : 1;

    for (let i = 0; i < count; i++) {
      const p = positions[i];
      
      const pulse = Math.sin(state.clock.elapsedTime * p.speed + i) * 0.1;
      
      dummy.position.set(p.x, p.y, p.z + pulse);
      dummy.rotation.set(Math.PI / 2, 0, 0); // Stand upright
      // Scale based on scroll if not core, or if core make it massive
      const s = 1 + pulse * scrollPulse;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      hexRef.current.setMatrixAt(i, dummy.matrix);
    }
    hexRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {core && (
        <mesh>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial 
            color="#FFB703" 
            emissive="#FFD166" 
            emissiveIntensity={1.5}
            wireframe={true}
            transparent={true}
            opacity={0.1}
          />
        </mesh>
      )}
      
      <instancedMesh ref={hexRef} args={[undefined, undefined, count]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 6]} />
        <meshStandardMaterial 
          color="#F5B700" 
          emissive="#FFB703"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
          transparent={true}
          opacity={0.8}
        />
      </instancedMesh>
    </group>
  );
}
