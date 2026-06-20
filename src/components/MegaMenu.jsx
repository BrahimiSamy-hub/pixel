"use client"
import React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'
import {
  IoBrush,
  IoPrint,
  IoDesktop,
  IoPlay,
  IoShareSocial,
  IoArrowForward
} from 'react-icons/io5'
import {
  logo, logo1, logo2,
  rollUp, rollUp1, rollUp2,
  pixel,
  shooting1,
  post, post1, post2, post3,
  pixelH
} from '@/assets'

const HexagonIcon = ({ children, className = "" }) => (
  <div className={`relative w-16 h-16 flex items-center justify-center ${className}`}>
    <div className="absolute inset-0 bg-[#F17A28]/10 border border-[#F17A28]/20" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }} />
    <div className="relative z-1">{children}</div>
  </div>
)

const MegaMenu = ({ isOpen, onClose }) => {
  const t = useTranslations('mega_menu')

  const menuItems = [
    {
      id: 'conception',
      icon: IoBrush,
      title: t('conception.title'),
      desc: t('conception.desc'),
      count: "24",
      url: '/portfolio/conception',
      layout: 'grid-3',
      previews: [logo, logo1, logo2]
    },
    {
      id: 'print',
      icon: IoPrint,
      title: t('print.title'),
      desc: t('print.desc'),
      count: "18",
      url: '/portfolio/print',
      layout: 'grid-3',
      previews: [rollUp, rollUp1, rollUp2]
    },
    {
      id: 'digital',
      icon: IoDesktop,
      title: t('digital.title'),
      desc: t('digital.desc'),
      count: "21",
      url: '/portfolio/digital',
      layout: 'single',
      previews: [pixel]
    },
    {
      id: 'video',
      icon: IoPlay,
      title: t('video.title'),
      desc: t('video.desc'),
      count: "15",
      url: '/portfolio/video',
      layout: 'video',
      previews: [shooting1]
    },
    {
      id: 'social',
      icon: IoShareSocial,
      title: t('social.title'),
      desc: t('social.desc'),
      count: "32",
      url: '/portfolio/social',
      layout: 'grid-4',
      previews: [post, post1, post2, post3]
    }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Menu Content */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22 }}
            className="mx-auto mt-4 w-[1400px] max-w-[95vw]"
          >
            <div className="overflow-hidden rounded-[32px] border border-orange-500/20 bg-[#090914]/95 shadow-[0_0_80px_rgba(255,115,0,0.12)] backdrop-blur-2xl">
              {/* TOP GLOW */}
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

              {/* CONTENT */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 p-8">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.url}
                    onClick={onClose}
                    className="group relative overflow-hidden rounded-[28px] border border-white/5 bg-white/[0.02] p-5 transition-all duration-300 hover:border-orange-500/30 hover:bg-orange-500/[0.03]"
                  >
                    {/* HOVER GLOW */}
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-orange-500/10 blur-3xl" />
                    </div>

                    {/* ICON */}
                    <div className="relative mb-6">
                      <HexagonIcon>
                        <item.icon className="h-7 w-7 text-[#F17A28]" />
                      </HexagonIcon>
                    </div>

                    {/* TEXT */}
                    <div className="relative">
                      <h3 className="mb-3 text-2xl font-semibold text-white group-hover:text-[#F17A28] transition-colors">
                        {item.title}
                      </h3>
                      <p className="mb-5 line-clamp-3 text-sm leading-7 text-white/60 h-20">
                        {item.desc}
                      </p>
                      <div className="mb-5 flex items-center gap-2">
                        <span className="text-3xl font-bold text-[#F17A28]">
                          {item.count}
                        </span>
                        <span className="text-sm text-white/50 lowercase">
                          projets
                        </span>
                      </div>
                    </div>

                    {/* PREVIEW */}
                    <div className="relative mb-5 overflow-hidden rounded-2xl border border-white/5 aspect-square bg-black/20">
                      {item.layout === 'grid-3' && (
                        <div className="grid grid-cols-12 gap-1.5 h-full p-1.5">
                          <div className="col-span-7 h-full relative rounded-lg overflow-hidden">
                            <Image src={item.previews[0]} alt="" fill className="object-cover" />
                          </div>
                          <div className="col-span-5 flex flex-col gap-1.5 h-full">
                            <div className="h-1/2 relative rounded-lg overflow-hidden">
                              <Image src={item.previews[1]} alt="" fill className="object-cover" />
                            </div>
                            <div className="h-1/2 relative rounded-lg overflow-hidden">
                              <Image src={item.previews[2]} alt="" fill className="object-cover" />
                            </div>
                          </div>
                        </div>
                      )}
                      {item.layout === 'single' && (
                        <div className="h-full relative overflow-hidden">
                          <Image src={item.previews[0]} alt="" fill className="object-cover" />
                        </div>
                      )}
                      {item.layout === 'video' && (
                        <div className="h-full relative overflow-hidden">
                          <Image src={item.previews[0]} alt="" fill className="object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                              <IoPlay className="text-white text-xl translate-x-0.5" />
                            </div>
                          </div>
                        </div>
                      )}
                      {item.layout === 'grid-4' && (
                        <div className="grid grid-cols-2 gap-1.5 h-full p-1.5">
                          {item.previews.slice(0, 4).map((img, idx) => (
                            <div key={idx} className="relative rounded-lg overflow-hidden">
                              <Image src={img} alt="" fill className="object-cover" />
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090914] via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* CTA */}
                    <div className="relative flex items-center justify-between">
                      <span className="text-sm font-medium text-white/80 group-hover:text-[#F17A28] transition-colors">
                        Voir les projets
                      </span>
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-orange-500/20 bg-orange-500/5 transition-all duration-300 group-hover:bg-[#F17A28]">
                        <IoArrowForward className="h-5 w-5 text-[#F17A28] group-hover:text-black transition-colors" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* FOOTER */}
              <div className="flex items-center justify-between border-t border-white/5 px-8 py-6">
                <div className="flex items-center gap-6">
                  <HexagonIcon>
                    <Image src={pixelH} alt="Pixel" width={24} height={24} className="opacity-80" />
                  </HexagonIcon>
                  <div>
                    <h4 className="mb-1 text-xl font-semibold text-white">
                      {t('cta_title')}
                    </h4>
                    <p className="text-white/50">
                      Discutons ensemble de votre prochain succès.
                    </p>
                  </div>
                </div>

                <Link
                  href="/contact"
                  onClick={onClose}
                  className="group flex items-center gap-4 rounded-2xl border border-orange-500/30 bg-orange-500/5 px-8 py-4 text-[#F17A28] transition-all duration-300 hover:bg-[#F17A28] hover:text-black font-bold"
                >
                  Nous contacter
                  <IoArrowForward className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MegaMenu
