export type WeddingPack = {
  id: 'rose' | 'jasmin' | 'iris' | 'lilas' | 'tulipe' | 'orchidee'
  price: number
  photographers: number
  editing: 'FHD' | '4K' | '6K'
  prep: boolean
  studio: boolean
  retouch: boolean
  photobook: boolean
  frames: number
  shortFilm: boolean
  drone: boolean
  usbGb: number
}

export const weddingPacks: WeddingPack[] = [
  { id: 'rose', price: 29000, photographers: 2, editing: 'FHD', prep: false, studio: false, retouch: false, photobook: false, frames: 0, shortFilm: false, drone: false, usbGb: 16 },
  { id: 'jasmin', price: 39000, photographers: 4, editing: 'FHD', prep: false, studio: false, retouch: true, photobook: true, frames: 0, shortFilm: false, drone: false, usbGb: 16 },
  { id: 'iris', price: 48000, photographers: 4, editing: '4K', prep: true, studio: true, retouch: true, photobook: true, frames: 2, shortFilm: false, drone: false, usbGb: 32 },
  { id: 'lilas', price: 68000, photographers: 4, editing: '4K', prep: true, studio: false, retouch: true, photobook: true, frames: 2, shortFilm: false, drone: true, usbGb: 32 },
  { id: 'tulipe', price: 99000, photographers: 6, editing: '4K', prep: true, studio: true, retouch: true, photobook: true, frames: 3, shortFilm: false, drone: true, usbGb: 64 },
  { id: 'orchidee', price: 130000, photographers: 6, editing: '6K', prep: true, studio: true, retouch: true, photobook: true, frames: 4, shortFilm: true, drone: true, usbGb: 64 },
]
