import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaEnvelope, FaGithub, FaLinkedin, FaPaperPlane, FaCheckCircle } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import { sendEmail } from '../lib/emailjs'
import { personalData } from '../data/portfolioData'

const socialLinks = [
  { icon: FaEnvelope, label: 'Email', value: personalData.email, href: `mailto:${personalData.email}`, color: '#c084fc' },
  { icon: FaGithub, label: 'GitHub', value: 'github.com/Seelam-Mohith', href: personalData.social.github, color: '#a855f7' },
  { icon: FaLinkedin, label: 'LinkedIn', value: 'linkedin.com/mohith-seelam', href: personalData.social.linkedin, color: '#4a9eff' },
  { icon: SiLeetcode, label: 'LeetCode', value: 'leetcode.com/MohithSeelam', href: personalData.social.leetcode, color: '#ff2d9e' },
]

const confettiPieces = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100 - 50,
  y: Math.random() * -60 - 20,
  rotation: Math.random() * 720,
  color: ['#c084fc', '#a855f7', '#ff2d9e', '#4a9eff', '#f5d5c6', '#7e22ce'][Math.floor(Math.random() * 6)],
  size: Math.random() * 8 + 4,
  delay: Math.random() * 0.3,
}))

const PixelCorner = () => (
  <>
    <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-purple-500/40" />
    <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-purple-500/40" />
    <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-purple-500/40" />
    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-purple-500/40" />
  </>
)

const formFields = [
  { id: 'name', label: 'Name', type: 'text', placeholder: 'Your Name' },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
  { id: 'subject', label: 'Subject', type: 'text', placeholder: 'What is this about?' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = useCallback((e) => {
    const { id, value } = e.target
    setForm((prev) => ({ ...prev, [id]: value }))
  }, [])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.subject || !form.message) return
    setSending(true)
    const result = await sendEmail(form)
    if (result.success) {
      setSubmitted(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    } else {
      alert('Failed to send message. Please try again later.')
    }
    setSending(false)
    setTimeout(() => setSubmitted(false), 4000)
  }, [form])

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Pixel grid overlay */}
      <div className="absolute inset-0 pixel-grid opacity-20 pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">CONTACT</h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 font-body text-sm md:text-base mt-4"
          >
            Let's build something amazing together
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* LEFT COLUMN - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Profile image */}
            <motion.div
              className="relative w-40 h-40 mx-auto lg:mx-0 mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 100, damping: 14 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-blue-500/20 blur-[40px] rounded-full" />
              <div className="relative rounded-xl p-[3px] bg-gradient-to-br from-neon-purple via-neon-pink to-neon-blue shadow-lg shadow-purple-500/30">
                <div className="relative bg-dark-400/90 rounded-xl p-3 backdrop-blur-sm">
                  <motion.img
                    src="/mohith.png"
                    alt="Mohith"
                    className="relative w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </motion.div>

            {/* Social cards */}
            <div className="space-y-4">
              {socialLinks.map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.label === 'Email' ? undefined : '_blank'}
                  rel={item.label === 'Email' ? undefined : 'noopener noreferrer'}
                  className="group relative flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 hover:translate-x-1"
                  style={{
                    background: 'rgba(26, 26, 46, 0.5)',
                    border: '1px solid rgba(168, 85, 247, 0.2)',
                    boxShadow: '0 0 15px rgba(168, 85, 247, 0.08)',
                  }}
                >
                  <PixelCorner />
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-lg text-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                    style={{
                      background: `${item.color}15`,
                      color: item.color,
                      boxShadow: `0 0 10px ${item.color}10`,
                    }}
                  >
                    <item.icon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-display text-gray-500 tracking-wider">{item.label}</p>
                    <p className="text-sm font-body text-gray-300 truncate">{item.value}</p>
                  </div>
                  <div className="text-purple-400/50 group-hover:text-purple-300 transition-colors group-hover:translate-x-0.5">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div
              className="relative p-4 md:p-5 rounded-2xl"
              style={{
                background: 'rgba(26, 26, 46, 0.4)',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                boxShadow: '0 0 30px rgba(168, 85, 247, 0.08)',
              }}
            >
              <PixelCorner />
              <div className="absolute inset-0 pixel-grid opacity-10 rounded-2xl pointer-events-none" />

              <form onSubmit={handleSubmit} className="relative space-y-5">
                {formFields.map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block text-xs font-display text-gray-400 tracking-wider mb-2"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      value={form[field.id]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-xl text-sm font-body text-gray-200 placeholder-gray-500 outline-none transition-all duration-300"
                      style={{
                        background: 'rgba(7, 7, 15, 0.8)',
                        border: '1px solid rgba(168, 85, 247, 0.15)',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(168, 85, 247, 0.6)'
                        e.target.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.15)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(168, 85, 247, 0.15)'
                        e.target.style.boxShadow = 'none'
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-display text-gray-400 tracking-wider mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    className="w-full px-4 py-3 rounded-xl text-sm font-body text-gray-200 placeholder-gray-500 outline-none transition-all duration-300 resize-none"
                    style={{
                      background: 'rgba(7, 7, 15, 0.8)',
                      border: '1px solid rgba(168, 85, 247, 0.15)',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(168, 85, 247, 0.6)'
                      e.target.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.15)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(168, 85, 247, 0.15)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  className="game-button w-full justify-center text-white disabled:opacity-60 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  animate={sending ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {sending ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <FaPaperPlane className="w-4 h-4" />
                        </motion.div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <motion.span
                          animate={submitted ? { x: 200, opacity: 0 } : {}}
                          transition={{ duration: 0.5 }}
                          className="flex items-center gap-2"
                        >
                          <FaPaperPlane className="w-4 h-4" />
                          Send Message
                        </motion.span>
                      </>
                    )}
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success overlay */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="relative bg-dark-400/90 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30 shadow-2xl shadow-purple-500/20 pointer-events-auto"
              style={{
                background: 'rgba(7, 7, 15, 0.95)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
              }}
            >
              <PixelCorner />
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 10 }}
                >
                  <FaCheckCircle className="w-16 h-16 text-green-400" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl font-display font-bold text-gradient"
                >
                  Message Sent!
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm font-body text-gray-400"
                >
                  Thanks for reaching out. I'll get back to you soon!
                </motion.p>
              </div>

              {/* Confetti */}
              {confettiPieces.map((c) => (
                <motion.div
                  key={c.id}
                  className="absolute"
                  style={{
                    width: c.size,
                    height: c.size,
                    backgroundColor: c.color,
                    borderRadius: Math.random() > 0.5 ? '50%' : '0',
                  }}
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    rotate: 0,
                  }}
                  animate={{
                    x: c.x,
                    y: c.y,
                    opacity: [1, 1, 0],
                    rotate: c.rotation,
                  }}
                  transition={{
                    duration: 1.5,
                    delay: c.delay,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
