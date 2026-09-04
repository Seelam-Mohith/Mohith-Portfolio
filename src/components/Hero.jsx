import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import { personalData } from '../data/portfolioData'

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 14 },
  },
}

export default function Hero() {
  const handleScroll = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-16"
    >
      {/* Pixel grid overlay */}
      <div className="absolute inset-0 pixel-grid opacity-30 pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* LEFT SIDE */}
          <motion.div
            className="flex-1 w-full"
            variants={staggerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={fadeUp}
              className="text-purple-400 font-display text-sm md:text-base tracking-[0.2em] mb-4"
            >
              &lt; HELLO_WORLD /&gt;
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4"
            >
              <span className="text-gradient">{personalData.name}</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-purple-300 font-body text-base md:text-lg tracking-wide mb-6"
            >
              {personalData.subtitle}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-gray-400 font-accent text-sm md:text-base leading-relaxed max-w-xl mb-8"
            >
              {personalData.intro}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-4 mb-10"
            >
              <button
                className="game-button text-white"
                onClick={() => handleScroll('#projects')}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8" />
                    <path d="M12 17v4" />
                  </svg>
                  View Projects
                </span>
              </button>

              <a
                href={personalData.resumeUrl}
                download
                className="relative inline-flex items-center gap-2 px-6 py-3 font-display font-bold text-sm uppercase tracking-wider
                  border-2 border-purple-500/50 text-purple-300
                  transition-all duration-300
                  hover:bg-purple-600/30 hover:border-purple-400 hover:text-white hover:shadow-lg hover:shadow-purple-500/20
                  active:scale-95"
                style={{
                  clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Resume
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4"
            >
              {[
                { href: personalData.social.github, icon: FaGithub, label: 'GitHub' },
                { href: personalData.social.linkedin, icon: FaLinkedin, label: 'LinkedIn' },
                { href: personalData.social.leetcode, icon: SiLeetcode, label: 'LeetCode' },
              ].map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass glass-hover w-12 h-12 flex items-center justify-center rounded-xl text-purple-400 text-xl transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                >
                  <Icon />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            className="flex-1 w-full max-w-md lg:max-w-none relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          >
            <div className="relative flex items-center justify-center">
              {/* Profile image */}
              <div className="relative pixel-border rounded-2xl p-1 lg:-mt-12">
                <div className="relative bg-dark-400/90 rounded-2xl p-8 backdrop-blur-sm overflow-hidden border border-purple-500/10">
                  <motion.img
                    src="/mohith.png"
                    alt="Mohith"
                    className="relative w-80 h-85 object-cover rounded-xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-[10px] font-game text-purple-400/60 tracking-[0.2em]">SCROLL</span>
        <div className="w-4 h-6 border-2 border-purple-500/30 rounded-full flex justify-center pt-1">
          <motion.div
            className="w-1 h-1.5 bg-purple-400 rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
