import { useEffect, useRef, useState } from 'react';

export default function RocketCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [target, setTarget] = useState({ x: -100, y: -100 });
  const [angle, setAngle] = useState(-90);
  const prevPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    setIsDesktop(mq.matches);

    const handler = (e) => {
      setTarget({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = '';
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;

    const follow = () => {
      setPos((prev) => {
        const nx = prev.x + (target.x - prev.x) * 0.25;
        const ny = prev.y + (target.y - prev.y) * 0.25;
        const dx = nx - prevPosRef.current.x;
        const dy = ny - prevPosRef.current.y;

        if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
          const a = (Math.atan2(dy, dx) * 180) / Math.PI;
          setAngle(a);
        }
        prevPosRef.current = { x: nx, y: ny };

        if (Math.abs(nx - prev.x) < 0.1 && Math.abs(ny - prev.y) < 0.1) return prev;
        return { x: nx, y: ny };
      });
      rafRef.current = requestAnimationFrame(follow);
    };
    rafRef.current = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isDesktop, target]);

  if (!isDesktop) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
    >
      <svg
        className="block"
        style={{
          transform: `translate(-50%, -50%) rotate(${angle}deg)`,
          filter: 'drop-shadow(0 0 6px rgba(168,85,247,0.9)) drop-shadow(0 0 12px rgba(255,45,158,0.5))',
        }}
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="rc-body" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ff2d9e" />
          </linearGradient>
          <linearGradient id="rc-flame" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ff2d9e" />
          </linearGradient>
        </defs>

        {/* Rocket drawn pointing RIGHT (nose at +X), rotation follows velocity */}
        <g>
          {/* Nose cone */}
          <path d="M33 17 L26 13.5 L26 20.5 Z" fill="url(#rc-body)" />
          {/* Main body */}
          <rect x="13" y="13.5" width="13" height="7" rx="1.2" fill="url(#rc-body)" />
          {/* Body accent pixel line */}
          <rect x="16" y="15" width="9" height="1.6" fill="#ffffff" opacity="0.35" />
          {/* Window */}
          <circle cx="21.5" cy="17" r="2.7" fill="#ffffff" />
          <circle cx="21.5" cy="17" r="1.5" fill="#0a0a1a" />
          {/* Top fin */}
          <path d="M17 13.5 L10 8 L13.5 13.5 Z" fill="url(#rc-body)" />
          {/* Bottom fin */}
          <path d="M17 20.5 L10 26 L13.5 20.5 Z" fill="url(#rc-body)" />
          {/* Flame */}
          <path d="M13 14.5 Q9 11.5 4 14 Q10 17 13 16.5 Z" fill="url(#rc-flame)" opacity="0.95" />
          <path d="M13 19.5 Q9 22.5 4 20 Q10 17 13 17.5 Z" fill="url(#rc-flame)" opacity="0.85" />
        </g>
      </svg>
    </div>
  );
}
