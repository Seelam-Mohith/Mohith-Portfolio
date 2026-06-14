import { useState } from "react";
import { motion } from "framer-motion";
import { FaMusic, FaVolumeMute } from "react-icons/fa";

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="fixed bottom-8 left-8 z-40 flex items-center gap-2">
      <motion.div
        className="relative group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute -top-2 text-[6px] text-purple-500/40 font-mono select-none pointer-events-none"
            style={{ left: `${4 + i * 6}px` }}
          >
            &#9835;
          </span>
        ))}
        <motion.button
          onClick={() => setPlaying((p) => !p)}
          className="relative w-12 h-12 rounded-full flex items-center justify-center cursor-pointer backdrop-blur-md border"
          style={{
            background: "rgba(168,85,247,0.15)",
            borderColor: "rgba(168,85,247,0.4)",
            boxShadow: playing
              ? "0 0 18px rgba(236,72,153,0.5)"
              : "0 0 12px rgba(168,85,247,0.3)",
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 24px rgba(168,85,247,0.6)",
          }}
          whileTap={{ scale: 0.9 }}
          title="Retro Music"
        >
          <motion.div
            animate={playing ? { rotate: [0, 360] } : { rotate: 0 }}
            transition={
              playing
                ? { repeat: Infinity, duration: 3, ease: "linear" }
                : {}
            }
          >
            {playing ? (
              <FaMusic className="text-pink-400 text-lg" />
            ) : (
              <FaVolumeMute className="text-purple-400 text-lg" />
            )}
          </motion.div>
        </motion.button>

        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <span className="text-[10px] text-purple-300 whitespace-nowrap font-mono">
            Retro Music
          </span>
        </div>
      </motion.div>
    </div>
  );
}
