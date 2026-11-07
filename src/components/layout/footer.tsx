import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import astronaut from '@/assets/astro.png'
import logo from '@/assets/brand/pixel-logo-dark.svg'
import signature from '@/assets/brand/pixel-lockup-dark.svg'
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from '@/components/ui/brand-icons'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
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
    <footer className="mt-auto">
      {/* CTA band: a full flame aplat, with an amber P symbol bleeding off the edge. */}
      <section className="relative overflow-hidden bg-orange text-ink">
        <div aria-hidden className="absolute -inset-e-16 -top-24 aspect-[0.886] w-[34rem] bg-amber clip-mark" />
        <Container className="relative flex flex-wrap items-center justify-between gap-10 py-16 md:py-28">
          <div className="flex min-w-0 flex-[1_1_32rem] flex-col gap-6">
            <p className="text-label font-bold">{t('eyebrow')}</p>
            <h2 className="text-h1">
              {t('title')}
              <br />
              {t('titleAccent')}
            </h2>
            <p className="max-w-lg text-lg leading-relaxed text-[#2b1a0c]">{t('lead')}</p>
            <div className="mt-2 flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="ink">
                {t('cta')}
                <ArrowRight size={18} aria-hidden className="flip-rtl" />
              </ButtonLink>
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center gap-3 border-2 border-ink px-7 font-mono text-lg font-bold tracking-[0.16em] uppercase transition-colors hover:bg-ink hover:text-white"
              >
                <WhatsAppIcon size={18} />
                WhatsApp
              </a>
            </div>
          </div>
          <Image
            src={astronaut}
            alt={t('mascotAlt')}
            sizes="(min-width: 1024px) 320px, 220px"
            className="relative mx-auto h-auto w-56 lg:w-80"
          />
        </Container>
      </section>

      <Container>
        <div className="flex flex-wrap gap-x-10 gap-y-12 pt-16 md:pt-20">
          <div className="flex min-w-0 flex-[1.6_1_17rem] flex-col gap-5">
            <Image src={logo} alt="Pixel Creative Agency" unoptimized className="h-auto w-56 self-start" />
            <p className="max-w-xs text-[0.9375rem] leading-relaxed text-mist">{t('about')}</p>
            <ul className="flex gap-2.5">
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-11 items-center justify-center border border-line bg-ink-2 text-white hover:border-orange hover:text-orange"
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
            <a href={site.phone.href} className="text-[1.375rem] font-extrabold tracking-[-0.02em] text-white [font-stretch:112%]" dir="ltr">
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

        {/* Giant signature: the wordmark at full width closes every page. */}
        <Image src={signature} alt="" aria-hidden unoptimized className="mb-12 h-auto w-full" />
      </Container>
    </footer>
  )
}
