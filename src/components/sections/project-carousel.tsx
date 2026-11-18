'use client'

import Image from 'next/image'
import { type CSSProperties, type KeyboardEvent, type PointerEvent, useRef, useState, useSyncExternalStore } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play, ShoppingBag } from 'lucide-react'
import pixelMark from '@/assets/brand/pixel-mark-white.svg'
import waslaLogo from '@/assets/brand/wasla.png'
import { Container } from '@/components/ui/container'
import { site } from '@/lib/site'
import { cn } from '@/lib/cn'

type Device = 'web' | 'android' | 'ios'
type ProjectId = 'pixelApp' | 'wasla' | 'dzEcommerce'

type ProjectCopy = {
  eyebrow: string
  brand: string
  title: string
  text: string
  cta: Record<Device, string>
}

type CarouselCopy = {
  label: string
  carouselRole: string
  previous: string
  next: string
  pagination: string
  slideLabel: string
  pause: string
  play: string
  projects: Record<ProjectId, ProjectCopy>
}

const projectVisuals = {
  pixelApp: {
    image: '/pixel-app-banner.webp',
    accent: '#F6A43D',
    button: '#EE7D22',
  },
  wasla: {
    image: '/wasla-home-banner.webp',
    accent: '#57D9DF',
    button: '#FFE064',
  },
  dzEcommerce: {
    image: '/dz-ecommerce-banner.webp',
    accent: '#76E8A4',
    button: '#76E8A4',
  },
} as const

const projectDestinations: Record<ProjectId, Record<Device, string>> = {
  pixelApp: {
    web: 'https://pixelcreativeagency.net',
    android: 'https://pixelcreativeagency.net',
    ios: site.apps.ios.url,
  },
  wasla: {
    web: 'https://waslanetwork.dz',
    android: 'https://play.google.com/store/apps/details?id=com.brahimisam.waslaapp',
    ios: 'https://apps.apple.com/dz/app/wasla-services-tradesmen/id6760976544',
  },
  dzEcommerce: {
    web: 'https://dz-ecommerce.com',
    android: 'https://dz-ecommerce.com',
    ios: 'https://dz-ecommerce.com',
  },
}

const labelStyle = 'font-mono text-[0.8125rem] font-bold tracking-[0.18em] uppercase'
const subscribe = () => () => {}
const AUTOPLAY_MS = 7000
/** Slide easing: fast start, long soft landing. */
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
/** A drag past this share of the width, or a flick faster than FLICK px/ms, changes slide. */
const DRAG_RATIO = 0.18
const FLICK = 0.45

const reducedQuery = '(prefers-reduced-motion: reduce)'
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(reducedQuery)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
const getReduced = () => window.matchMedia(reducedQuery).matches
const getServerReduced = () => false

const subscribeVisibility = (cb: () => void) => {
  document.addEventListener('visibilitychange', cb)
  return () => document.removeEventListener('visibilitychange', cb)
}
const getHidden = () => document.hidden
const getServerHidden = () => false

/** Copy elements rise in one after another on the active slide. */
const rise = (active: boolean, step: number, reduced: boolean): CSSProperties | undefined =>
  active && !reduced ? { animation: `px-rise 700ms ${EASE} ${120 + step * 90}ms both` } : undefined
const getServerDevice = (): Device => 'web'

function getDevice(): Device {
  const userAgent = navigator.userAgent
  if (/iPad|iPhone|iPod/i.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) return 'ios'
  if (/Android/i.test(userAgent)) return 'android'
  return 'web'
}

function makeSlideLabel(template: string, current: number, total: number) {
  return template.replace('%current%', String(current)).replace('%total%', String(total))
}

/**
 * Carousel of Pixel's mobile app, Wasla, and DZ Ecommerce.
 * Autoplay is driven by the active dot's progress animation (so every pause is just `paused`), stops for
 * reduced-motion users, and pauses on hover, focus, drag, a hidden tab, or the pause button (WCAG 2.2.2).
 * Slides follow the finger on drag/swipe and snap on release; arrow keys work and respect RTL.
 */
export function ProjectCarousel({ copy, dir }: { copy: CarouselCopy; dir: 'ltr' | 'rtl' }) {
  const device = useSyncExternalStore(subscribe, getDevice, getServerDevice)
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, getServerReduced)
  const tabHidden = useSyncExternalStore(subscribeVisibility, getHidden, getServerHidden)
  const [activeIndex, setActiveIndex] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [drag, setDrag] = useState<number | null>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const dragStart = useRef<{ x: number; y: number; t: number; id: number; locked: boolean | null } | null>(null)
  const suppressClick = useRef(false)

  const slides: ProjectId[] = ['pixelApp', 'wasla', 'dzEcommerce']
  const count = slides.length
  const rtl = dir === 'rtl'

  const goTo = (index: number) => setActiveIndex((index + count) % count)
  const previous = () => goTo(activeIndex - 1)
  const next = () => goTo(activeIndex + 1)

  const autoplay = !reduced && !userPaused
  const running = autoplay && !hovered && !focused && drag === null && !tabHidden

  // Swipe follows what is on screen: the track is laid out LTR, so dragging left always reveals the next slide.
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    dragStart.current = { x: e.clientX, y: e.clientY, t: performance.now(), id: e.pointerId, locked: null }
    suppressClick.current = false
  }
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const start = dragStart.current
    if (!start || start.id !== e.pointerId) return
    const dx = e.clientX - start.x
    const dy = e.clientY - start.y
    if (start.locked === null) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
      start.locked = Math.abs(dx) > Math.abs(dy)
      if (!start.locked) {
        dragStart.current = null
        return
      }
      e.currentTarget.setPointerCapture(e.pointerId)
    }
    // Rubber band at the ends of the track.
    const atEdge = (activeIndex === 0 && dx > 0) || (activeIndex === count - 1 && dx < 0)
    setDrag(atEdge ? dx / 3 : dx)
  }
  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    const start = dragStart.current
    dragStart.current = null
    if (!start || start.id !== e.pointerId || drag === null) {
      setDrag(null)
      return
    }
    const width = viewport.current?.offsetWidth ?? 1
    const dx = e.clientX - start.x
    const velocity = dx / Math.max(performance.now() - start.t, 1)
    suppressClick.current = Math.abs(dx) > 6
    if (dx < -width * DRAG_RATIO || velocity < -FLICK) goTo(Math.min(activeIndex + 1, count - 1))
    else if (dx > width * DRAG_RATIO || velocity > FLICK) goTo(Math.max(activeIndex - 1, 0))
    setDrag(null)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const forward = rtl ? 'ArrowLeft' : 'ArrowRight'
    const back = rtl ? 'ArrowRight' : 'ArrowLeft'
    if (e.key === forward) next()
    else if (e.key === back) previous()
    else if (e.key === 'Home') goTo(0)
    else if (e.key === 'End') goTo(count - 1)
    else return
    e.preventDefault()
  }

  // The track is laid out LTR: slide i sits at -i × 100% of the viewport, plus the live drag offset.
  const offset = `calc(${-activeIndex * 100}% + ${drag ?? 0}px)`
  const trackStyle: CSSProperties = {
    transform: `translate3d(${offset}, 0, 0)`,
    transition: drag !== null || reduced ? 'none' : `transform 750ms ${EASE}`,
  }

  return (
    <section className="section-y">
      <Container>
        <div
          role="region"
          aria-roledescription={copy.carouselRole}
          aria-label={copy.label}
          onKeyDown={onKeyDown}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false)
          }}
        >
          <div
            ref={viewport}
            className={cn('touch-pan-y overflow-hidden select-none', drag !== null ? 'cursor-grabbing' : 'cursor-grab')}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onClickCapture={(e) => {
              // A drag that ends on a slide must not open its link.
              if (suppressClick.current) {
                e.preventDefault()
                e.stopPropagation()
                suppressClick.current = false
              }
            }}
            onDragStart={(e) => e.preventDefault()}
          >
            <div id="project-carousel-track" dir="ltr" className="flex will-change-transform" style={trackStyle}>
              {slides.map((id, index) => {
                const project = copy.projects[id]
                const visual = projectVisuals[id]
                const cta = project.cta[device]
                const active = index === activeIndex

                return (
                  <a
                    key={id}
                    href={projectDestinations[id][device]}
                    aria-label={`${project.brand} — ${cta}`}
                    aria-roledescription="slide"
                    inert={!active}
                    draggable={false}
                    dir={dir}
                    className={cn(
                      'group relative isolate flex min-h-[26rem] w-full shrink-0 overflow-hidden border bg-[#071217] text-white transition-opacity duration-700 sm:min-h-[28rem] lg:min-h-[30rem]',
                      active ? 'opacity-100' : 'opacity-40',
                    )}
                    style={{ borderColor: `${visual.accent}55` }}
                  >
                    <span aria-hidden className="absolute inset-0 z-0 overflow-hidden">
                      <span
                        key={active ? `on-${activeIndex}` : 'off'}
                        className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]"
                        style={active && !reduced ? { animation: `px-settle 6s ${EASE} both` } : undefined}
                      >
                        <Image
                          src={visual.image}
                          alt=""
                          fill
                          priority={index === 0}
                          draggable={false}
                          sizes="(min-width: 1440px) 1280px, (min-width: 640px) calc(100vw - 5rem), calc(100vw - 2rem)"
                          className="object-cover object-[72%_center] md:object-center"
                        />
                      </span>
                    </span>
                    <span aria-hidden className="absolute inset-0 z-10 bg-[#04151c]/65 md:bg-[linear-gradient(90deg,rgba(4,21,28,0.97)_0%,rgba(4,21,28,0.88)_34%,rgba(4,21,28,0.38)_62%,rgba(4,21,28,0.04)_100%)]" />
                    <span aria-hidden className="absolute inset-0 z-10 bg-[linear-gradient(0deg,rgba(4,21,28,0.55)_0%,transparent_55%)]" />

                    <span key={active ? `copy-${activeIndex}` : 'copy'} className="relative z-20 flex w-full max-w-[45rem] flex-col items-start justify-center gap-5 px-6 py-9 sm:gap-6 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
                      <span className={cn(labelStyle, 'flex items-center gap-3')} style={{ color: visual.accent, ...rise(active, 0, reduced) }}>
                        <span aria-hidden className="h-px w-8" style={{ backgroundColor: visual.accent }} />
                        {project.eyebrow}
                      </span>

                      <span className="flex items-center gap-3.5" style={rise(active, 1, reduced)}>
                        {id === 'pixelApp' ? (
                          <Image src={pixelMark} alt="" aria-hidden unoptimized width={48} height={48} draggable={false} className="size-12" />
                        ) : id === 'wasla' ? (
                          <Image src={waslaLogo} alt="" aria-hidden width={48} height={48} draggable={false} className="size-12" />
                        ) : (
                          <span className="flex size-12 items-center justify-center bg-[#76e8a4] text-[#072016]">
                            <ShoppingBag size={23} strokeWidth={1.8} />
                          </span>
                        )}
                        <span className="text-xl leading-tight font-extrabold tracking-[-0.03em]">{project.brand}</span>
                      </span>

                      <span className="flex flex-col gap-3.5">
                        <h2 className="max-w-[14ch] text-balance text-[clamp(2.35rem,5vw,4.5rem)] leading-[0.93] font-extrabold tracking-[-0.045em]" style={rise(active, 2, reduced)}>
                          {project.title}
                        </h2>
                        <p className="max-w-[36rem] text-base leading-relaxed text-[#d0dedf] sm:text-lg" style={rise(active, 3, reduced)}>
                          {project.text}
                        </p>
                      </span>

                      <span
                        className="mt-1 inline-flex min-h-12 items-center gap-3 px-5 font-mono text-xs font-extrabold tracking-[0.1em] text-[#082027] uppercase transition-[filter] group-hover:brightness-110 sm:px-6 sm:text-sm"
                        style={{ backgroundColor: visual.button, ...rise(active, 4, reduced) }}
                      >
                        {cta}
                        <ArrowUpRight size={18} aria-hidden className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </span>
                  </a>
                )
              })}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3" dir={dir}>
              {reduced ? null : (
                <button
                  type="button"
                  aria-label={userPaused ? copy.play : copy.pause}
                  aria-pressed={userPaused}
                  onClick={() => setUserPaused((p) => !p)}
                  className="flex size-11 items-center justify-center border border-line text-white transition-colors hover:border-orange hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                >
                  {userPaused ? <Play size={16} aria-hidden /> : <Pause size={16} aria-hidden />}
                </button>
              )}
              <div role="group" aria-label={copy.pagination} className="flex items-center gap-2.5" dir="ltr">
                {slides.map((id, index) => {
                  const active = index === activeIndex
                  return (
                    <button
                      key={id}
                      type="button"
                      aria-label={makeSlideLabel(copy.slideLabel, index + 1, count)}
                      aria-current={active ? 'true' : undefined}
                      onClick={() => goTo(index)}
                      className={cn(
                        'relative h-2.5 overflow-hidden rounded-full transition-[width,background-color] duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange',
                        active ? 'w-10 bg-line-strong' : 'w-2.5 bg-line-strong hover:bg-mist',
                      )}
                    >
                      {active ? (
                        <span
                          key={activeIndex}
                          aria-hidden
                          className="absolute inset-0 origin-left rounded-full bg-orange"
                          style={
                            autoplay
                              ? { animation: `px-progress ${AUTOPLAY_MS}ms linear both`, animationPlayState: running ? 'running' : 'paused' }
                              : undefined
                          }
                          onAnimationEnd={() => next()}
                        />
                      ) : null}
                    </button>
                  )
                })}
              </div>
            </div>

            <p aria-live="polite" aria-atomic="true" className="sr-only">
              {running ? '' : makeSlideLabel(copy.slideLabel, activeIndex + 1, count)}
            </p>

            <div role="group" aria-label={copy.label} className="flex items-center gap-2.5" dir={dir}>
              <span aria-hidden className="me-2 font-mono text-sm font-semibold tracking-widest text-mist tabular-nums">
                {String(activeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </span>
              <button type="button" aria-label={copy.previous} onClick={previous} className="flex size-11 items-center justify-center border border-line text-white transition-colors hover:border-orange hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange">
                <ChevronLeft size={20} aria-hidden className={rtl ? 'rotate-180' : undefined} />
              </button>
              <button type="button" aria-label={copy.next} onClick={next} className="flex size-11 items-center justify-center border border-line text-white transition-colors hover:border-orange hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange">
                <ChevronRight size={20} aria-hidden className={rtl ? 'rotate-180' : undefined} />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
