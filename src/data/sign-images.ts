// The website's sign mockup images, by sign id (names and sizes come from the shared catalog).
import type { StaticImageData } from 'next/image'
import lion from '@/assets/signs/lion.jpg'
import lavilla from '@/assets/signs/lavilla.jpg'
import crunchy from '@/assets/signs/crunchy.jpg'
import salhi from '@/assets/signs/salhi.jpg'
import littlebee from '@/assets/signs/littlebee.jpg'
import fastfood from '@/assets/signs/fastfood.jpg'
import lightbox from '@/assets/signs/lightbox.jpg'
import cuistot from '@/assets/signs/cuistot.jpg'
import boitier from '@/assets/signs/boitier-pmma.jpg'
import br35 from '@/assets/signs/br35.jpg'
import evapor from '@/assets/signs/evapor.jpg'
import electromenager from '@/assets/signs/electromenager.jpg'
import fanta from '@/assets/signs/fanta.jpg'
import fantome from '@/assets/signs/fantome.jpg'
import grvb from '@/assets/signs/grvb.jpg'
import tiktok from '@/assets/signs/tiktok.jpg'
import artcom from '@/assets/signs/artcom.jpg'
import lettres from '@/assets/signs/lettres.jpg'
import kinou from '@/assets/signs/kinou.jpg'
import elriadh from '@/assets/signs/elriadh.jpg'

export const signImages: Record<string, StaticImageData> = {
  lion: lion,
  lavilla: lavilla,
  crunchy: crunchy,
  salhi: salhi,
  littlebee: littlebee,
  fastfood: fastfood,
  lightbox: lightbox,
  cuistot: cuistot,
  boitier: boitier,
  br35: br35,
  evapor: evapor,
  electromenager: electromenager,
  fanta: fanta,
  fantome: fantome,
  grvb: grvb,
  tiktok: tiktok,
  artcom: artcom,
  lettres: lettres,
  kinou: kinou,
  elriadh: elriadh,
}
