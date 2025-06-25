import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export const useGSAP = () => {
  const elementRef = useRef(null)

  const fadeInUp = (delay = 0, duration = 1) => {
    return gsap.fromTo(
      elementRef.current,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
      }
    )
  }

  const fadeInLeft = (delay = 0, duration = 1) => {
    return gsap.fromTo(
      elementRef.current,
      {
        opacity: 0,
        x: -100,
      },
      {
        opacity: 1,
        x: 0,
        duration,
        delay,
        ease: 'power3.out',
      }
    )
  }

  const fadeInRight = (delay = 0, duration = 1) => {
    return gsap.fromTo(
      elementRef.current,
      {
        opacity: 0,
        x: 100,
      },
      {
        opacity: 1,
        x: 0,
        duration,
        delay,
        ease: 'power3.out',
      }
    )
  }

  const scaleIn = (delay = 0, duration = 1) => {
    return gsap.fromTo(
      elementRef.current,
      {
        opacity: 0,
        scale: 0.5,
      },
      {
        opacity: 1,
        scale: 1,
        duration,
        delay,
        ease: 'back.out(1.7)',
      }
    )
  }

  const staggerChildren = (stagger = 0.1, delay = 0) => {
    return gsap.fromTo(
      elementRef.current.children,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger,
        delay,
        ease: 'power3.out',
      }
    )
  }

  const parallaxEffect = (speed = 0.5) => {
    return gsap.to(elementRef.current, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: elementRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }

  const floatingAnimation = () => {
    return gsap.to(elementRef.current, {
      y: -20,
      duration: 2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
    })
  }

  const textReveal = (delay = 0) => {
    const text = elementRef.current
    if (!text) return

    const chars = text.textContent.split('')
    text.textContent = ''

    chars.forEach((char, index) => {
      const span = document.createElement('span')
      span.textContent = char === ' ' ? '\u00A0' : char
      span.style.opacity = '0'
      span.style.transform = 'translateY(100%)'
      text.appendChild(span)
    })

    return gsap.to(text.children, {
      opacity: 1,
      y: 0,
      duration: 0.05,
      stagger: 0.02,
      delay,
      ease: 'power3.out',
    })
  }

  const morphingBackground = (colors = ['#F17A28', '#e5691f', '#ff8c42']) => {
    return gsap.to(elementRef.current, {
      background: colors,
      duration: 3,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
    })
  }

  const rotateIn = (delay = 0, duration = 1) => {
    return gsap.fromTo(
      elementRef.current,
      {
        opacity: 0,
        rotation: -180,
        scale: 0.5,
      },
      {
        opacity: 1,
        rotation: 0,
        scale: 1,
        duration,
        delay,
        ease: 'back.out(1.7)',
      }
    )
  }

  const slideInFromTop = (delay = 0, duration = 1) => {
    return gsap.fromTo(
      elementRef.current,
      {
        opacity: 0,
        y: -100,
      },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
      }
    )
  }

  const bounceIn = (delay = 0, duration = 1) => {
    return gsap.fromTo(
      elementRef.current,
      {
        opacity: 0,
        scale: 0.3,
      },
      {
        opacity: 1,
        scale: 1,
        duration,
        delay,
        ease: 'bounce.out',
      }
    )
  }

  return {
    elementRef,
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    scaleIn,
    staggerChildren,
    parallaxEffect,
    floatingAnimation,
    textReveal,
    morphingBackground,
    rotateIn,
    slideInFromTop,
    bounceIn,
  }
}

export default useGSAP
