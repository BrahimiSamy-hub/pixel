import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import astronaut from '@/assets/astro.png'
import logo from '@/assets/logoSVG.svg'
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from '@/components/ui/brand-icons'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { PixelDots } from '@/components/ui/hex'
import { Link } from '@/i18n/navigation'
import { cities } from '@/lib/nav'
import { site } from '@/lib/site'
import { studioList } from '@/lib/studios'
import { CookieSettingsButton } from './cookie-consent'

const socialLinks = [
  { label: 'Instagram', href: site.socials.instagram.href, Icon: InstagramIcon },
  { label: 'TikTok', href: site.socials.tiktok.href, Icon: TikTokIcon },
  { label: 'Facebook', href: site.socials.facebook.href, Icon: FacebookIcon },
]

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-2 text-label text-orange">{children}</h2>
}

export function Footer() {
  const t = useTranslations('Footer')
  const tStudios = useTranslations('Studios')
  const tNav = useTranslations('Nav')
  const tCity = useTranslations('City.names')
  const tTop = useTranslations('TopBar')

  return (
    <footer className="mt-auto pt-16 md:pt-24">
      <Container>
        <section className="relative flex flex-wrap items-center justify-between gap-10 overflow-hidden rounded-[2rem] border border-line bg-ink-2 p-8 sm:p-12 lg:p-20">
          <div aria-hidden className="absolute -inset-e-32 -top-40 h-150 w-130 bg-ink-3 clip-hex" />
          <div className="relative flex min-w-0 flex-[1_1_32rem] flex-col gap-6">
            <p className="flex items-center gap-3 text-label text-mist">
              <PixelDots />
              {t('eyebrow')}
            </p>
            <h2 className="text-balance text-h1">
              {t('title')}
              <br />
              <span className="text-orange">{t('titleAccent')}</span>
            </h2>
            <p className="max-w-lg text-lg leading-relaxed text-lavender">{t('lead')}</p>
            <div className="mt-2 flex flex-wrap gap-3.5">
              <ButtonLink href="/contact">
                {t('cta')}
                <ArrowRight size={18} aria-hidden className="flip-rtl" />
              </ButtonLink>
              <ButtonLink href={site.whatsapp.href} variant="secondary">
                <WhatsAppIcon size={18} className="text-whatsapp" />
                WhatsApp
              </ButtonLink>
            </div>
          </div>
          <Image
            src={astronaut}
            alt={t('mascotAlt')}
            sizes="(min-width: 1024px) 340px, 240px"
            className="relative mx-auto h-auto w-60 lg:w-85"
          />
        </section>

        <div className="flex flex-wrap gap-x-10 gap-y-12 pt-16 md:pt-20">
          <div className="flex min-w-0 flex-[1.6_1_17rem] flex-col gap-5">
            <Image src={logo} alt="Pixel Creative Agency" unoptimized className="h-16 w-auto self-start" />
            <p className="max-w-xs text-[0.9375rem] leading-relaxed text-mist">{t('about')}</p>
            <ul className="flex gap-2.5">
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-11 items-center justify-center rounded-full border border-line bg-ink-2 text-white hover:border-line-strong"
                  >
                    <Icon size={17} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-labelledby="footer-studios" className="flex-[1_1_11rem]">
            <FooterHeading>
              <span id="footer-studios">{t('studios')}</span>
            </FooterHeading>
            <ul className="flex flex-col gap-3 text-[0.9375rem]">
              {studioList.map((s) => (
                <li key={s.key}>
                  <Link href={s.href} className="text-lavender hover:text-white">
                    {tStudios(`${s.key}.category`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-agency" className="flex-[1_1_10rem]">
            <FooterHeading>
              <span id="footer-agency">{t('agency')}</span>
            </FooterHeading>
            <ul className="flex flex-col gap-3 text-[0.9375rem]">
              <li><Link href="/a-propos" className="text-lavender hover:text-white">{tNav('about')}</Link></li>
              <li><Link href="/portfolio" className="text-lavender hover:text-white">{tNav('portfolio')}</Link></li>
              <li><Link href="/temoignages" className="text-lavender hover:text-white">{t('testimonials')}</Link></li>
              <li><Link href="/blog" className="text-lavender hover:text-white">{tNav('blog')}</Link></li>
              <li><Link href="/contact" className="text-lavender hover:text-white">{tNav('contact')}</Link></li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-shop" className="flex-[1_1_10rem]">
            <FooterHeading>
              <span id="footer-shop">{t('shop')}</span>
            </FooterHeading>
            <ul className="flex flex-col gap-3 text-[0.9375rem]">
              <li><Link href="/boutique" className="text-lavender hover:text-white">{t('posters')}</Link></li>
              <li><Link href="/loup-garou-regles" className="text-lavender hover:text-white">{t('games')}</Link></li>
              <li><Link href="/publicite" className="text-lavender hover:text-white">{t('neons')}</Link></li>
              <li><Link href="/paiement" className="text-lavender hover:text-white">{t('myCart')}</Link></li>
            </ul>
          </nav>

          <div className="flex flex-[1.3_1_14rem] flex-col gap-3 text-[0.9375rem] text-lavender">
            <FooterHeading>{t('contact')}</FooterHeading>
            <a href={site.phone.href} className="text-lg font-semibold text-white" dir="ltr">
              {site.phone.display}
            </a>
            <a href={`mailto:${site.email}`} className="hover:text-white">
              {site.email}
            </a>
            <span>{tTop('location')}</span>
            <span>{t('hours')}</span>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-3.5 gap-y-2.5 border-y border-line py-5 text-sm text-mist">
          <span className="me-2 text-label text-white">{t('cities')}</span>
          {cities.map((c, i) => (
            <span key={c.key} className="flex items-center gap-3.5">
              <Link href={c.href} className="text-lavender hover:text-white">
                {tCity(c.key)}
              </Link>
              {i < cities.length - 1 ? <span aria-hidden>·</span> : null}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-7 pb-10 text-[0.8125rem] text-mist">
          <span>{t('rights', { year: new Date().getFullYear() })}</span>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <Link href="/politique-de-confidentialite" className="hover:text-white">{t('privacy')}</Link>
            <Link href="/conditions-dutilisation" className="hover:text-white">{t('terms')}</Link>
            <Link href="/loup-garou-regles" className="hover:text-white">{t('werewolf')}</Link>
            <CookieSettingsButton label={t('cookies')} />
          </div>
        </div>
      </Container>
    </footer>
  )
}
