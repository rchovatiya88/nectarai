import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Experience from "./components/canvas/Experience";
import Overlay from "./components/overlays/Overlay";
import Navigation from "./components/Navigation";
import PricingPage from "./components/PricingPage";
import BeeConfigurator from "./components/BeeConfigurator";
import type { Bee } from "./data/bees";

export default function App() {
  const [selectedBee, setSelectedBee] = useState<Bee | null>(null);

  if (window.location.pathname === "/pricing") {
    return <PricingPage />;
  }

  return (
    <div className="w-full h-screen bg-nectar-black selection:bg-nectar-honey selection:text-nectar-black font-sans">
      <Navigation />

      {/* Bee Configurator rendered OUTSIDE canvas for proper z-index */}
      <BeeConfigurator bee={selectedBee} onClose={() => setSelectedBee(null)} />

      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 5, 20]} />
        <ambientLight intensity={0.5} />

        <Suspense fallback={null}>
          <ScrollControls pages={7} damping={0.1} style={{ scrollbarWidth: "none" }}>
            <Experience />
            <Overlay onSelectBee={setSelectedBee} />
          </ScrollControls>
          <EffectComposer enableNormalPass={false}>
            <Bloom mipmapBlur intensity={1.2} luminanceThreshold={0.4} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
