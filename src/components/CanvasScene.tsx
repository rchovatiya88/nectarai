import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Experience from "./canvas/Experience";

export default function CanvasScene() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      >
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 5, 20]} />
        <ambientLight intensity={0.5} />

        <Suspense fallback={null}>
          <Experience />
          <EffectComposer enableNormalPass={false}>
            <Bloom mipmapBlur intensity={1.2} luminanceThreshold={0.4} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
