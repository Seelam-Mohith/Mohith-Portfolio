import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export default function EasterEgg() {
  const [show, setShow] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const handler = (e) => {
      const expected = KONAMI[indexRef.current];
      if (e.key === expected) {
        indexRef.current++;
        if (indexRef.current === KONAMI.length) {
          setShow(true);
          indexRef.current = 0;
        }
      } else {
        indexRef.current = 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center"
          style={{ backdropFilter: "blur(6px)" }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative w-[90vw] max-w-md p-8 rounded-2xl border text-center backdrop-blur-xl"
            style={{
              background: "rgba(15,5,30,0.92)",
              borderColor: "rgba(168,85,247,0.5)",
              boxShadow: "0 0 40px rgba(168,85,247,0.4)",
            }}
          >
            <div className="mb-4 flex justify-center gap-1">
              {[0,0,0].map((_, i) => (
                <span
                  key={i}
                  className="text-purple-500/30 text-[10px] font-mono"
                >
                  &#9835;
                </span>
              ))}
            </div>

            <div className="text-4xl mb-3">&#128081;</div>

            <h2
              className="text-2xl font-bold mb-2 tracking-widest uppercase"
              style={{
                background: "linear-gradient(135deg, #a855f7, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Cheat Code Activated!
            </h2>

            <div className="flex justify-center my-4">
              <svg width="80" height="80" viewBox="0 0 80 80" className="drop-shadow-[0_0_10px_#a855f7]">
                <rect x="4" y="20" width="8" height="8" fill="#a855f7" />
                <rect x="12" y="12" width="8" height="8" fill="#c084fc" />
                <rect x="20" y="4" width="8" height="8" fill="#a855f7" />
                <rect x="28" y="12" width="8" height="8" fill="#e9d5ff" />
                <rect x="36" y="4" width="8" height="8" fill="#a855f7" />
                <rect x="44" y="12" width="8" height="8" fill="#c084fc" />
                <rect x="52" y="4" width="8" height="8" fill="#a855f7" />
                <rect x="60" y="12" width="8" height="8" fill="#c084fc" />
                <rect x="68" y="20" width="8" height="8" fill="#a855f7" />
                <rect x="12" y="20" width="8" height="8" fill="#e9d5ff" />
                <rect x="60" y="20" width="8" height="8" fill="#e9d5ff" />
                {Array.from({ length: 11 }).map((_, i) => (
                  <rect key={i} x={12 + i * 4} y={28 + i * 2} width="4" height="4" fill={i % 2 ? "#a855f7" : "#c084fc"} opacity={0.7 - i * 0.05} />
                ))}
                {Array.from({ length: 6 }).map((_, i) => (
                  <rect key={i} x={16 + i * 8} y="60" width="4" height="16" fill="#a855f7" opacity={0.5 + i * 0.08} />
                ))}
                <rect x="20" y="56" width="40" height="4" fill="#c084fc" />
              </svg>
            </div>

            <p className="text-purple-300 text-lg font-mono mb-2">
              DEVELOPER UNLOCKED
            </p>
            <p className="text-pink-300/80 text-sm font-mono mb-6">
              Achievement Unlocked: Master Explorer
            </p>
            <p className="text-purple-400/60 text-xs font-mono mb-6">
              You found the secret!
            </p>

            <button
              onClick={() => setShow(false)}
              className="px-6 py-2 rounded-lg text-sm font-mono tracking-wider cursor-pointer border transition-all"
              style={{
                color: "#a855f7",
                borderColor: "rgba(168,85,247,0.5)",
                background: "rgba(168,85,247,0.1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(168,85,247,0.25)";
                e.currentTarget.style.boxShadow = "0 0 16px rgba(168,85,247,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(168,85,247,0.1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
