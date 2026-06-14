import { useMemo } from "react";
import { motion } from "framer-motion";

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
  duration: rand(8, 20),
  delay: rand(0, 10),
}));

const stars = Array.from({ length: 12 }, (_, i) => ({
  id: `s-${i}`,
  x: rand(0, 100),
  y: rand(0, 100),
  size: 4,
  color: STAR_COLOR,
  duration: rand(2, 4),
  delay: rand(0, 5),
}));

const orbs = Array.from({ length: 6 }, (_, i) => ({
  id: `o-${i}`,
  x: rand(0, 100),
  y: rand(0, 100),
  size: rand(80, 200),
  color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
  duration: rand(12, 25),
  delay: rand(0, 8),
}));

const cubes = Array.from({ length: 7 }, (_, i) => ({
  id: `c-${i}`,
  x: rand(0, 100),
  y: rand(0, 100),
  size: rand(8, 16),
  color: CUBE_COLORS[randInt(0, CUBE_COLORS.length - 1)],
  duration: rand(10, 20),
  delay: rand(0, 6),
}));

export default function ParticleBackground() {
  const particleData = useMemo(() => particles, []);
  const starData = useMemo(() => stars, []);
  const orbData = useMemo(() => orbs, []);
  const cubeData = useMemo(() => cubes, []);

  return (
    <div className="fixed inset-0 -z-0 overflow-hidden pointer-events-none">
      {particleData.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          animate={{
            y: [0, -30, 0, 20, 0],
            opacity: [0.4, 0.8, 0.5, 0.7, 0.4],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {starData.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            imageRendering: "pixelated",
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {orbData.map((o) => (
        <motion.div
          key={o.id}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${o.x}%`,
            top: `${o.y}%`,
            width: o.size,
            height: o.size,
            background: `radial-gradient(circle, ${o.color}33 0%, ${o.color}11 60%, transparent 100%)`,
          }}
          animate={{
            y: [0, -40, 0, 30, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: o.duration,
            delay: o.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {cubeData.map((c) => (
        <motion.div
          key={c.id}
          className="absolute"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: c.size,
            height: c.size,
            backgroundColor: c.color,
            imageRendering: "pixelated",
          }}
          animate={{
            y: [0, -20, 0, 15, 0],
            rotate: [0, 90, 180, 270, 360],
            opacity: [0.3, 0.6, 0.4, 0.5, 0.3],
          }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
