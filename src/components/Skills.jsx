import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaPython, FaJava, FaJs, FaHtml5, FaCss3, FaBootstrap, FaReact,
  FaNodeJs, FaGitAlt, FaGithub,
} from 'react-icons/fa'
import {
  SiExpress, SiFlask, SiMongodb, SiMysql, SiNumpy, SiPandas, SiPlotly,
  SiScikitlearn, SiSpacy, SiVisualstudiocode, SiVercel,
  SiFirebase, SiVite, SiLinux, SiFigma,
} from 'react-icons/si'
import { skills } from '../data/portfolioData'

const iconMap = {
  FaPython, FaJava, FaJs, FaHtml5, FaCss3, FaBootstrap, FaReact,
  FaNodeJs, FaGitAlt, FaGithub,
  SiExpress, SiFlask, SiMongodb, SiMysql, SiNumpy, SiPandas, SiPlotly,
  SiScikitlearn, SiSpacy, SiVisualstudiocode, SiVercel,
  SiFirebase, SiVite, SiLinux, SiFigma,
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

const ProgressBar = ({ color, proficiency }) => (
  <div className="w-full h-1 bg-dark-300 rounded-full overflow-hidden mt-3">
    <div
      className="h-full rounded-full"
      style={{
        width: `${proficiency}%`,
        background: `linear-gradient(90deg, ${color}, ${color}88)`,
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {filteredSkills.map((skill, i) => {
            const IconComponent = iconMap[skill.icon]
            const accent = skill.color
            return (
              <div
                key={skill.name}
                className="group relative rounded-2xl p-5 flex flex-col items-center justify-center gap-3 cursor-default"
                style={{
                  background: `rgba(26, 26, 46, 0.55)`,
                  border: `1px solid ${accent}33`,
                  boxShadow: `0 0 15px ${accent}08, inset 0 0 15px ${accent}04`,
                }}
              >
                <PixelCorner />

                {/* Icon */}
                {IconComponent && (
                  <div className="relative">
                    <IconComponent
                      className="relative text-3xl md:text-4xl"
                      style={{ color: accent }}
                    />
                  </div>
                )}

                {/* Name */}
                <span className="text-xs md:text-sm font-body text-gray-300 text-center font-medium">
                  {skill.name}
                </span>

                {/* Proficiency bar */}
                <ProgressBar color={accent} proficiency={skill.proficiency} />
              </div>
            )
          })}
        </div>

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
