import { useMemo } from "react";

const PARTICLE_COLORS = ["#a855f7", "#7c3aed", "#ec4899", "#d8b4fe"];

const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(rand(min, max + 1));

const particles = Array.from({ length: 8 }, (_, i) => ({
  id: `p-${i}`,
  x: rand(0, 100),
  y: rand(0, 100),
  size: rand(2, 4),
  color: PARTICLE_COLORS[randInt(0, PARTICLE_COLORS.length - 1)],
  duration: rand(14, 22),
  delay: rand(0, 6),
}));

const orbs = Array.from({ length: 2 }, (_, i) => ({
  id: `o-${i}`,
  x: i === 0 ? rand(10, 40) : rand(60, 90),
  y: rand(20, 80),
  size: rand(120, 180),
  color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
  duration: rand(18, 24),
  delay: rand(0, 4),
}));

export default function ParticleBackground() {
  const particleData = useMemo(() => particles, []);
  const orbData = useMemo(() => orbs, []);

  return (
    <div className="fixed inset-0 -z-0 overflow-hidden pointer-events-none">
      {particleData.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full particle-float"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: 0.3,
          }}
        />
      ))}

      {orbData.map((o) => (
        <div
          key={o.id}
          className="absolute rounded-full orb-float"
          style={{
            left: `${o.x}%`,
            top: `${o.y}%`,
            width: o.size,
            height: o.size,
            background: `radial-gradient(circle, ${o.color}22 0%, ${o.color}08 60%, transparent 100%)`,
            animationDuration: `${o.duration}s`,
            animationDelay: `${o.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
