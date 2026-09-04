import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Hackathons from './components/Hackathons'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import ParticleBackground from './components/ParticleBackground'
import LoadingScreen from './components/LoadingScreen'
import BackToTop from './components/BackToTop'
import EasterEgg from './components/EasterEgg'
import MusicToggle from './components/MusicToggle'
import RocketCursor from './components/RocketCursor'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <div className="relative min-h-screen bg-dark-400 overflow-hidden">
      <ParticleBackground />
      <RocketCursor />
      <Navbar />
      <main>
        <section id="hero"><Hero /></section>
        <section id="about"><About /></section>
        <section id="skills"><Skills /></section>
        <section id="projects"><Projects /></section>
        <section id="experience"><Experience /></section>
        <section id="hackathons"><Hackathons /></section>
        <section id="certifications"><Certifications /></section>
        <section id="contact"><Contact /></section>
      </main>
      <BackToTop />
      <MusicToggle />
      <EasterEgg />
    </div>
  )
}

export default App
