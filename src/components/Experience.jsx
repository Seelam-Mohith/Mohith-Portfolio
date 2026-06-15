import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  FaCalendarAlt, FaArrowRight, FaTrophy, FaStar,
  FaCode, FaServer, FaBrain, FaGithub, FaLaptopCode,
} from 'react-icons/fa'
import { experiences } from '../data/portfolioData'

const roleDecorations = [
  { icon: FaCode, label: 'Full-Stack' },
  { icon: FaGithub, label: 'Open Source' },
  { icon: FaBrain, label: 'AI/ML' },
]

const floatingIcons = [
  { icon: FaCode, x: '5%', y: '12%', delay: 0, size: 26, color: '#a855f7' },
  { icon: FaServer, x: '88%', y: '15%', delay: 1.5, size: 22, color: '#ff2d9e' },
  { icon: FaGithub, x: '8%', y: '68%', delay: 0.8, size: 24, color: '#c084fc' },
  { icon: FaLaptopCode, x: '92%', y: '73%', delay: 2.0, size: 20, color: '#7e22ce' },
  { icon: FaBrain, x: '6%', y: '42%', delay: 0.3, size: 28, color: '#a855f7' },
  { icon: FaStar, x: '90%', y: '45%', delay: 1.2, size: 18, color: '#ec4899' },
]

const variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardFromLeft = {
  hidden: { opacity: 0, x: -60, y: 30 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 18 },
  },
}

const cardFromRight = {
  hidden: { opacity: 0, x: 60, y: 30 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 18 },
  },
}

const PixelCorner = () => (
  <>
    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-purple-500/40 z-10" />
    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-purple-500/40 z-10" />
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-purple-500/40 z-10" />
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-purple-500/40 z-10" />
  </>
)

const PixelConnector = ({ isLeft }) => (
  <div
    className={`hidden md:flex absolute top-5 items-center ${
      isLeft ? 'right-0 flex-row' : 'left-0 flex-row-reverse'
    }`}
  >
    <div className="flex items-center gap-[1px]">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[3px] h-[3px]"
          style={{ background: i < 4 ? 'rgba(168,85,247,0.5)' : 'rgba(168,85,247,0.2)' }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
    <div className="w-6 h-[2px] bg-gradient-to-r from-purple-500/50 to-transparent" />
  </div>
)

const ExperienceCard = ({ exp, index, isLeft }) => {
  const DecorationIcon = roleDecorations[index]?.icon || FaCode

  return (
    <motion.div
      variants={isLeft ? cardFromLeft : cardFromRight}
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(26, 26, 46, 0.5)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          boxShadow: '0 0 20px rgba(168, 85, 247, 0.06), inset 0 0 20px rgba(168, 85, 247, 0.03)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.6)'
          e.currentTarget.style.boxShadow = '0 0 40px rgba(168, 85, 247, 0.2), inset 0 0 30px rgba(168, 85, 247, 0.08)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.2)'
          e.currentTarget.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.06), inset 0 0 20px rgba(168, 85, 247, 0.03)'
        }}
      >
        <PixelCorner />

        {/* Top gradient accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, #a855f7, #ec4899, #a855f7)',
            opacity: 0.6,
          }}
        />

        {/* Role decoration icon */}
        <motion.div
          className="absolute top-3 right-3 text-purple-500/10"
          animate={{
            y: [0, -8, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.5,
          }}
        >
          <DecorationIcon size={36} />
        </motion.div>

        <div className="p-5 md:p-6 space-y-4">
          {/* Role */}
          <h3
            className="text-lg md:text-xl font-accent font-bold tracking-wide"
            style={{
              fontFamily: 'Orbitron, monospace',
              background: 'linear-gradient(135deg, #c084fc, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {exp.role}
          </h3>

          {/* Organization */}
          <p className="text-gray-300 font-body text-sm font-medium">
            {exp.organization}
          </p>

          {/* Duration */}
          <div className="flex items-center gap-2 text-gray-400 font-body text-xs">
            <FaCalendarAlt className="text-purple-400 flex-shrink-0" />
            <span>{exp.duration}</span>
          </div>

          {/* Responsibilities */}
          <div className="space-y-2">
            <p className="text-purple-300 font-accent text-xs tracking-wider uppercase">Responsibilities</p>
            <ul className="space-y-1.5">
              {exp.responsibilities.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                  className="flex items-start gap-2 text-gray-400 font-body text-sm"
                >
                  <FaArrowRight className="text-purple-500/70 text-[10px] mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Achievements */}
          {exp.achievements && exp.achievements.length > 0 && (
            <div className="space-y-2">
              <p className="flex items-center gap-1.5 text-pink-300 font-accent text-xs tracking-wider uppercase">
                <FaTrophy className="text-pink-400 text-[10px]" />
                Achievements
              </p>
              <ul className="space-y-1.5">
                {exp.achievements.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 * i, duration: 0.4 }}
                    className="flex items-start gap-2 text-gray-400 font-body text-sm"
                  >
                    <FaStar className="text-yellow-500/70 text-[10px] mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

const TimelineDot = ({ index }) => (
  <div className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
    <motion.div
      className="w-10 h-10 rounded-full flex items-center justify-center"
      style={{
        background: 'rgba(26, 26, 46, 0.8)',
        border: '2px solid rgba(168, 85, 247, 0.6)',
      }}
      animate={{
        boxShadow: [
          '0 0 12px rgba(168,85,247,0.4), inset 0 0 8px rgba(168,85,247,0.1)',
          '0 0 28px rgba(168,85,247,0.7), inset 0 0 16px rgba(168,85,247,0.3)',
          '0 0 12px rgba(168,85,247,0.4), inset 0 0 8px rgba(168,85,247,0.1)',
        ],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: index * 0.4,
      }}
    >
      <motion.div
        className="w-3 h-3 rounded-full"
        style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}
        animate={{
          scale: [1, 1.4, 1],
          boxShadow: [
            '0 0 6px rgba(168,85,247,0.6)',
            '0 0 18px rgba(168,85,247,0.9)',
            '0 0 6px rgba(168,85,247,0.6)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.4,
        }}
      />
    </motion.div>
  </div>
)

export default function Experience() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 0.95], ['0%', '100%'])

  return (
    <section id="experience" ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden">
      {/* Floating background icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingIcons.map((item, i) => (
          <motion.div
            key={i}
            className="absolute opacity-[0.04]"
            style={{ left: item.x, top: item.y }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 8, -8, 0],
            }}
            transition={{
              duration: 7 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: item.delay,
            }}
          >
            <item.icon size={item.size} color={item.color} />
          </motion.div>
        ))}
      </div>

      {/* Gradient orbs */}
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
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl md:text-5xl font-accent font-bold tracking-[0.2em]"
            style={{
              background: 'linear-gradient(135deg, #c084fc, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            EXPERIENCE
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line wrapper */}
          <div className="absolute left-[19px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[3px] rounded-full overflow-hidden">
            {/* Base line */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-purple-500/20 to-pink-500/10" />
            {/* Animated progress */}
            <motion.div
              className="absolute top-0 left-0 w-full rounded-full"
              style={{
                height: lineHeight,
                background: 'linear-gradient(180deg, #a855f7, #c084fc, #ec4899)',
                boxShadow: '0 0 12px rgba(168,85,247,0.5), 0 0 30px rgba(168,85,247,0.2)',
              }}
            />
          </div>

          {/* Experience entries */}
          <motion.div
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-12 md:space-y-20"
          >
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0

              return (
                <div key={index} className="relative flex items-start gap-4 md:gap-0">
                  {/* Left side - card or empty */}
                  <div
                    className={`flex-1 min-w-0 md:w-[calc(50%-2rem)] md:flex-none ${
                      isLeft
                        ? 'md:mr-auto md:pr-10'
                        : 'md:ml-auto md:pl-10 md:order-2'
                    }`}
                  >
                    <ExperienceCard exp={exp} index={index} isLeft={isLeft} />
                    <PixelConnector isLeft={isLeft} />
                  </div>

                  {/* Timeline dot */}
                  <TimelineDot index={index} />

                  {/* Right side - empty space on desktop (for left cards) */}
                  <div
                    className={`hidden md:block md:w-[calc(50%-2rem)] ${
                      isLeft ? '' : 'md:order-1'
                    }`}
                  />
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
