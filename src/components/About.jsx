import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaHeart, FaRocket, FaGamepad, FaCheck, FaStar, FaCode, FaMedal, FaFire, FaTrophy, FaPercentage } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import { personalData, education, interests, careerGoals, funFacts } from '../data/portfolioData'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 14 },
  },
}

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 80, damping: 12 },
  },
}

const PixelCorners = () => (
  <>
    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-500/60" />
    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-500/60" />
    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-500/60" />
    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-500/60" />
    <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-purple-400/40" />
    <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-purple-400/40" />
    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-purple-400/40" />
    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-purple-400/40" />
  </>
)

const IconBox = ({ icon: Icon }) => (
  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-2xl text-purple-400 group-hover:shadow-lg group-hover:shadow-purple-500/30 group-hover:text-purple-300 transition-all duration-300">
    <Icon />
  </div>
)

function LeetCodeStats() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetch('https://leetcode-stats-api.vercel.app/MohithSeelam')
      .then(res => res.json())
      .then(setStats)
      .catch(() => {})
  }, [])

  const accuracy = useMemo(() => {
    if (!stats?.matchedUserStats) return '—'
    const accepted = stats.matchedUserStats.acSubmissionNum?.[0]?.submissions || 0
    const total = stats.matchedUserStats.totalSubmissionNum?.[0]?.submissions || 1
    return ((accepted / total) * 100).toFixed(1)
  }, [stats])

  const streak = useMemo(() => {
    if (!stats?.submissionCalendar) return '—'
    const cal = stats.submissionCalendar
    const DAY = 86400
    const today = Math.floor(Date.now() / 1000 / DAY) * DAY
    let count = 0
    let current = today
    if (!cal[current]) {
      current -= DAY
    }
    while (cal[current]) {
      count++
      current -= DAY
    }
    return count || '—'
  }, [stats])

  const monthBlocks = useMemo(() => {
    if (!stats?.submissionCalendar) return []
    const cal = stats.submissionCalendar
    const DAY = 86400
    const today = Math.floor(Date.now() / 1000 / DAY) * DAY

    const blocks = []
    for (let m = 7; m >= 0; m--) {
      const ref = new Date()
      ref.setMonth(ref.getMonth() - m, 1)
      const year = ref.getFullYear()
      const month = ref.getMonth()
      const name = ref.toLocaleString('default', { month: 'short' })

      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      const startTs = Math.floor(firstDay.getTime() / 1000 / DAY) * DAY
      const endTs = Math.floor(lastDay.getTime() / 1000 / DAY) * DAY

      const startDow = firstDay.getDay()
      const daysInMonth = lastDay.getDate()

      const cells = []
      for (let i = 0; i < startDow; i++) cells.push(null)
      for (let d = 1; d <= daysInMonth; d++) {
        const ts = startTs + (d - 1) * DAY
        cells.push({ day: d, count: cal[ts] || 0 })
      }

      const weeks = []
      for (let i = 0; i < cells.length; i += 7) {
        weeks.push(cells.slice(i, i + 7))
      }

      blocks.push({ name, year, weeks })
    }
    return blocks
  }, [stats])

  const maxCount = useMemo(() => {
    if (!stats?.submissionCalendar) return 1
    return Math.max(1, ...Object.values(stats.submissionCalendar).map(Number))
  }, [stats])

  const getHeatColor = (count) => {
    if (count === 0) return 'bg-purple-500/5 border border-purple-500/10'
    const ratio = count / maxCount
    if (ratio <= 0.25) return 'bg-purple-500/20'
    if (ratio <= 0.5) return 'bg-purple-500/40'
    if (ratio <= 0.75) return 'bg-purple-500/60'
    return 'bg-purple-500/90'
  }

  return (
    <motion.div
      variants={cardVariants}
      className="glass glass-hover neon-border neon-border-hover rounded-2xl p-6 relative overflow-hidden group md:col-span-2"
    >
      <PixelCorners />
      <div className="flex items-center gap-4 mb-5">
        <IconBox icon={SiLeetcode} />
        <h3 className="font-display text-lg text-white font-bold tracking-wide">LeetCode Stats</h3>
        <a
          href={personalData.social.leetcode}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-xs text-purple-400/80 bg-purple-500/10 px-3 py-1 rounded hover:bg-purple-500/20 transition-colors"
        >
          View Profile →
        </a>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Stats */}
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 rounded-xl bg-purple-500/5 border border-purple-500/10">
              <div className="flex items-center justify-center gap-2 mb-1">
                <FaCode className="text-purple-400 text-sm" />
                <span className="text-2xl font-bold text-white font-display">{stats?.totalSolved ?? '—'}</span>
              </div>
              <span className="text-xs text-gray-400 font-body">Solved</span>
            </div>
            <div className="text-center p-3 rounded-xl bg-green-500/5 border border-green-500/10">
              <div className="flex items-center justify-center gap-2 mb-1">
                <FaPercentage className="text-green-400 text-sm" />
                <span className="text-2xl font-bold text-green-400 font-display">{accuracy}%</span>
              </div>
              <span className="text-xs text-gray-400 font-body">Accuracy</span>
            </div>
            <div className="text-center p-3 rounded-xl bg-orange-500/5 border border-orange-500/10">
              <div className="flex items-center justify-center gap-2 mb-1">
                <FaFire className="text-orange-400 text-sm" />
                <span className="text-2xl font-bold text-orange-400 font-display">{streak}</span>
              </div>
              <span className="text-xs text-gray-400 font-body">Day Streak</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-300 font-body">
              <FaMedal className="text-yellow-400" />
              <span>Ranking: <span className="text-white font-semibold">{stats?.ranking?.toLocaleString() ?? '—'}</span></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300 font-body">
              <FaTrophy className="text-orange-400" />
              <span>Contributions: <span className="text-white font-semibold">{stats?.contributionPoint ?? '—'}</span></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300 font-body">
              <FaFire className="text-red-400" />
              <span>Languages: <span className="text-white font-semibold">Python, MySQL</span></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300 font-body">
              <FaStar className="text-purple-400" />
              <span>Badges: <span className="text-white font-semibold">4</span></span>
            </div>
          </div>
        </div>

        {/* Right: Heatmap */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-gray-400 font-body">Submission Activity</span>
            <div className="flex items-center gap-1 ml-auto">
              <span className="text-[10px] text-gray-500">Less</span>
              <div className="w-2.5 h-2.5 rounded-sm bg-purple-500/5 border border-purple-500/10" />
              <div className="w-2.5 h-2.5 rounded-sm bg-purple-500/20" />
              <div className="w-2.5 h-2.5 rounded-sm bg-purple-500/40" />
              <div className="w-2.5 h-2.5 rounded-sm bg-purple-500/60" />
              <div className="w-2.5 h-2.5 rounded-sm bg-purple-500/90" />
              <span className="text-[10px] text-gray-500">More</span>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide -mx-1 px-1 pb-1">
              <div className="flex items-end gap-1 min-w-max">
                {monthBlocks.map((block, bi) => (
                  <div key={bi} className={`flex flex-col ${bi > 0 ? 'border-l border-purple-500/15 pl-1' : ''}`}>
                    <div className="text-[10px] text-gray-500 font-body mb-1 text-center">{block.name}</div>
                    <div className="flex gap-[3px]">
                      {block.weeks.map((week, wi) => (
                        <div key={wi} className="flex flex-col gap-[3px]">
                          {week.map((cell, di) => (
                            <div
                              key={di}
                              className={`w-2.5 h-2.5 rounded-[2px] ${cell ? getHeatColor(cell.count) : 'bg-transparent'} transition-colors`}
                              title={cell ? `${cell.day} — ${cell.count} submissions` : ''}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(255,45,158,0.06) 0%, transparent 70%)' }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
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
          <h2 className="section-heading">ABOUT ME</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass neon-border rounded-2xl p-6 md:p-8 mb-12 max-w-4xl mx-auto relative"
        >
          <PixelCorners />
          <p className="text-gray-300 font-accent text-sm md:text-base leading-relaxed">
            {personalData.about}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* EDUCATION */}
          <motion.div
            variants={cardVariants}
            className="glass glass-hover neon-border neon-border-hover rounded-2xl p-6 relative overflow-hidden group"
          >
            <PixelCorners />
            <div className="flex items-center gap-4 mb-5">
              <IconBox icon={FaGraduationCap} />
              <h3 className="font-display text-lg text-white font-bold tracking-wide">Education</h3>
            </div>
            <div className="space-y-2 text-gray-300 font-body">
              <p className="text-purple-200 font-semibold text-base">{education.degree}</p>
              <p className="text-xs text-purple-300/70">Specialization in {education.specialization}</p>
              <p className="text-sm">{education.university}</p>
              <div className="flex items-center gap-4 pt-1">
                <span className="text-xs text-purple-400/80 bg-purple-500/10 px-3 py-1 rounded">{education.year}</span>
                <span className="text-xs text-purple-400/80 bg-purple-500/10 px-3 py-1 rounded">CGPA: {education.cgpa}</span>
              </div>
            </div>
          </motion.div>

          {/* INTERESTS */}
          <motion.div
            variants={cardVariants}
            className="glass glass-hover neon-border neon-border-hover rounded-2xl p-6 relative overflow-hidden group"
          >
            <PixelCorners />
            <div className="flex items-center gap-4 mb-5">
              <IconBox icon={FaHeart} />
              <h3 className="font-display text-lg text-white font-bold tracking-wide">Interests</h3>
            </div>
            <motion.ul
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3"
            >
              {interests.map((interest, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  className="flex items-center gap-3 text-gray-300 font-body text-sm"
                >
                  <span
                    className="w-2.5 h-2.5 flex-shrink-0"
                    style={{
                      background: '#a855f7',
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                      boxShadow: '0 0 6px rgba(168,85,247,0.6)',
                    }}
                  />
                  <span>{interest}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* CAREER GOALS */}
          <motion.div
            variants={cardVariants}
            className="glass glass-hover neon-border neon-border-hover rounded-2xl p-6 relative overflow-hidden group"
          >
            <PixelCorners />
            <div className="flex items-center gap-4 mb-5">
              <IconBox icon={FaRocket} />
              <h3 className="font-display text-lg text-white font-bold tracking-wide">Career Goals</h3>
            </div>
            <motion.ul
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3"
            >
              {careerGoals.map((goal, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  className="flex items-center gap-3 text-gray-300 font-body text-sm"
                >
                  <span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <FaCheck className="text-green-400 text-[10px]" />
                  </span>
                  <span>{goal}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* FUN FACTS */}
          <motion.div
            variants={cardVariants}
            className="glass glass-hover neon-border neon-border-hover rounded-2xl p-6 relative overflow-hidden group"
          >
            <PixelCorners />
            <div className="flex items-center gap-4 mb-5">
              <IconBox icon={FaGamepad} />
              <h3 className="font-display text-lg text-white font-bold tracking-wide">Fun Facts</h3>
            </div>
            <motion.ul
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3"
            >
              {funFacts.map((fact, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  className="flex items-center gap-3 text-gray-300 font-body text-sm"
                >
                  <FaStar
                    className="text-yellow-400 text-sm flex-shrink-0"
                    style={{
                      filter: 'drop-shadow(0 0 4px rgba(250,204,21,0.5))',
                      animation: `twinkle 2s ease-in-out infinite`,
                      animationDelay: `${i * 0.4}s`,
                    }}
                  />
                  <span>{fact}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* LEETCODE STATS */}
          <LeetCodeStats />
        </motion.div>
      </div>
    </section>
  )
}
