import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { projects } from '../data/portfolioData'

const gradientPairs = [
  ['#7e22ce', '#3b0764'],
  ['#ff2d9e', '#7e22ce'],
  ['#a855f7', '#4a1d96'],
  ['#c084fc', '#6b21a8'],
]

const floatingPixels = [
  { x: '5%', y: '8%', size: 14, delay: 0, color: '#a855f7' },
  { x: '88%', y: '15%', size: 10, delay: 1.2, color: '#ff2d9e' },
  { x: '12%', y: '75%', size: 16, delay: 0.6, color: '#c084fc' },
  { x: '92%', y: '80%', size: 12, delay: 2.0, color: '#7e22ce' },
  { x: '48%', y: '6%', size: 8, delay: 0.3, color: '#ff2d9e' },
  { x: '6%', y: '55%', size: 10, delay: 1.5, color: '#a855f7' },
  { x: '94%', y: '50%', size: 14, delay: 0.9, color: '#c084fc' },
  { x: '52%', y: '90%', size: 8, delay: 2.4, color: '#7e22ce' },
]

const scanlineStyle = {
  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(168,85,247,0.04) 2px, rgba(168,85,247,0.04) 4px)',
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
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

function ProjectCard({ project, index, colors, initial }) {
  const cardRef = useRef(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const rotY = ((e.clientX - centerX) / (rect.width / 2)) * 8
    const rotX = -((e.clientY - centerY) / (rect.height / 2)) * 8
    setRotateX(rotX)
    setRotateY(rotY)
  }, [])

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovered(false)
  }

  return (
    <motion.div variants={cardVariants} className="group">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
          y: isHovered ? -8 : 0,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
        className="relative rounded-2xl overflow-hidden cursor-default"
      >
        <div
          className="relative transition-all duration-500"
          style={{
            background: `rgba(26, 26, 46, ${isHovered ? 0.7 : 0.5})`,
            backdropFilter: 'blur(12px)',
            border: `1px solid ${isHovered ? 'rgba(168, 85, 247, 0.5)' : 'rgba(168, 85, 247, 0.15)'}`,
            boxShadow: isHovered
              ? '0 0 40px rgba(168, 85, 247, 0.2), inset 0 0 30px rgba(168, 85, 247, 0.08)'
              : '0 0 15px rgba(168, 85, 247, 0.05), inset 0 0 15px rgba(168, 85, 247, 0.02)',
          }}
        >
          <PixelCorner />

          <motion.div
            className="absolute inset-0 pointer-events-none z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={scanlineStyle}
          />

          <div
            className="relative h-44 md:h-52 flex items-center justify-center overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, ${colors[1]}22 25%, transparent 25%),
                  linear-gradient(-45deg, ${colors[1]}22 25%, transparent 25%),
                  linear-gradient(45deg, transparent 75%, ${colors[1]}22 75%),
                  linear-gradient(-45deg, transparent 75%, ${colors[1]}22 75%)
                `,
                backgroundSize: '16px 16px',
                backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
              }}
            />

            <div
              className="absolute inset-0"
              style={{ background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 0%, transparent 50%)' }}
            />

            <motion.span
              className="relative font-display font-bold text-white select-none"
              style={{
                fontSize: '5rem',
                textShadow: '0 0 30px rgba(255,255,255,0.3)',
              }}
              animate={isHovered ? { scale: 1.1, rotate: [0, -5, 5, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              {initial}
            </motion.span>

            <div className="absolute top-2 left-2 w-4 h-4 opacity-30 border-t-2 border-l-2 border-white/40" />
            <div className="absolute top-2 right-2 w-4 h-4 opacity-30 border-t-2 border-r-2 border-white/40" />
            <div className="absolute bottom-2 left-2 w-4 h-4 opacity-30 border-b-2 border-l-2 border-white/40" />
            <div className="absolute bottom-2 right-2 w-4 h-4 opacity-30 border-b-2 border-r-2 border-white/40" />

            {index === 0 && (
              <motion.div
                className="absolute top-3 right-3 z-20"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.5 }}
              >
                <div
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-display font-bold tracking-wider text-white"
                  style={{
                    background: 'linear-gradient(135deg, #ff2d9e, #ff6b3d)',
                    boxShadow: '0 0 12px rgba(255,45,158,0.5)',
                  }}
                >
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-white"
                  />
                  NEW
                </div>
              </motion.div>
            )}
          </div>

          <div className="p-5 md:p-6 space-y-4">
            <h3
              className="text-lg md:text-xl font-display font-bold tracking-wide"
              style={{
                background: 'linear-gradient(135deg, #c084fc, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {project.title}
            </h3>

            <p className="text-gray-400 font-body text-sm leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-[10px] md:text-xs font-body font-medium tracking-wide text-white"
                  style={{
                    background: 'linear-gradient(135deg, rgba(168,85,247,0.25), rgba(124,58,237,0.15))',
                    border: '1px solid rgba(168,85,247,0.3)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-display font-bold tracking-wider text-white transition-all duration-300"
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
                <FaGithub className="text-sm" />
                <span>GitHub</span>
              </motion.a>
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-display font-bold tracking-wider text-white transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #7e22ce, #9333ea)',
                  border: '1px solid rgba(168,85,247,0.5)',
                  boxShadow: '0 0 15px rgba(168,85,247,0.15)',
                }}
              >
                <FaExternalLinkAlt className="text-xs" />
                <span>Live Demo</span>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingPixels.map((pixel, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: pixel.x, top: pixel.y, width: pixel.size, height: pixel.size }}
            animate={{
              y: [0, -25, 0],
              x: [0, 10, 0],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: 6 + i * 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: pixel.delay,
            }}
          >
            <div
              className="w-full h-full"
              style={{
                backgroundColor: pixel.color,
                clipPath: 'polygon(0 0, calc(100% - 2px) 0, 100% 2px, 100% 100%, calc(100% - 2px) 100%, 0 100%)',
                opacity: 0.15,
              }}
            />
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full blur-[140px]"
          style={{ background: 'radial-gradient(circle, rgba(255,45,158,0.05) 0%, transparent 70%)' }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">PROJECTS</h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 font-body text-sm md:text-base mt-4 max-w-2xl mx-auto"
          >
            A collection of projects I've built — from AI tools to full-stack applications
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {projects.map((project, index) => {
            const colors = gradientPairs[index % gradientPairs.length]
            const initial = project.title.charAt(0)
            return (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                colors={colors}
                initial={initial}
              />
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
