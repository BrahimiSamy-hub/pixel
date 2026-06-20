"use client"
import { useRef, useState, useCallback } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion'
import { gsap } from 'gsap'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import { IoPlay, IoClose, IoOpenOutline } from 'react-icons/io5'

const getSrc = (src) => src?.src || src

// ─── Single project card ────────────────────────────────────────────────────
const ProjectCard = ({ item, colIndex, onVideoClick }) => {
  const wrapRef  = useRef(null)  // outer div — used by useInView, useScroll, AND GSAP tilt
  const isInView = useInView(wrapRef, { once: true, margin: '-80px 0px' })

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start end', 'end start'],
  })
  // Image moves ±35px relative to the card as it scrolls through viewport
  const imageY = useTransform(scrollYProgress, [0, 1], [-35, 35])

  const isVideo   = item.type === 'video'
  const isWebsite = item.type === 'website'
  const imageSrc  = isVideo ? item.thumb : getSrc(item.src)

  // ── GSAP 3D tilt handlers ──────────────────────────────────────────
  const onMouseMove = useCallback((e) => {
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2
    gsap.to(el, {
      rotateY: x * 10,
      rotateX: -y * 10,
      transformPerspective: 900,
      duration: 0.45,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }, [])

  const onMouseLeave = useCallback(() => {
    gsap.to(wrapRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.7,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }, [])

  const cardInner = (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: colIndex * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden rounded-xl cursor-pointer select-none"
      onClick={isVideo ? () => onVideoClick(item.src) : undefined}
    >

      {/* Parallax image shell */}
      <div className="relative overflow-hidden aspect-square">
        {/* scale-[1.15] gives 15% overflow on each side — room for the ±35px y parallax */}
        <motion.div
          style={{ y: imageY }}
          className="absolute inset-0 scale-[1.15]"
        >
          <img
            src={imageSrc}
            alt={item.label}
            loading="lazy"
            draggable={false}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Video play indicator */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <IoPlay className="text-white text-2xl translate-x-0.5" />
            </div>
          </div>
        )}

        {/* Website open indicator */}
        {isWebsite && (
          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5">
              <IoOpenOutline className="text-white text-sm" />
              <span className="text-white text-[10px] font-bold uppercase tracking-wider">Voir le site</span>
            </div>
          </div>
        )}

        {/* Hover info overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col justify-end p-6 pointer-events-none">
          <div className="translate-y-5 group-hover:translate-y-0 transition-transform duration-500">
            <span className="inline-block text-[#F17A28] text-[10px] uppercase tracking-[0.25em] font-bold mb-2">
              {item.sub}
            </span>
            <h3 className="text-white text-lg font-bold leading-snug">
              {item.label}
            </h3>
          </div>
        </div>
      </div>
    </motion.div>
  )

  if (isVideo) {
    return (
      <div ref={wrapRef} className="transform-gpu" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
        {cardInner}
      </div>
    )
  }

  if (isWebsite) {
    return (
      <div ref={wrapRef} className="transform-gpu" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          {cardInner}
        </a>
      </div>
    )
  }

  return (
    <div ref={wrapRef} className="transform-gpu" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <PhotoView src={getSrc(item.src)}>
        {cardInner}
      </PhotoView>
    </div>
  )
}

// ─── Video lightbox ─────────────────────────────────────────────────────────
const VideoLightbox = ({ src, onClose }) => (
  <AnimatePresence>
    {src && (
      <motion.div
        key="video-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.88, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-5xl aspect-video mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <iframe
            src={`${src}?autoplay=1`}
            className="w-full h-full rounded-2xl"
            allowFullScreen
            allow="autoplay; encrypted-media"
          />
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors"
            aria-label="Fermer"
          >
            <IoClose size={30} />
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

// ─── Filter pills ────────────────────────────────────────────────────────────
const DEFAULT_FILTERS = [
  { id: 'all',        label: 'Tout'       },
  { id: 'conception', label: 'Conception' },
  { id: 'print',      label: 'Print'      },
  { id: 'digital',    label: 'Digital'    },
  { id: 'video',      label: 'Vidéo'      },
  { id: 'social',     label: 'Social'     },
  { id: 'photo',      label: 'Photo'      },
]

// ─── Main export ────────────────────────────────────────────────────────────
const ParallaxGrid = ({ items, activeFilter, onFilterChange, counts, filters }) => {
  const pillFilters = filters ?? DEFAULT_FILTERS
  const [activeVideo, setActiveVideo] = useState(null)

  const handleVideoClick = useCallback((src) => setActiveVideo(src), [])
  const handleVideoClose = useCallback(() => setActiveVideo(null), [])

  // Split items into two columns for the staggered offset layout
  const leftItems  = items.filter((_, i) => i % 2 === 0)
  const rightItems = items.filter((_, i) => i % 2 !== 0)

  return (
    <>
      {/* ── Filter bar ─────────────────────────────────────────────── */}
      <div className="sticky top-[4.5rem] lg:top-[4.75rem] z-40 bg-n-8/80 backdrop-blur-md border-b border-white/5 -mx-4 px-4 lg:-mx-10 lg:px-10 mb-16">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-4">
          {pillFilters.map((f) => {
            const count = counts?.[f.id]
            const isActive = activeFilter === f.id
            return (
              <button
                key={f.id}
                onClick={() => onFilterChange(f.id)}
                className={`relative flex-shrink-0 flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-[#F17A28] text-white shadow-lg shadow-[#F17A28]/25'
                    : 'text-white/50 hover:text-white hover:bg-white/8'
                }`}
              >
                {f.label}
                {count != null && (
                  <span className={`text-[10px] font-bold ${isActive ? 'text-white/70' : 'text-white/30'}`}>
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Grid ──────────────────────────────────────────────────── */}
      <PhotoProvider>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {items.length === 0 ? (
              <div className="text-center py-32 text-white/30 text-lg">
                Aucun projet dans cette catégorie.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7">
                {/* Left column */}
                <div className="flex flex-col gap-5 lg:gap-7">
                  {leftItems.map((item, i) => (
                    <ProjectCard
                      key={item.id}
                      item={item}
                      colIndex={i}
                      onVideoClick={handleVideoClick}
                    />
                  ))}
                </div>

                {/* Right column */}
                <div className="flex flex-col gap-5 lg:gap-7">
                  {rightItems.map((item, i) => (
                    <ProjectCard
                      key={item.id}
                      item={item}
                      colIndex={i}
                      onVideoClick={handleVideoClick}
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </PhotoProvider>

      {/* ── Video lightbox ───────────────────────────────────────── */}
      <VideoLightbox src={activeVideo} onClose={handleVideoClose} />
    </>
  )
}

export default ParallaxGrid
