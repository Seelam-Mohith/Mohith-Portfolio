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
    transition: { delay: i * 0.08, type: 'spring', stiffness: 120 },
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(`#${entry.target.id}`);
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
    document.body.style.overflow = menuOpen ? 'hidden' : '';
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
            <span className="absolute inset-0 z-0 animate-pulse blur-sm" aria-hidden>
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
                  className={`relative text-sm font-bold uppercase tracking-widest transition-colors ${
                    activeLink === link.href
                      ? 'text-purple-400'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {link.label}
                  {activeLink === link.href && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-400"
                    />
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
