import { useMemo } from "react";

const PARTICLE_COLORS = ["#a855f7", "#7c3aed", "#ec4899", "#d8b4fe"];
const STAR_COLOR = "#c084fc";
const CUBE_COLORS = ["#a855f7", "#7c3aed", "#ec4899", "#d8b4fe", "#c084fc"];

const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(rand(min, max + 1));

const particles = Array.from({ length: 35 }, (_, i) => ({
  id: `p-${i}`,
  x: rand(0, 100),
  y: rand(0, 100),
  size: rand(2, 6),
  color: PARTICLE_COLORS[randInt(0, PARTICLE_COLORS.length - 1)],
  duration: rand(10, 18),
  delay: rand(0, 8),
}));

const stars = Array.from({ length: 12 }, (_, i) => ({
  id: `s-${i}`,
  x: rand(0, 100),
  y: rand(0, 100),
  size: 4,
  color: STAR_COLOR,
  duration: rand(2, 4),
  delay: rand(0, 4),
}));

const orbs = Array.from({ length: 6 }, (_, i) => ({
  id: `o-${i}`,
  x: rand(0, 100),
  y: rand(0, 100),
  size: rand(80, 200),
  color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
  duration: rand(15, 22),
  delay: rand(0, 6),
}));

const cubes = Array.from({ length: 7 }, (_, i) => ({
  id: `c-${i}`,
  x: rand(0, 100),
  y: rand(0, 100),
  size: rand(8, 16),
  color: CUBE_COLORS[randInt(0, CUBE_COLORS.length - 1)],
  duration: rand(12, 18),
  delay: rand(0, 5),
}));

export default function ParticleBackground() {
  const particleData = useMemo(() => particles, []);
  const starData = useMemo(() => stars, []);
  const orbData = useMemo(() => orbs, []);
  const cubeData = useMemo(() => cubes, []);

  return (
    <div className="fixed inset-0 -z-0 overflow-hidden pointer-events-none will-change-transform">
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
            opacity: 0.4,
          }}
        />
      ))}

      {starData.map((s) => (
        <div
          key={s.id}
          className="absolute star-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            imageRendering: "pixelated",
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
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
            background: `radial-gradient(circle, ${o.color}33 0%, ${o.color}11 60%, transparent 100%)`,
            animationDuration: `${o.duration}s`,
            animationDelay: `${o.delay}s`,
          }}
        />
      ))}

      {cubeData.map((c) => (
        <div
          key={c.id}
          className="absolute cube-spin"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: c.size,
            height: c.size,
            backgroundColor: c.color,
            imageRendering: "pixelated",
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
            opacity: 0.3,
          }}
        />
      ))}
    </div>
  );
}
