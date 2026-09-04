import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa'
import { SiOracle, SiIbm } from 'react-icons/si'
import { certifications } from '../data/portfolioData'

const accentBars = [
  'linear-gradient(90deg, #a855f7, #ff2d9e)',
  'linear-gradient(90deg, #ff2d9e, #f59e0b)',
  'linear-gradient(90deg, #4a9eff, #a855f7)',
  'linear-gradient(90deg, #f59e0b, #4a9eff)',
  'linear-gradient(90deg, #7e22ce, #ff2d9e)',
  'linear-gradient(90deg, #22c55e, #4a9eff)',
]

const cardGlowColors = [
  'rgba(168,85,247,0.3)',
  'rgba(255,45,158,0.3)',
  'rgba(74,158,255,0.3)',
  'rgba(245,158,11,0.3)',
  'rgba(126,34,206,0.3)',
  'rgba(34,197,94,0.3)',
]

const PixelCorner = () => (
  <>
    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-purple-500/40 z-10" />
    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-purple-500/40 z-10" />
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-purple-500/40 z-10" />
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-purple-500/40 z-10" />
  </>
)

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
}

function CertificationCard({ cert, index }) {
  const [isHovered, setIsHovered] = useState(false)

  const accent = accentBars[index % accentBars.length]
  const glowColor = cardGlowColors[index % cardGlowColors.length]

  return (
    <motion.div variants={cardVariants} className="group h-full">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          y: isHovered ? -10 : 0,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative rounded-2xl overflow-hidden cursor-default h-full flex flex-col"
      >
        {/* Accent bar at top */}
        <div className="relative h-2 w-full shrink-0" style={{ background: accent }} />

        <div
          className="relative transition-all duration-500 flex-1 flex flex-col"
          style={{
            background: `rgba(26, 26, 46, ${isHovered ? 0.7 : 0.5})`,
            backdropFilter: 'blur(12px)',
            border: `1px solid ${isHovered ? glowColor.replace('0.3', '0.6') : 'rgba(168, 85, 247, 0.15)'}`,
            borderTop: 'none',
            boxShadow: isHovered
              ? `0 0 40px ${glowColor}, inset 0 0 30px rgba(168, 85, 247, 0.08)`
              : '0 0 15px rgba(168, 85, 247, 0.05), inset 0 0 15px rgba(168, 85, 247, 0.02)',
          }}
        >
          <PixelCorner />

          <div className="p-6 md:p-7 flex flex-col items-center text-center gap-4 flex-1">
            {/* Org Logo */}
            <motion.div
              animate={isHovered ? { rotate: [0, -10, 10, -5, 5, 0], scale: 1.15 } : {}}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div
                className="absolute inset-0 blur-xl opacity-40 transition-opacity duration-300"
                style={{ background: cert.logo === 'oracle' ? '#f80000' : cert.logo === 'ibm' ? '#0062ff' : '#a855f7', borderRadius: '50%' }}
              />
              {cert.logo === 'oracle' ? (
                <SiOracle className="text-5xl relative" style={{ color: '#f80000', filter: 'drop-shadow(0 0 8px rgba(248,0,0,0.5))' }} />
              ) : cert.logo === 'ibm' ? (
                <SiIbm className="text-5xl relative" style={{ color: '#0062ff', filter: 'drop-shadow(0 0 8px rgba(0,98,255,0.5))' }} />
              ) : (
                <img
                  src="/nptellogo-Photoroom.png"
                  alt="NPTEL"
                  className="relative w-14 h-14 object-contain"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(168,85,247,0.5))' }}
                />
              )}
            </motion.div>

            {/* Certificate name */}
            <h3
              className="text-lg md:text-xl font-display font-bold tracking-wide leading-snug"
              style={{
                background: 'linear-gradient(135deg, #c084fc, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {cert.name}
            </h3>

            {/* Issuing organization */}
            <p className="text-gray-400 font-body text-sm">
              {cert.org}
            </p>

            {/* Completion date */}
            <div className="flex items-center gap-2 text-xs font-body text-gray-500">
              <FaCalendarAlt className="text-purple-400/70" />
              <span>{cert.date}</span>
            </div>

            {/* View Credential button */}
            <motion.a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-display font-bold tracking-wider text-white transition-all duration-300 mt-auto"
              style={{
                background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(124,58,237,0.1))',
                border: '1px solid rgba(168,85,247,0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #7e22ce, #9333ea)'
                e.currentTarget.style.boxShadow = '0 0 20px rgba(168,85,247,0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(124,58,237,0.1))'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <FaExternalLinkAlt className="text-xs" />
              <span>View Credential</span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-20 md:py-32 overflow-hidden">
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">CERTIFICATIONS</h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 font-body text-sm md:text-base mt-4 max-w-2xl mx-auto"
          >
            Professional certifications that validate my expertise
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 items-stretch"
        >
          {certifications.map((cert, index) => (
            <CertificationCard key={cert.name} cert={cert} index={index} />
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <a
            href="https://www.linkedin.com/in/mohith-seelam/details/certifications/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-display font-bold tracking-wider transition-all duration-300"
            style={{
              color: '#c084fc',
              border: '1px solid rgba(168,85,247,0.4)',
              background: 'rgba(168,85,247,0.08)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(168,85,247,0.2)'
              e.currentTarget.style.boxShadow = '0 0 30px rgba(168,85,247,0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(168,85,247,0.08)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <FaExternalLinkAlt className="text-xs" />
            <span>For more Certifications</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
