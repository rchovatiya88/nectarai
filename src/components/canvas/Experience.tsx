import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Bees from "./Bees";
import Flower from "./Flower";
import Hive from "./Hive";
import Particles from "./Particles";
import { useWindowScrollRef } from "./useWindowScroll";

export default function Experience() {
  const scrollRef = useWindowScrollRef();
  const cameraGroup = useRef<THREE.Group>(null);
  const cursorLightRef = useRef<THREE.PointLight>(null);
  const pointerVec = new THREE.Vector3();

  useFrame((state, delta) => {
    if (!cameraGroup.current) return;

    const scroll = scrollRef.current;

    // Smooth scroll camera
    cameraGroup.current.position.z = THREE.MathUtils.lerp(
      cameraGroup.current.position.z,
      -scroll * 25,
      delta * 12
    );

    // Add slight sway based on scroll
    cameraGroup.current.rotation.y = THREE.MathUtils.lerp(
      cameraGroup.current.rotation.y,
      Math.sin(scroll * Math.PI * 4) * 0.1,
      delta * 8
    );

    // Mouse follow light
    if (cursorLightRef.current) {
      pointerVec.set(
        (state.pointer.x * state.viewport.width) / 2,
        (state.pointer.y * state.viewport.height) / 2,
        0
      );

      cursorLightRef.current.position.lerp(pointerVec, delta * 5);
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} color="#ffffff" />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#FFD166" />

      {/* Orb following cursor */}
      <pointLight ref={cursorLightRef} intensity={2} color="#F5B700" distance={10} />

      <group ref={cameraGroup}>
        <Particles count={300} />

        {/* Section 1: Hero - Flower & Interactive Bees */}
        <group position={[1.5, -1, -2]}>
          <Flower scale={1.5} />
          {/* Main hero swarm - interactive */}
          <Bees count={20} radius={4} center={[0, 1, 0]} burst={false} interactive />
        </group>

        {/* Section 2: Problem - Dim flower */}
        <group position={[-2.5, -1, -8]}>
          <Flower scale={1} dim={true} />
        </group>

        {/* Section 3 & 4: Hive & Transformation - larger interactive swarm */}
        <group position={[1.5, 0, -14]}>
          <Hive scale={2} />
          <Bees count={50} radius={8} center={[0, 0, 0]} burst={true} interactive />
        </group>

        {/* Section 5: Process Path */}
        <group position={[-1.5, 0, -20]}>
          <Bees count={30} radius={5} center={[0, 0, 0]} burst={true} interactive />
        </group>

        {/* Section 6 & 7: Hive Core */}
        <group position={[0, 0, -26]}>
          <Hive scale={5} core={true} />
        </group>
      </group>
    </>
  );
}
