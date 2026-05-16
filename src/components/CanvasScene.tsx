import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Experience from "./canvas/Experience";
import Overlay from "./overlays/Overlay";
import type { Bee } from "../data/bees";

interface CanvasSceneProps {
  onSelectBee: (bee: Bee) => void;
  onReady?: () => void;
}

export default function CanvasScene({ onSelectBee, onReady }: CanvasSceneProps) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]} onCreated={onReady}>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 5, 20]} />
      <ambientLight intensity={0.5} />

      <Suspense fallback={null}>
        <ScrollControls pages={10} damping={0.1} style={{ scrollbarWidth: "none" }}>
          <Experience />
          <Overlay onSelectBee={onSelectBee} />
        </ScrollControls>
        <EffectComposer enableNormalPass={false}>
          <Bloom mipmapBlur intensity={1.2} luminanceThreshold={0.4} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
