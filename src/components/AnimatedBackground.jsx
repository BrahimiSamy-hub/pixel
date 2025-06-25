import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const AnimatedBackground = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create floating particles
    const particles = []
    const particleCount = 20

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.className = 'absolute w-2 h-2 bg-[#F17A28]/20 rounded-full'
      particle.style.left = Math.random() * 100 + '%'
      particle.style.top = Math.random() * 100 + '%'
      container.appendChild(particle)
      particles.push(particle)
    }

    // Animate particles
    particles.forEach((particle, index) => {
      gsap.to(particle, {
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        duration: 10 + Math.random() * 10,
        ease: 'none',
        repeat: -1,
        yoyo: true,
        delay: index * 0.5,
      })

      // Add opacity animation
      gsap.to(particle, {
        opacity: 0.1 + Math.random() * 0.3,
        duration: 3 + Math.random() * 2,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        delay: index * 0.3,
      })
    })

    // Create gradient orbs
    const orbs = []
    const orbCount = 3

    for (let i = 0; i < orbCount; i++) {
      const orb = document.createElement('div')
      orb.className = 'absolute w-64 h-64 rounded-full blur-3xl opacity-10'
      orb.style.background = `radial-gradient(circle, rgba(241, 122, 40, 0.3) 0%, rgba(241, 122, 40, 0.1) 50%, transparent 100%)`
      orb.style.left = Math.random() * 100 + '%'
      orb.style.top = Math.random() * 100 + '%'
      container.appendChild(orb)
      orbs.push(orb)
    }

    // Animate orbs
    orbs.forEach((orb, index) => {
      gsap.to(orb, {
        x: Math.random() * 300 - 150,
        y: Math.random() * 300 - 150,
        scale: 0.5 + Math.random() * 0.5,
        duration: 20 + Math.random() * 10,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        delay: index * 2,
      })
    })

    // Create animated lines
    const lines = []
    const lineCount = 5

    for (let i = 0; i < lineCount; i++) {
      const line = document.createElement('div')
      line.className =
        'absolute h-px bg-gradient-to-r from-transparent via-[#F17A28]/30 to-transparent'
      line.style.width = '200px'
      line.style.left = Math.random() * 100 + '%'
      line.style.top = Math.random() * 100 + '%'
      line.style.transform = `rotate(${Math.random() * 360}deg)`
      container.appendChild(line)
      lines.push(line)
    }

    // Animate lines
    lines.forEach((line, index) => {
      gsap.to(line, {
        x: Math.random() * 400 - 200,
        y: Math.random() * 400 - 200,
        rotation: Math.random() * 360,
        duration: 15 + Math.random() * 10,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        delay: index * 1.5,
      })
    })

    // Cleanup function
    return () => {
      particles.forEach((particle) => particle.remove())
      orbs.forEach((orb) => orb.remove())
      lines.forEach((line) => line.remove())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className='fixed inset-0 pointer-events-none overflow-hidden z-0'
      style={{ zIndex: -1 }}
    />
  )
}

export default AnimatedBackground
