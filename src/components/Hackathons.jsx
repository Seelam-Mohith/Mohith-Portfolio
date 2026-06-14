import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  FaTrophy, FaMedal, FaStar, FaFire, FaCrown, FaGamepad,
  FaStarHalfAlt, FaPlus, FaLock, FaLockOpen,
} from 'react-icons/fa'
import { hackathons } from '../data/portfolioData'

const HACKATHON_DATA = [
  { icon: 'trophy', ...hackathons[0] },
  { icon: 'trophy', ...hackathons[1] },
  { icon: 'medal', ...hackathons[2] },
  { icon: 'medal', ...hackathons[3] },
]

const getPositionColor = (position) => {
  if (position.toLowerCase().includes('1st') || position.toLowerCase().includes('winner')) return 'gold'
  if (position.toLowerCase().includes('2nd') || position.toLowerCase().includes('runner')) return 'silver'
  return 'bronze'
}

const positionColors = {
  gold: { text: 'text-yellow-300', bg: 'bg-yellow-500/20', border: 'border-yellow-500/40', glow: 'rgba(250,204,21,0.3)', badge: 'bg-gradient-to-r from-yellow-500 to-amber-500', particle: '#fbbf24' },
  silver: { text: 'text-gray-300', bg: 'bg-gray-400/20', border: 'border-gray-400/40', glow: 'rgba(156,163,175,0.2)', badge: 'bg-gradient-to-r from-gray-400 to-slate-400', particle: '#9ca3af' },
  bronze: { text: 'text-orange-300', bg: 'bg-orange-500/20', border: 'border-orange-500/40', glow: 'rgba(251,146,60,0.2)', badge: 'bg-gradient-to-r from-amber-600 to-orange-500', particle: '#f97316' },
}

const PixelStar = ({ x, y, delay, size }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.6, 0.2, 0.8, 0],
      scale: [0, 1, 0.5, 1.2, 0],
      rotate: [0, 90, 180, 270, 360],
    }}
    transition={{
      duration: 4 + Math.random() * 3,
      repeat: Infinity,
      delay,
      ease: 'easeInOut',
    }}
  >
    <div
      className="relative"
      style={{
        width: size || 6,
        height: size || 6,
        imageRendering: 'pixelated',
        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
        background: 'linear-gradient(135deg, #c084fc, #fbbf24)',
        boxShadow: '0 0 6px rgba(192,132,252,0.6)',
      }}
    />
  </motion.div>
)

const ConfettiParticle = ({ x, y, delay, color }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: x, top: y, width: 4, height: 4, background: color || '#a855f7', borderRadius: '1px' }}
    initial={{ opacity: 0, y: 0, x: 0, rotate: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      y: [0, -60 + Math.random() * -40, -80 + Math.random() * -60],
      x: [0, (Math.random() - 0.5) * 80, (Math.random() - 0.5) * 120],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 2 + Math.random() * 2,
      repeat: Infinity,
      delay,
      ease: 'easeOut',
      repeatDelay: Math.random() * 4,
    }}
  />
)

const NewRevealBadge = () => (
  <motion.div
    className="absolute -top-2 -right-2 z-20"
    initial={{ scale: 0, rotate: -45 }}
    whileInView={{ scale: 1, rotate: 0 }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.6 }}
  >
    <motion.div
      className="relative px-2 py-0.5 text-[9px] font-bold font-display tracking-wider text-white rounded-sm"
      style={{
        background: 'linear-gradient(135deg, #a855f7, #ec4899)',
        boxShadow: '0 0 12px rgba(168,85,247,0.6), 0 2px 0 rgba(0,0,0,0.3)',
        imageRendering: 'pixelated',
      }}
      animate={{
        boxShadow: [
          '0 0 12px rgba(168,85,247,0.6), 0 2px 0 rgba(0,0,0,0.3)',
          '0 0 24px rgba(168,85,247,0.9), 0 2px 0 rgba(0,0,0,0.3)',
          '0 0 12px rgba(168,85,247,0.6), 0 2px 0 rgba(0,0,0,0.3)',
        ],
      }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      NEW
    </motion.div>
  </motion.div>
)

const PixelCorner = () => (
  <>
    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-purple-500/40 z-10" />
    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-purple-500/40 z-10" />
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-purple-500/40 z-10" />
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-purple-500/40 z-10" />
  </>
)

const AchievementCard = ({ hack, index }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })
  const rank = getPositionColor(hack.position)
  const colors = positionColors[rank]
  const isWinner = rank === 'gold'
  const TrophyIcon = isWinner ? FaTrophy : FaMedal

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'grayscale(100%) saturate(0%)' }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'grayscale(0%) saturate(100%)',
      }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        type: 'spring',
        stiffness: 80,
        damping: 16,
        delay: index * 0.15,
      }}
      whileHover={{ y: -8, transition: { type: 'spring', stiffness: 200, damping: 18 } }}
      className="group relative"
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: isInView
            ? 'rgba(26, 26, 46, 0.6)'
            : 'rgba(26, 26, 46, 0.3)',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${isWinner ? 'rgba(250,204,21,0.3)' : 'rgba(168,85,247,0.2)'}`,
          boxShadow: isWinner
            ? '0 0 30px rgba(250,204,21,0.1), inset 0 0 20px rgba(250,204,21,0.04)'
            : '0 0 20px rgba(168,85,247,0.06), inset 0 0 20px rgba(168,85,247,0.03)',
          transition: 'all 0.6s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = isWinner ? 'rgba(250,204,21,0.7)' : 'rgba(168,85,247,0.6)'
          e.currentTarget.style.boxShadow = isWinner
            ? '0 0 50px rgba(250,204,21,0.3), inset 0 0 30px rgba(250,204,21,0.08)'
            : '0 0 40px rgba(168,85,247,0.2), inset 0 0 30px rgba(168,85,247,0.08)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = isWinner ? 'rgba(250,204,21,0.3)' : 'rgba(168,85,247,0.2)'
          e.currentTarget.style.boxShadow = isWinner
            ? '0 0 30px rgba(250,204,21,0.1), inset 0 0 20px rgba(250,204,21,0.04)'
            : '0 0 20px rgba(168,85,247,0.06), inset 0 0 20px rgba(168,85,247,0.03)'
        }}
      >
        <PixelCorner />

        {/* Top gradient line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: isWinner
              ? 'linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24)'
              : 'linear-gradient(90deg, #a855f7, #ec4899, #a855f7)',
            opacity: 0.6,
          }}
        />

        {/* Animated glow behind trophies */}
        {isWinner && (
          <motion.div
            className="absolute -inset-4 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 30%, rgba(250,204,21,0.08) 0%, transparent 60%)',
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Confetti particles for winners */}
        {isWinner && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <ConfettiParticle
                key={i}
                x={`${15 + (i * 14)}%`}
                y={`${30 + (i % 3) * 20}%`}
                delay={i * 0.3}
                color={i % 2 === 0 ? '#fbbf24' : '#a855f7'}
              />
            ))}
          </div>
        )}

        {/* NEW badge */}
        <NewRevealBadge />

        <div className="p-5 md:p-6 space-y-4">
          {/* Trophy / Medal icon */}
          <div className="flex justify-center">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              whileInView={{
                y: 0,
                opacity: 1,
              }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 12,
                delay: 0.2 + index * 0.15,
              }}
              animate={isInView ? {
                y: [0, -6, 0],
              } : {}}
              className="relative"
            >
              <div
                className="absolute inset-0 blur-xl opacity-40"
                style={{
                  background: isWinner ? '#fbbf24' : '#a855f7',
                  borderRadius: '50%',
                }}
              />
              <TrophyIcon
                className="relative text-4xl md:text-5xl"
                style={{
                  color: isWinner ? '#fbbf24' : rank === 'silver' ? '#cbd5e1' : '#fb923c',
                  filter: `drop-shadow(0 0 ${isWinner ? '12' : '6'}px ${isWinner ? 'rgba(250,204,21,0.6)' : 'rgba(168,85,247,0.4)'})`,
                }}
              />
            </motion.div>
          </div>

          {/* Hackathon Name */}
          <motion.h3
            className="text-center text-lg md:text-xl font-display font-bold tracking-wide"
            style={{
              fontFamily: 'Orbitron, monospace',
              background: isWinner
                ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
                : 'linear-gradient(135deg, #c084fc, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {hack.name}
          </motion.h3>

          {/* Project description */}
          <p className="text-gray-400 font-body text-sm text-center leading-relaxed">
            {hack.project}
          </p>

          {/* Position Badge */}
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.4 + index * 0.15 }}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-display tracking-wider ${colors.badge} text-white`}
              style={{
                boxShadow: `0 0 16px ${isWinner ? 'rgba(250,204,21,0.4)' : 'rgba(168,85,247,0.3)'}`,
              }}
            >
              {isWinner ? <FaCrown className="text-[10px]" /> : <FaStarHalfAlt className="text-[10px]" />}
              <span>{hack.position}</span>
            </motion.div>
          </div>

          {/* Tech stack tags */}
          <div className="flex flex-wrap justify-center gap-1.5">
            {hack.tech.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.08 + index * 0.05, duration: 0.3 }}
                className="px-2 py-0.5 text-[10px] font-mono text-purple-300 rounded-sm"
                style={{
                  background: 'rgba(168,85,247,0.12)',
                  border: '1px solid rgba(168,85,247,0.25)',
                  imageRendering: 'pixelated',
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* XP decoration */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 + index * 0.15 }}
          >
            <span
              className="text-[10px] font-mono tracking-widest"
              style={{
                color: isWinner ? 'rgba(250,204,21,0.4)' : 'rgba(168,85,247,0.3)',
              }}
            >
              +{isWinner ? '500' : rank === 'silver' ? '300' : '150'} XP
            </span>
          </motion.div>
        </div>

        {/* Bottom shimmer on hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100"
          style={{
            background: isWinner
              ? 'linear-gradient(90deg, transparent, #fbbf24, transparent)'
              : 'linear-gradient(90deg, transparent, #a855f7, transparent)',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function Hackathons() {
  const sectionRef = useRef(null)
  const [unlockedCount, setUnlockedCount] = useState(0)
  const isSectionInView = useInView(sectionRef, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isSectionInView) {
      HACKATHON_DATA.forEach((_, i) => {
        setTimeout(() => setUnlockedCount(i + 1), i * 300 + 500)
      })
    }
  }, [isSectionInView])

  return (
    <section id="hackathons" ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden">
      {/* Floating pixel stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: '5%', y: '10%', delay: 0, size: 8 },
          { x: '92%', y: '15%', delay: 1.2, size: 6 },
          { x: '8%', y: '60%', delay: 0.8, size: 7 },
          { x: '95%', y: '70%', delay: 2.0, size: 5 },
          { x: '3%', y: '85%', delay: 0.5, size: 6 },
          { x: '97%', y: '40%', delay: 1.5, size: 8 },
          { x: '50%', y: '5%', delay: 1.8, size: 5 },
          { x: '45%', y: '92%', delay: 0.3, size: 6 },
        ].map((star, i) => (
          <PixelStar key={i} {...star} />
        ))}
      </div>

      {/* Background glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(255,45,158,0.06) 0%, transparent 70%)' }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.04) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2
            className="text-3xl md:text-5xl font-display font-bold tracking-[0.2em]"
            style={{
              background: 'linear-gradient(135deg, #c084fc, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ACHIEVEMENTS
          </h2>
          <motion.p
            className="mt-3 text-sm md:text-base font-mono text-purple-400/70 tracking-[0.15em]"
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.15em' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            ~ Hackathons & Competitions ~
          </motion.p>
        </motion.div>

        {/* Trophies unlocked counter / progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center mb-12"
        >
          <div
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl mb-3"
            style={{
              background: 'rgba(26, 26, 46, 0.5)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(168,85,247,0.2)',
            }}
          >
            <motion.div
              animate={isSectionInView ? { rotate: [0, -10, 10, -10, 0] } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <FaGamepad className="text-purple-400 text-lg" />
            </motion.div>
            <span className="text-sm font-display font-bold tracking-wider text-gray-300">
              Trophies Unlocked:{' '}
              <motion.span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #c084fc, #fbbf24)',
                }}
              >
                {unlockedCount}
              </motion.span>
              /{HACKATHON_DATA.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-md h-2 rounded-full overflow-hidden" style={{ background: 'rgba(168,85,247,0.1)' }}>
            <motion.div
              className="h-full rounded-full relative"
              style={{
                background: 'linear-gradient(90deg, #a855f7, #c084fc, #fbbf24)',
                boxShadow: '0 0 12px rgba(168,85,247,0.4)',
              }}
              initial={{ width: '0%' }}
              whileInView={{ width: `${(unlockedCount / HACKATHON_DATA.length) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            >
              <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white"
                style={{ boxShadow: '0 0 12px rgba(168,85,247,0.8)' }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Achievement Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
        >
          {HACKATHON_DATA.map((hack, index) => (
            <AchievementCard key={hack.name} hack={hack} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
