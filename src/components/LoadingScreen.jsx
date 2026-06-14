import { motion, AnimatePresence } from 'framer-motion'

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 6 + 3,
  delay: Math.random() * 2,
  duration: Math.random() * 3 + 2,
}))

const PixelCube = () => (
  <motion.div
    className="relative"
    animate={{ rotate: 360 }}
    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
  >
    <div className="relative w-16 h-16">
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <motion.div
            key={`${row}-${col}`}
            className="absolute"
            style={{
              left: col * 24,
              top: row * 24,
              width: 16,
              height: 16,
            }}
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: (row * 3 + col) * 0.15,
              ease: 'easeInOut',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: 'linear-gradient(135deg, #c084fc, #ff2d9e)',
                boxShadow: '0 0 12px rgba(192, 132, 252, 0.6), 0 0 24px rgba(255, 45, 158, 0.3)',
                clipPath: 'polygon(2px 0, 100% 0, 100% calc(100% - 2px), calc(100% - 2px) 100%, 0 100%, 0 2px)',
              }}
            />
          </motion.div>
        ))
      )}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle, rgba(192,132,252,0.15) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  </motion.div>
)

const LoadingBar = () => (
  <div className="relative w-64 h-3 bg-dark-200/50 rounded-sm overflow-hidden pixel-corners"
    style={{ clipPath: 'polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)' }}
  >
    <motion.div
      className="absolute inset-y-0 left-0"
      style={{
        background: 'linear-gradient(90deg, #7e22ce, #c084fc, #ff2d9e, #c084fc, #7e22ce)',
        backgroundSize: '200% 100%',
        boxShadow: '0 0 12px rgba(192, 132, 252, 0.4)',
      }}
      initial={{ width: '0%' }}
      animate={{ width: '100%' }}
      transition={{ duration: 2.5, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute inset-y-0 w-8"
      style={{
        background: 'rgba(255,255,255,0.3)',
        filter: 'blur(4px)',
      }}
      animate={{ left: ['-10%', '110%'] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
)

const LoadingScreen = () => (
  <motion.div
    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-400"
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6, ease: 'easeInOut' }}
  >
    <div className="absolute inset-0 pixel-grid" />

    {particles.map((p) => (
      <motion.div
        key={p.id}
        className="absolute"
        style={{
          left: `${p.x}%`,
          top: `${p.y}%`,
          width: p.size,
          height: p.size,
          background: p.id % 3 === 0
            ? 'linear-gradient(135deg, #c084fc, #a855f7)'
            : p.id % 3 === 1
            ? 'linear-gradient(135deg, #ff2d9e, #c084fc)'
            : 'linear-gradient(135deg, #4a9eff, #b44aff)',
          clipPath: 'polygon(1px 0, 100% 0, 100% calc(100% - 1px), calc(100% - 1px) 100%, 0 100%, 0 1px)',
          opacity: 0.6,
        }}
        animate={{
          y: [0, -30, 0, 15, 0],
          x: [0, 10, -10, 5, 0],
          opacity: [0.3, 0.8, 0.4, 0.7, 0.3],
          scale: [1, 1.2, 0.9, 1.1, 1],
        }}
        transition={{
          duration: p.duration,
          repeat: Infinity,
          delay: p.delay,
          ease: 'easeInOut',
        }}
      />
    ))}

    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative mb-12"
    >
      <h1 className="text-2xl md:text-3xl font-display font-bold tracking-[0.3em]">
        <span className="text-gradient">MOHITH SEELAM</span>
      </h1>
      <motion.div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-px"
        style={{
          width: '60%',
          background: 'linear-gradient(90deg, transparent, #c084fc, #ff2d9e, #c084fc, transparent)',
        }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4, type: 'spring', stiffness: 100 }}
      className="mb-10"
    >
      <PixelCube />
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="flex flex-col items-center gap-6"
    >
      <motion.p
        className="text-sm md:text-base font-game tracking-[0.2em]"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-transparent bg-clip-text" style={{
          backgroundImage: 'linear-gradient(135deg, #c084fc, #ff2d9e)',
        }}>
          LOADING
        </span>
      </motion.p>
      <LoadingBar />
      <motion.p
        className="text-xs font-body text-primary-400/60 tracking-widest"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        INITIALIZING SYSTEMS...
      </motion.p>
    </motion.div>

    <motion.div
      className="absolute bottom-8 flex gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.6 }}
    >
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2"
          style={{
            background: i % 2 === 0 ? '#c084fc' : '#ff2d9e',
            clipPath: 'polygon(1px 0, 100% 0, 100% calc(100% - 1px), calc(100% - 1px) 100%, 0 100%, 0 1px)',
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.3, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
        />
      ))}
    </motion.div>
  </motion.div>
)

export default LoadingScreen
