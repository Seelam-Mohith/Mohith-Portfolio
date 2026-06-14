import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const springX = useSpring(0, { stiffness: 150, damping: 15 });
  const springY = useSpring(0, { stiffness: 150, damping: 15 });
  const ringRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setIsDesktop(mq.matches);
    const handler = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    document.body.style.cursor = "none";
    return () => { document.body.style.cursor = ""; };
  }, [isDesktop]);

  useEffect(() => {
    springX.set(pos.x - 16);
    springY.set(pos.y - 16);
  }, [pos.x, pos.y, springX, springY]);

  if (!isDesktop) return null;

  return (
    <>
      <motion.div
        ref={ringRef}
        style={{
          x: springX,
          y: springY,
          borderImage: "linear-gradient(135deg, #a855f7, #ec4899) 1",
          boxShadow: "0 0 6px rgba(168,85,247,0.6)",
        }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 pointer-events-none z-[9999] mix-blend-difference"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] text-purple-400 font-mono select-none" style={{ textShadow: "0 0 4px #a855f7" }}>
            +
          </span>
        </div>
      </motion.div>
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: pos.x - 4,
          top: pos.y - 4,
          background: "linear-gradient(135deg, #a855f7, #ec4899)",
          boxShadow: "0 0 8px rgba(236,72,153,0.8)",
        }}
      />
    </>
  );
}
