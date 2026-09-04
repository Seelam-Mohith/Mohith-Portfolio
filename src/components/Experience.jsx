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
  { icon: FaLaptopCode, label: 'Intern' },
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
        <div
          key={i}
          className="w-[3px] h-[3px]"
          style={{ background: i < 4 ? 'rgba(168,85,247,0.5)' : 'rgba(168,85,247,0.2)' }}
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
      className="group h-full"
    >
      <div
        className="relative rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300"
        style={{
          background: 'rgba(26, 26, 46, 0.5)',
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

        <div className="p-5 md:p-6 flex flex-col flex-1 gap-4">
          {/* Role + Organization */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3
                className="text-lg md:text-xl font-display font-bold tracking-wide"
                style={{
                  background: 'linear-gradient(135deg, #c084fc, #a855f7, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {exp.role}
              </h3>
              <p className="text-gray-300 font-body text-sm font-medium mt-1">
                {exp.organization}
              </p>
            </div>
            <DecorationIcon className="text-purple-500/20 flex-shrink-0" size={28} />
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 text-gray-400 font-body text-xs">
            <FaCalendarAlt className="text-purple-400 flex-shrink-0" />
            <span>{exp.duration}</span>
          </div>

          {/* Responsibilities */}
          <div className="space-y-2 flex-1">
            <p className="text-purple-300 font-display text-xs tracking-wider uppercase">Responsibilities</p>
            <ul className="space-y-1.5">
              {exp.responsibilities.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-gray-400 font-body text-sm"
                >
                  <FaArrowRight className="text-purple-500/70 text-[10px] mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Achievements */}
          {exp.achievements && exp.achievements.length > 0 && (
            <div className="space-y-2">
              <p className="flex items-center gap-1.5 text-pink-300 font-display text-xs tracking-wider uppercase">
                <FaTrophy className="text-pink-400 text-[10px]" />
                Achievements
              </p>
              <ul className="space-y-1.5">
                {exp.achievements.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-gray-400 font-body text-sm"
                  >
                    <FaStar className="text-yellow-500/70 text-[10px] mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const TimelineDot = ({ index }) => (
  <div className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center"
      style={{
        background: 'rgba(26, 26, 46, 0.8)',
        border: '2px solid rgba(168, 85, 247, 0.6)',
        boxShadow: '0 0 16px rgba(168,85,247,0.5)',
      }}
    >
      <div
        className="w-3 h-3 rounded-full"
        style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}
      />
    </div>
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
            className="text-3xl md:text-5xl font-display font-bold tracking-[0.2em]"
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
