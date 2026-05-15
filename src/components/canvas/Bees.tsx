import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface BeesProps {
  count?: number;
  radius?: number;
  center?: [number, number, number];
  burst?: boolean;
  interactive?: boolean;
  onBeeHover?: (beeName: string | null) => void;
}

export default function Bees({
  count = 20,
  radius = 4,
  center = [0, 0, 0],
  burst = false,
  interactive = false,
}: BeesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredBee, setHoveredBee] = useState<number | null>(null);

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
        phase: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, [count, radius]);

  // Raycaster for hover detection
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouse = useMemo(() => new THREE.Vector2(), []);

  useFrame((state, delta) => {
    if (!meshRef.current || !groupRef.current) return;

    // Group orbits slowly
    groupRef.current.rotation.y += delta * 0.1;

    // Raycasting for hover only if interactive
    if (interactive) {
      mouse.set(state.pointer.x, state.pointer.y);
      raycaster.setFromCamera(mouse, state.camera);

      // Create temporary sphere representations for each bee for raycasting
      const beePositions: THREE.Vector3[] = [];
      for (let i = 0; i < count; i++) {
        const p = particles[i];
        const t = state.clock.elapsedTime + p.phase;
        const x = p.x + Math.sin(t * p.speedX) * (burst ? 2 : 0.5);
        const y = p.y + Math.cos(t * p.speedY) * (burst ? 2 : 0.5);
        const z = p.z + Math.sin(t * p.speedZ) * (burst ? 2 : 0.5);

        // Apply group rotation to position
        const vec = new THREE.Vector3(x, y, z);
        vec.applyAxisAngle(new THREE.Vector3(0, 1, 0), groupRef.current.rotation.y);
        vec.add(new THREE.Vector3(...center));
        beePositions.push(vec);
      }

      // Simple distance-based hover (more reliable than instanced mesh raycasting)
      const ray = raycaster.ray;
      let closestIdx: number | null = null;
      let closestDist = Infinity;

      for (let i = 0; i < count; i++) {
        const dist = ray.distanceToPoint(beePositions[i]);
        if (dist < 0.4 && dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
        }
      }

      if (closestIdx !== hoveredBee) {
        setHoveredBee(closestIdx);
      }
    }

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
        p.x + Math.sin((t + 0.1) * p.speedX) * (burst ? 2 : 0.5),
        p.y + Math.cos((t + 0.1) * p.speedY) * (burst ? 2 : 0.5),
        p.z + Math.sin((t + 0.1) * p.speedZ) * (burst ? 2 : 0.5)
      );

      const isHovered = hoveredBee === i;
      dummy.scale.setScalar(burst ? (isHovered ? 2.5 : 1.5) : isHovered ? 2 : 1);

      // Emissive color change on hover
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

      {/* Hover tooltip */}
      {hoveredBee !== null && interactive && (
        <Html position={[particles[hoveredBee].x, particles[hoveredBee].y + 0.5, particles[hoveredBee].z]}>
          <div className="pointer-events-none rounded-lg border border-nectar-honey/30 bg-black/90 px-3 py-1.5 text-xs text-nectar-honey whitespace-nowrap backdrop-blur-md">
            🐝 AI Bee #{hoveredBee + 1}
          </div>
        </Html>
      )}
    </group>
  );
}
