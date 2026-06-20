"use client"
import { useState, useMemo, useRef, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'
import { portfolioItems, CATEGORY_COUNTS } from '@/data/portfolioData'
import ParallaxGrid from '@/components/portfolio/ParallaxGrid'
import HorizontalScroll from '@/components/portfolio/HorizontalScroll'
import ButtonGradient from '@/assets/svg/ButtonGradient'

gsap.registerPlugin(ScrollTrigger)

const AnimatedBackground = dynamic(
  () => import('@/components/AnimatedBackground'),
  { ssr: false }
)

const CATEGORY_LABEL = {
  all:        'Toutes nos réalisations',
  conception: 'Identité visuelle & branding',
  print:      'Imprimés & supports',
  digital:    'Sites web & digital',
  video:      'Vidéo & cinéma',
  social:     'Social media',
  photo:      'Photographie',
}

export default function PortfolioClient() {
  const params  = useParams()
  const router  = useRouter()
  const locale  = useLocale()

  const titleRef   = useRef(null)
  const metaRef    = useRef(null)
  const heroRef    = useRef(null)

  const [activeFilter, setActiveFilter] = useState(params?.category ?? 'all')

  const filteredItems = useMemo(
    () => activeFilter === 'all'
      ? portfolioItems
      : portfolioItems.filter(i => i.category === activeFilter),
    [activeFilter]
  )

  // ── GSAP hero text reveal (clip-path mask slide-up) ─────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title words slide up from behind an overflow:hidden parent
      gsap.fromTo(
        '.hero-word',
        { y: '110%' },
        {
          y: '0%',
          stagger: 0.14,
          duration: 1.4,
          ease: 'power4.out',
          delay: 0.1,
        }
      )

      // Meta row fades in after title
      gsap.fromTo(
        metaRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.55 }
      )

      // Subtle parallax on hero as you scroll past it
      gsap.to(heroRef.current, {
        yPercent: -22,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId)
    const target = filterId === 'all'
      ? `/${locale}/portfolio`
      : `/${locale}/portfolio/${filterId}`
    router.replace(target, { scroll: false })
  }

  return (
    <>
      <AnimatedBackground />

      <main className="bg-n-8 overflow-hidden">

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative flex flex-col justify-end min-h-[80vh] pt-[5rem] lg:pt-[8rem] px-4 lg:px-10 pb-0 overflow-hidden"
        >
          {/* Ambient glows */}
          <div className="pointer-events-none absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full bg-[#F17A28]/5 blur-[160px]" />
          <div className="pointer-events-none absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#F17A28]/4 blur-[120px]" />

          <div className="relative z-10 container mx-auto max-w-7xl">

            {/* Eyebrow */}
            <p className="text-[#F17A28] text-xs font-bold uppercase tracking-[0.4em] mb-8 overflow-hidden">
              <span className="hero-word block">— Pixel Creative Agency · Algérie</span>
            </p>

            {/* Giant masked title */}
            <h1
              ref={titleRef}
              className="text-[clamp(4.5rem,15vw,14rem)] font-black leading-[0.88] tracking-tight mb-10 select-none"
            >
              <span className="overflow-hidden block">
                <span className="hero-word block text-white">Port</span>
              </span>
              <span className="overflow-hidden block">
                <span
                  className="hero-word block"
                  style={{
                    WebkitTextStroke: '2px rgba(255,255,255,0.28)',
                    color: 'transparent',
                  }}
                >
                  folio
                </span>
              </span>
            </h1>

            {/* Meta row */}
            <div
              ref={metaRef}
              className="flex flex-wrap items-end justify-between gap-6 pb-10 border-b border-white/8"
            >
              <div>
                <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Catégorie active</p>
                <p className="text-white text-xl font-semibold">
                  {CATEGORY_LABEL[activeFilter]}
                </p>
              </div>

              <div className="flex items-center gap-8 lg:gap-12">
                <div className="text-right">
                  <p className="text-[#F17A28] text-5xl font-black leading-none tabular-nums">
                    {filteredItems.length}
                  </p>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1">Réalisations</p>
                </div>
                <div className="text-right">
                  <p className="text-white/50 text-5xl font-black leading-none">8+</p>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1">Années</p>
                </div>
                <div className="text-right">
                  <p className="text-white/50 text-5xl font-black leading-none">98%</p>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1">Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HORIZONTAL PINNED SHOWCASE ────────────────────────────── */}
        <HorizontalScroll />

        {/* ── GRID ──────────────────────────────────────────────────── */}
        <section className="px-4 lg:px-10 pb-32 pt-20">
          <div className="container mx-auto max-w-7xl">
            <ParallaxGrid
              items={filteredItems}
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
              counts={CATEGORY_COUNTS}
            />
          </div>
        </section>


      </main>

      <ButtonGradient />
    </>
  )
}
