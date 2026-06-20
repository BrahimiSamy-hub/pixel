"use client"
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NextImage from 'next/image'
import { portfolioItems } from '@/data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

// Pick one striking image per visual category for the showcase
const FEATURED = [
  portfolioItems.find(i => i.sub === 'Mariage'),
  portfolioItems.find(i => i.sub === 'Food Photography'),
  portfolioItems.find(i => i.sub === 'Affiche'),
  portfolioItems.find(i => i.sub === 'Shooting Studio'),
  portfolioItems.find(i => i.sub === 'Carte de Visite'),
  portfolioItems.find(i => i.sub === 'Logo & Identité'),
].filter(Boolean)

const CATEGORY_LABELS = {
  conception: 'Conception',
  print:      'Print',
  digital:    'Digital',
  video:      'Vidéo',
  social:     'Social',
  photo:      'Photo',
}

export default function HorizontalScroll() {
  const wrapperRef = useRef(null)
  const trackRef   = useRef(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const track   = trackRef.current
    if (!wrapper || !track) return

    // Wait one tick so layout is painted and scrollWidth is correct
    const ctx = gsap.context(() => {
      const totalShift = track.scrollWidth - wrapper.offsetWidth

      gsap.to(track, {
        x: -totalShift,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 72px',
          end: () => `+=${totalShift}`,
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Fade-up each card number as it comes into the horizontal view
      gsap.utils.toArray('.hs-card-idx').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: wrapper,
              start: `top 72px`,
              // Each card appears as that fraction of totalShift is scrolled
              end: () => `+=${totalShift}`,
              scrub: false,
              onUpdate: (self) => {
                const progress = self.progress
                const cardFraction = i / (FEATURED.length - 1)
                if (progress >= cardFraction - 0.05) {
                  gsap.to(el, { opacity: 1, y: 0, duration: 0.5 })
                }
              },
            },
          }
        )
      })
    }, wrapper)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={wrapperRef} className="overflow-hidden w-full" style={{ height: 'calc(100vh - 72px)' }}>
      {/* Section label */}
      <div className="absolute top-0 left-0 z-10 px-6 lg:px-10 pt-8 flex items-center gap-4 select-none pointer-events-none">
        <div className="w-8 h-px bg-[#F17A28]" />
        <span className="text-white/40 text-xs uppercase tracking-[0.3em] font-bold">
          Travaux Récents
        </span>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex h-full items-stretch will-change-transform"
        style={{ width: `${FEATURED.length * 88}vw` }}
      >
        {FEATURED.map((item, i) => {
          const categoryLabel = CATEGORY_LABELS[item.category] ?? item.sub

          return (
            <div
              key={item.id}
              className="relative flex-shrink-0 overflow-hidden"
              style={{ width: '85vw', margin: '0 1.5vw' }}
            >
              {/* Full-bleed image */}
              <NextImage
                src={item.src}
                alt={item.label}
                fill
                sizes="85vw"
                className="object-cover"
                draggable={false}
                priority={i === 0}
              />

              {/* Dark gradient bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

              {/* Card info */}
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 flex items-end justify-between">
                <div>
                  <span className="text-[#F17A28] text-xs uppercase tracking-[0.25em] font-bold block mb-3">
                    {categoryLabel}
                  </span>
                  <h3 className="text-white text-2xl lg:text-4xl font-black leading-tight max-w-xs lg:max-w-sm">
                    {item.label}
                  </h3>
                </div>

                {/* Index counter */}
                <span className="hs-card-idx text-white/20 text-6xl lg:text-8xl font-black leading-none select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Right edge separator */}
              {i < FEATURED.length - 1 && (
                <div className="absolute top-0 right-0 w-px h-full bg-white/8" />
              )}
            </div>
          )
        })}

        {/* End card — CTA */}
        <div
          className="relative flex-shrink-0 flex items-center justify-center bg-[#F17A28]"
          style={{ width: '40vw', margin: '0 1.5vw' }}
        >
          <div className="text-center px-10">
            <p className="text-black/60 text-xs uppercase tracking-[0.3em] font-bold mb-6">
              Votre prochain projet
            </p>
            <h3 className="text-black text-4xl lg:text-6xl font-black leading-none mb-10">
              Travaillons<br />ensemble
            </h3>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 bg-black text-white font-bold px-8 py-4 rounded-full text-sm hover:bg-white hover:text-black transition-all duration-300"
            >
              Démarrer un projet
              <span>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 right-8 lg:right-10 flex items-center gap-3 pointer-events-none select-none">
        <span className="text-white/30 text-xs uppercase tracking-widest">Faites défiler</span>
        <div className="flex gap-1">
          {FEATURED.map((_, i) => (
            <div key={i} className="w-4 h-px bg-white/20" />
          ))}
        </div>
      </div>
    </section>
  )
}
