import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const linkVariants = {
  hover: { scale: 1.1, color: '#a855f7' },
  tap: { scale: 0.95 },
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
  exit: { opacity: 0, x: 40, transition: { duration: 0.15 } },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#hero');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.slice(1));
    let currentId = '';
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = `#${entry.target.id}`;
            if (id !== currentId) {
              currentId = id;
              setActiveLink(id);
            }
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActiveLink(href);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 transition-all duration-300 ${
          scrolled
            ? 'bg-dark-50/90 backdrop-blur-md shadow-lg shadow-purple-900/10'
            : 'bg-dark-50/60 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="relative font-display text-2xl tracking-widest text-purple-400"
          >
            <span className="relative z-10">M.</span>
            <span className="absolute inset-0 z-0 animate-pulse opacity-50" aria-hidden>
              M.
            </span>
          </a>

          {/* Desktop Links */}
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <motion.li key={link.href}>
                <motion.a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  variants={linkVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className={`relative text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                    activeLink === link.href
                      ? 'text-purple-300'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                  style={activeLink === link.href ? { textShadow: '0 0 20px rgba(168,85,247,0.8), 0 0 40px rgba(168,85,247,0.4), 0 0 80px rgba(168,85,247,0.2)' } : {}}
                >
                  {link.label}
                  {activeLink === link.href && (
                    <span className="absolute -left-7 top-1/2 -translate-y-1/2 text-purple-300" style={{ filter: 'drop-shadow(0 0 8px rgba(168,85,247,0.8))' }} aria-hidden="true">
                      <svg viewBox="0 50 130 95" className="w-5 h-5 fill-current" aria-hidden="true">
                        <path d="M0,142L8,142L8,144L0,144L0,142ZM28,142L32,142L32,144L28,144L28,142ZM96,142L104,142L104,144L96,144L96,142ZM80,100L76,100L76,114L72,114L72,120L68,120L68,124L64,124L64,140L68,140L68,144L60,144L60,132L56,132L56,128L52,128L52,132L48,132L48,136L44,136L44,140L48,140L48,144L40,144L40,128L36,128L36,124L32,124L32,120L28,120L28,116L24,116L24,112L20,112L20,88L24,88L24,96L28,96L28,100L32,100L32,104L40,104L40,100L44,100L44,96L50,96L50,92L56,92L56,88L60,88L60,62L64,62L64,58L96,58L96,62L100,62L100,80L80,80L80,84L92,84L92,88L76,88L76,96L84,96L84,104L80,104L80,100ZM82,140L84,140L84,142L82,142L82,140ZM12,136L20,136L20,138L12,138L12,136ZM110,134L116,134L116,136L110,136L110,134ZM0,128L32,128L32,130L0,130L0,128ZM72,128L128,128L128,130L72,130L72,128ZM68,64L68,68L72,68L72,64L68,64Z" />
                      </svg>
                    </span>
                  )}
                </motion.a>
              </motion.li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-6 rounded bg-purple-400"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="h-0.5 w-6 rounded bg-purple-400"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-6 rounded bg-purple-400"
            />
          </button>
        </div>

        {/* Pixel corner decorations */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-1 w-8 bg-purple-500/50" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-1 w-8 bg-purple-500/50" />
        <div className="pointer-events-none absolute left-4 top-0 h-1 w-1 bg-purple-500/40 shadow-[2px_2px_0_0_rgba(168,85,247,0.3)]" />
        <div className="pointer-events-none absolute right-4 top-0 h-1 w-1 bg-purple-500/40 shadow-[-2px_2px_0_0_rgba(168,85,247,0.3)]" />
      </motion.nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-dark-50/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  custom={i}
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    whileHover={{ scale: 1.1, color: '#a855f7' }}
                    whileTap={{ scale: 0.95 }}
                     className={`text-2xl font-bold uppercase tracking-widest transition-colors ${
                      activeLink === link.href
                        ? 'text-purple-400'
                        : 'text-gray-400'
                    }`}
                  >
                    {link.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>

            {/* Pixel decoration */}
            <div className="absolute bottom-8 left-1/2 h-2 w-2 -translate-x-1/2 bg-purple-500/40 shadow-[4px_0_0_0_rgba(168,85,247,0.3),-4px_0_0_0_rgba(168,85,247,0.3)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
