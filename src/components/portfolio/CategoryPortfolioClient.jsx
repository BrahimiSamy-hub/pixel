"use client"
import { useState, useMemo, useRef, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from '@/navigation'
import { portfolioItems } from '@/data/portfolioData'
import ParallaxGrid from '@/components/portfolio/ParallaxGrid'
import ButtonGradient from '@/assets/svg/ButtonGradient'

gsap.registerPlugin(ScrollTrigger)

const CATEGORY_CONFIG = {
  conception: {
    title: 'Identité Visuelle',
    subtitle: '— Branding & conception',
    description: 'Logos, chartes graphiques et identités de marque qui marquent les esprits et ancrent votre image.',
  },
  print: {
    title: 'Print',
    subtitle: '— Supports imprimés',
    description: 'Flyers, affiches, menus et tous les supports qui portent votre message hors du digital.',
  },
  digital: {
    title: 'Digital',
    subtitle: '— Sites web & UX',
    description: 'Des expériences web modernes qui convertissent, inspirent et reflètent votre identité.',
  },
  video: {
    title: 'Vidéo',
    subtitle: '— Production audiovisuelle',
    description: 'Réels, spots publicitaires et films cinématographiques qui racontent votre histoire.',
  },
  social: {
    title: 'Social Media',
    subtitle: '— Contenu pour les réseaux',
    description: 'Posts et visuels percutants qui engagent votre communauté et amplifient votre marque.',
  },
  photo: {
    title: 'Photographie',
    subtitle: '— Shooting & reportage',
    description: 'Photos professionnelles pour sublimer vos produits, vos événements et votre univers.',
  },
}

export default function CategoryPortfolioClient({ category }) {
  const locale = useLocale()
  const heroRef = useRef(null)

  const config = CATEGORY_CONFIG[category] ?? {
    title: category,
    subtitle: '— Portfolio',
    description: 'Découvrez nos réalisations.',
  }

  const categoryItems = useMemo(
    () => portfolioItems.filter(i => i.category === category),
    [category]
  )

  // Derive unique sub-categories that actually exist
  const existingSubs = useMemo(() => {
    const seen = new Set()
    const subs = []
    categoryItems.forEach(i => {
      if (!seen.has(i.sub)) { seen.add(i.sub); subs.push(i.sub) }
    })
    return subs
  }, [categoryItems])

  const [activeSub, setActiveSub] = useState('all')

  const filteredItems = useMemo(
    () => activeSub === 'all' ? categoryItems : categoryItems.filter(i => i.sub === activeSub),
    [categoryItems, activeSub]
  )

  const subCounts = useMemo(() => {
    const c = { all: categoryItems.length }
    existingSubs.forEach(s => { c[s] = categoryItems.filter(i => i.sub === s).length })
    return c
  }, [categoryItems, existingSubs])

  const pillFilters = useMemo(() => [
    { id: 'all', label: 'Tout' },
    ...existingSubs.map(s => ({ id: s, label: s })),
  ], [existingSubs])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cat-word',
        { y: '110%' },
        { y: '0%', stagger: 0.1, duration: 1.2, ease: 'power4.out', delay: 0.1 }
      )
      gsap.fromTo(
        '.cat-meta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.4, stagger: 0.1 }
      )
      gsap.to(heroRef.current, {
        yPercent: -18,
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

  return (
    <>
      <main className="bg-n-8 overflow-hidden">

        {/* ── HERO ── */}
        <section
          ref={heroRef}
          className="relative flex flex-col justify-end min-h-[70vh] pt-[5rem] lg:pt-[8rem] px-4 lg:px-10 pb-0 overflow-hidden"
        >
          <div className="pointer-events-none absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full bg-[#F17A28]/5 blur-[160px]" />
          <div className="pointer-events-none absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#F17A28]/4 blur-[120px]" />

          <div className="relative z-10 container mx-auto max-w-7xl">

            {/* Back link */}
            <div className="overflow-hidden mb-8">
              <Link
                href={`/${locale}/portfolio`}
                className="cat-meta inline-flex items-center gap-2 text-white/30 hover:text-[#F17A28] text-xs uppercase tracking-[0.35em] font-bold transition-colors duration-200"
              >
                ← Tous les projets
              </Link>
            </div>

            {/* Eyebrow */}
            <p className="text-[#F17A28] text-xs font-bold uppercase tracking-[0.4em] mb-6 overflow-hidden">
              <span className="cat-word block">{config.subtitle}</span>
            </p>

            {/* Title */}
            <h1 className="text-[clamp(4rem,13vw,11rem)] font-black leading-[0.88] tracking-tight mb-10 select-none">
              <span className="overflow-hidden block">
                <span className="cat-word block text-white">{config.title}</span>
              </span>
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-end justify-between gap-6 pb-10 border-b border-white/8">
              <p className="cat-meta text-white/40 max-w-md text-base leading-relaxed">
                {config.description}
              </p>
              <div className="cat-meta flex items-end gap-10">
                <div className="text-right">
                  <p className="text-[#F17A28] text-5xl font-black leading-none tabular-nums">
                    {categoryItems.length}
                  </p>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1">Réalisations</p>
                </div>
                {existingSubs.length > 1 && (
                  <div className="text-right">
                    <p className="text-white/50 text-5xl font-black leading-none">{existingSubs.length}</p>
                    <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1">Sous-catégories</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── GRID ── */}
        <section className="px-4 lg:px-10 pb-32 pt-20">
          <div className="container mx-auto max-w-7xl">
            <ParallaxGrid
              items={filteredItems}
              activeFilter={activeSub}
              onFilterChange={setActiveSub}
              counts={subCounts}
              filters={pillFilters}
            />
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="px-4 lg:px-10 pb-24">
          <div className="container mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-white/[0.02] p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="absolute inset-0 bg-gradient-to-br from-[#F17A28]/7 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F17A28]/40 to-transparent" />
              <div className="relative z-10">
                <p className="text-[#F17A28] text-xs font-bold uppercase tracking-[0.3em] mb-4">— Prochain projet</p>
                <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight">
                  Un projet<br />en tête ?
                </h2>
              </div>
              <Link
                href={`/${locale}/contact`}
                className="relative z-10 flex-shrink-0 group flex items-center gap-4 bg-[#F17A28] hover:bg-[#e06920] text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#F17A28]/30 hover:-translate-y-0.5"
              >
                Parlons-en
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <ButtonGradient />
    </>
  )
}
