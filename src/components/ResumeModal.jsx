import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaDownload, FaFilePdf } from 'react-icons/fa'
import { personalData } from '../data/portfolioData'

export default function ResumeModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
          style={{ backdropFilter: 'blur(8px)', background: 'rgba(5,0,15,0.75)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            className="relative w-full max-w-4xl h-[85vh] flex flex-col rounded-2xl border overflow-hidden"
            style={{
              background: 'rgba(15,5,30,0.95)',
              borderColor: 'rgba(168,85,247,0.5)',
              boxShadow: '0 0 50px rgba(168,85,247,0.35)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between gap-4 px-5 py-3 border-b"
              style={{ borderColor: 'rgba(168,85,247,0.3)' }}
            >
              <div className="flex items-center gap-2 text-purple-300 font-display text-sm uppercase tracking-wider">
                <FaFilePdf className="text-pink-400" />
                <span>Resume — {personalData.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={personalData.resumeUrl}
                  download="Mohith_Resume.pdf"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider border transition-colors"
                  style={{ color: '#a855f7', borderColor: 'rgba(168,85,247,0.5)', background: 'rgba(168,85,247,0.1)' }}
                >
                  <FaDownload className="text-[11px]" />
                  Download
                </a>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-purple-300 border transition-colors cursor-pointer"
                  style={{ borderColor: 'rgba(168,85,247,0.4)', background: 'rgba(168,85,247,0.1)' }}
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-dark-400/80">
              <iframe
                src={`${personalData.resumeUrl}#view=FitH`}
                title="Resume"
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
