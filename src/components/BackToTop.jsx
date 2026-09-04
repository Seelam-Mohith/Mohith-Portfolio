import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer backdrop-blur-md border transition-all duration-300 hover:scale-110"
          style={{
            background: "rgba(168,85,247,0.15)",
            borderColor: "rgba(168,85,247,0.4)",
            boxShadow: "0 0 12px rgba(168,85,247,0.3)",
          }}
        >
          <FaArrowUp className="text-purple-400 text-lg" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
