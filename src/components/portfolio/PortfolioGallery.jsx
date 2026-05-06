"use client"
import React from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import { IoPlay } from 'react-icons/io5'

const PortfolioGallery = ({ items, searchQuery, viewType, isVideo = false }) => {
  const filteredItems = items.filter(item => 
    (item.alt || item.title || "").toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 bg-[#13151A] rounded-3xl border border-white/5">
        Aucun projet ne correspond à votre recherche.
      </div>
    )
  }

  if (viewType === 'list') {
    return (
      <div className="space-y-6">
        {filteredItems.map((item, index) => (
          <div 
            key={index} 
            className="group flex flex-col md:flex-row gap-8 bg-[#13151A] rounded-3xl p-6 border border-white/5 hover:border-[#F17A28]/30 transition-all duration-300"
          >
            <div className="w-full md:w-2/5 aspect-video relative rounded-2xl overflow-hidden bg-black/20">
              {isVideo ? (
                <div className="w-full h-full relative group/vid">
                   <iframe
                    src={item.src}
                    title={item.title}
                    className="w-full h-full object-cover"
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <PhotoProvider>
                  <PhotoView src={item.src?.src || item.src}>
                    <div className="w-full h-full flex items-center justify-center cursor-pointer">
                      <img 
                        src={item.src?.src || item.src} 
                        alt={item.alt} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                    </div>
                  </PhotoView>
                </PhotoProvider>
              )}
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#F17A28] transition-colors">
                {item.alt || item.title}
              </h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Réalisation professionnelle par Pixel Creative Agency. Ce projet illustre notre engagement envers la qualité, l'innovation et l'excellence créative en Algérie.
              </p>
              <div className="flex items-center gap-4">
                <span className="px-4 py-1.5 rounded-full bg-[#F17A28]/10 border border-[#F17A28]/20 text-xs text-[#F17A28] font-bold uppercase tracking-wider">
                  {isVideo ? 'Vidéo / Animation' : 'Design Graphique'}
                </span>
                <span className="text-xs text-white/30 uppercase tracking-tighter">Projet Pixel Agency</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {isVideo ? (
        filteredItems.map((video, index) => (
          <div key={index} className="flex flex-col gap-4">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/20 border border-white/5 hover:border-[#F17A28]/30 transition-all duration-300">
               <iframe
                src={video.src}
                title={video.title}
                className="w-full h-full object-cover"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <h3 className="text-lg font-semibold text-white px-2 group-hover:text-[#F17A28] transition-colors">{video.title}</h3>
          </div>
        ))
      ) : (
        <PhotoProvider>
          {filteredItems.map((image, index) => (
            <div key={index} className="group relative aspect-square rounded-2xl overflow-hidden bg-[#13151A] border border-white/5 hover:border-[#F17A28]/30 transition-all duration-500">
              <PhotoView src={image.src?.src || image.src}>
                <div className="w-full h-full flex items-center justify-center cursor-pointer">
                  <img 
                    src={image.src?.src || image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    loading="lazy"
                  />
                </div>
              </PhotoView>
              {/* Overlay for grid view */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col justify-end p-6">
                <p className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {image.alt}
                </p>
                <p className="text-white/50 text-xs uppercase tracking-widest mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  Voir en plein écran
                </p>
              </div>
            </div>
          ))}
        </PhotoProvider>
      )}
    </div>
  )
}

export default PortfolioGallery
