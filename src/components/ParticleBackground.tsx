import { useMemo } from "react";

export default function ParticleBackground() {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 15,
      duration: Math.random() * 10 + 12,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 hex-grid opacity-50" />

      <div className="glow-orb w-96 h-96 bg-nectar-honey/20 -top-48 -left-48" style={{ animationDelay: "0s" }} />
      <div className="glow-orb w-80 h-80 bg-nectar-amber/15 top-1/3 -right-40" style={{ animationDelay: "3s" }} />
      <div className="glow-orb w-64 h-64 bg-nectar-honey/10 bottom-20 left-1/4" style={{ animationDelay: "5s" }} />

      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
