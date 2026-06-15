import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaPython, FaJava, FaJs, FaHtml5, FaCss3, FaBootstrap, FaReact,
  FaNodeJs, FaGitAlt, FaGithub,
} from 'react-icons/fa'
import {
  SiExpress, SiFlask, SiMongodb, SiMysql, SiNumpy, SiPandas, SiPlotly,
  SiScikitlearn, SiSpacy, SiMicrosoftazure, SiPostman, SiVisualstudiocode, SiVercel,
} from 'react-icons/si'
import { skills } from '../data/portfolioData'

const iconMap = {
  FaPython, FaJava, FaJs, FaHtml5, FaCss3, FaBootstrap, FaReact,
  FaNodeJs, FaGitAlt, FaGithub,
  SiExpress, SiFlask, SiMongodb, SiMysql, SiNumpy, SiPandas, SiPlotly,
  SiScikitlearn, SiSpacy, SiMicrosoftazure, SiPostman, SiVisualstudiocode, SiVercel,
}

const categories = ['All', 'Languages', 'Frontend', 'Backend', 'Databases', 'AI/ML', 'Tools & Platforms']

const categoryAccents = {
  Languages: '#a855f7',
  Frontend: '#4a9eff',
  Backend: '#22c55e',
  Databases: '#06b6d4',
  'AI/ML': '#f59e0b',
  'Tools & Platforms': '#ff2d9e',
}

const floatingIcons = [
  { icon: FaPython, x: '5%', y: '10%', delay: 0, size: 28, color: '#3776AB' },
  { icon: FaReact, x: '90%', y: '20%', delay: 1.2, size: 32, color: '#61DAFB' },
  { icon: FaNodeJs, x: '10%', y: '70%', delay: 0.6, size: 26, color: '#339933' },
  { icon: FaJava, x: '85%', y: '75%', delay: 1.8, size: 30, color: '#007396' },
  { icon: SiFlask, x: '50%', y: '8%', delay: 2.4, size: 24, color: '#C0C0C0' },
  { icon: SiMongodb, x: '7%', y: '50%', delay: 0.3, size: 22, color: '#47A248' },
  { icon: FaGitAlt, x: '93%', y: '55%', delay: 1.5, size: 24, color: '#F05032' },
  { icon: SiScikitlearn, x: '45%', y: '85%', delay: 2.1, size: 22, color: '#F7931E' },
  { icon: SiNumpy, x: '30%', y: '20%', delay: 0.5, size: 22, color: '#4DABCF' },
  { icon: SiPandas, x: '70%', y: '40%', delay: 1.0, size: 22, color: '#E70488' },
  { icon: SiPlotly, x: '25%', y: '60%', delay: 1.6, size: 22, color: '#3F8FBF' },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 14 },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.8,
    transition: { duration: 0.25 },
  },
}

const TabButton = ({ label, active, onClick, accent }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`relative px-4 py-2 rounded-xl text-xs md:text-sm font-display tracking-wider transition-all duration-300 ${
      active
        ? 'text-white font-bold'
        : 'text-gray-400 hover:text-gray-200'
    }`}
  >
    {active && (
      <motion.div
        layoutId="activeTab"
        className="absolute inset-0 rounded-xl"
        style={{
          background: `linear-gradient(135deg, ${accent || '#a855f7'}, ${accent ? accent + 'cc' : '#ff2d9e'})`,
          boxShadow: `0 0 20px ${accent || '#a855f7'}40`,
        }}
      />
    )}
    {!active && (
      <div className="absolute inset-0 rounded-xl glass border border-purple-500/20 group-hover:border-purple-500/40" />
    )}
    <span className="relative z-10">{label}</span>
  </motion.button>
)

const PixelCorner = () => (
  <>
    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-purple-500/40" />
    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-purple-500/40" />
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-purple-500/40" />
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-purple-500/40" />
  </>
)

const ProgressBar = ({ color, index }) => (
  <div className="w-full h-1 bg-dark-300 rounded-full overflow-hidden mt-3">
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: `${60 + Math.sin(index * 1.5) * 30 + 10}%` }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.3 + index * 0.05, ease: 'easeOut' }}
      className="h-full rounded-full"
      style={{
        background: `linear-gradient(90deg, ${color}, ${color}88)`,
        boxShadow: `0 0 8px ${color}`,
      }}
    />
  </div>
)

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All')

  const allSkills = Object.entries(skills).flatMap(([category, items]) =>
    items.map((s) => ({ ...s, category }))
  )

  const filteredSkills =
    activeCategory === 'All'
      ? allSkills
      : allSkills.filter((s) => s.category === activeCategory)

  return (
    <section id="skills" className="relative py-20 md:py-32 overflow-hidden">
      {/* Floating background icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingIcons.map((item, i) => (
          <motion.div
            key={i}
            className="absolute opacity-[0.15]"
            style={{ left: item.x, top: item.y }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: item.delay,
            }}
          >
            <item.icon size={item.size} color={item.color} />
          </motion.div>
        ))}
      </div>

      {/* Glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-[120px]"
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
          className="text-center mb-12"
        >
          <h2 className="section-heading">SKILLS & TECH STACK</h2>
        </motion.div>

        {/* Tab filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <TabButton
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              accent={categoryAccents[cat]}
            />
          ))}
        </motion.div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
          >
            {filteredSkills.map((skill, i) => {
              const IconComponent = iconMap[skill.icon]
              const accent = skill.color
              return (
                <motion.div
                  key={skill.name}
                  variants={cardVariants}
                  layout
                  className="group relative rounded-2xl p-5 flex flex-col items-center justify-center gap-3 cursor-default"
                  style={{
                    background: `rgba(26, 26, 46, 0.5)`,
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${accent}33`,
                    boxShadow: `0 0 15px ${accent}08, inset 0 0 15px ${accent}04`,
                  }}
                  whileHover={{
                    y: -8,
                    borderColor: `${accent}aa`,
                    boxShadow: `0 0 35px ${accent}30, inset 0 0 30px ${accent}10`,
                    transition: { type: 'spring', stiffness: 200, damping: 15 },
                  }}
                >
                  <PixelCorner />

                  {/* Icon */}
                  {IconComponent && (
                    <motion.div
                      whileHover={{ rotate: [0, -15, 15, 0], scale: 1.15 }}
                      transition={{ duration: 0.5 }}
                      className="relative"
                    >
                      <div
                        className="absolute inset-0 blur-xl opacity-30 transition-opacity duration-300 group-hover:opacity-60"
                        style={{ background: accent, borderRadius: '50%' }}
                      />
                      <IconComponent
                        className="relative text-3xl md:text-4xl transition-transform duration-300"
                        style={{ color: accent, filter: `drop-shadow(0 0 6px ${accent}60)` }}
                      />
                    </motion.div>
                  )}

                  {/* Name */}
                  <span className="text-xs md:text-sm font-body text-gray-300 text-center font-medium">
                    {skill.name}
                  </span>

                  {/* Decorative progress bar */}
                  <ProgressBar color={accent} index={i} />
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredSkills.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-500 font-body text-sm">No skills found for this category.</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
