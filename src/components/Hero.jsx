import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import { personalData } from '../data/portfolioData'

const badges = [
  { text: '2x Winner', top: '8%', right: '-8%', color: 'from-purple-600 to-pink-500', delay: 0.2 },
  { text: 'AI/ML', top: '42%', left: '-10%', color: 'from-blue-600 to-purple-500', delay: 0.6 },
  { text: 'MERN', bottom: '12%', right: '-3%', color: 'from-teal-500 to-blue-500', delay: 1.0 },
]

const cubes = [
  { top: '3%', right: '8%', size: 12, color: '#c084fc', delay: 0 },
  { bottom: '22%', left: '-3%', size: 10, color: '#ff2d9e', delay: 0.5 },
  { top: '32%', right: '-6%', size: 8, color: '#4a9eff', delay: 1.0 },
  { bottom: '4%', right: '18%', size: 14, color: '#a855f7', delay: 1.5 },
]

const diamonds = [
  { top: '18%', left: '8%', size: 8, delay: 0.3 },
  { top: '58%', right: '-3%', size: 6, delay: 0.8 },
  { bottom: '18%', left: '12%', size: 10, delay: 1.3 },
]

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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

  useEffect(() => {
    const handleMouse = (e) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  const handleScroll = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-16"
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(255,45,158,0.12) 0%, transparent 70%)' }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-[90px]"
          style={{ background: 'radial-gradient(circle, rgba(74,158,255,0.1) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

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
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 10}deg) rotateX(${-mousePos.y * 10}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <div className="relative flex items-center justify-center">
              {/* Glow behind image */}
              <motion.div
                className="absolute w-[130%] h-[130%] -top-[15%] -left-[15%]"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-blue-500/20 blur-[80px]" />
              </motion.div>

              {/* Second glow layer */}
              <motion.div
                className="absolute w-[110%] h-[110%] -top-[5%] -left-[5%]"
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-purple-400/10 via-transparent to-pink-400/10 blur-[60px]" />
              </motion.div>

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

              {/* Floating badges */}
              {badges.map((badge) => (
                <motion.div
                  key={badge.text}
                  className={`absolute px-3 py-1.5 rounded-full bg-gradient-to-r ${badge.color} text-white text-[10px] font-game tracking-wider shadow-lg shadow-purple-500/20`}
                  style={{
                    top: badge.top,
                    left: badge.left,
                    right: badge.right,
                    bottom: badge.bottom,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0.8, 1],
                    scale: [0, 1, 0.9, 1],
                    y: [0, -5, 0, -3, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: badge.delay,
                    ease: 'easeInOut',
                  }}
                >
                  {badge.text}
                </motion.div>
              ))}

              {/* Floating cubes */}
              {cubes.map((cube, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    top: cube.top,
                    left: cube.left,
                    right: cube.right,
                    bottom: cube.bottom,
                    width: cube.size,
                    height: cube.size,
                    backgroundColor: cube.color,
                  }}
                  animate={{
                    rotate: [0, 90, 180, 270, 360],
                    y: [0, -10, 0, 5, 0],
                    opacity: [0.4, 0.8, 0.5, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    delay: cube.delay,
                    ease: 'linear',
                  }}
                />
              ))}

              {/* Floating diamonds */}
              {diamonds.map((diamond, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    top: diamond.top,
                    left: diamond.left,
                    right: diamond.right,
                    bottom: diamond.bottom,
                    width: diamond.size,
                    height: diamond.size,
                    backgroundColor: '#c084fc',
                    transform: 'rotate(45deg)',
                    boxShadow: '0 0 10px rgba(192,132,252,0.4)',
                  }}
                  animate={{
                    y: [0, -8, 0, -4, 0],
                    opacity: [0.3, 0.9, 0.5, 0.7, 0.3],
                    scale: [1, 1.2, 0.9, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: diamond.delay,
                    ease: 'easeInOut',
                  }}
                />
              ))}
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
