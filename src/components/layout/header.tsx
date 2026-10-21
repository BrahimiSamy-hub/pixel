import { Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import logo from '@/assets/logoSVG.svg'
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from '@/components/ui/brand-icons'
import { ButtonLink } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { site } from '@/lib/site'
import { CartButton } from './cart-button'
import { LocaleSwitcher } from './locale-switcher'
import { MobileMenu } from './mobile-menu'
import { NavLinks } from './nav-links'

function TopBar() {
  const t = useTranslations('TopBar')
  return (
    <div className="hidden border-b border-ink-3 sm:block">
      <div className="mx-auto flex min-h-11 max-w-[1360px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-10 text-[0.8125rem] text-mist">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <span className="flex items-center gap-2">
            <MapPin size={15} className="text-orange" aria-hidden />
            {t('location')} · {t('hours')}
          </span>
          <a href={site.phone.href} className="flex items-center gap-2 hover:text-white">
            <Phone size={15} className="text-orange" aria-hidden />
            <bdi dir="ltr">{site.phone.display}</bdi>
          </a>
          <a href={site.whatsapp.href} className="flex items-center gap-2 hover:text-white">
            <WhatsAppIcon size={15} className="text-whatsapp" />
            WhatsApp <bdi dir="ltr">{site.whatsapp.display}</bdi>
          </a>
          <a href={`mailto:${site.email}`} className="hidden items-center gap-2 hover:text-white lg:flex">
            <Mail size={15} className="text-orange" aria-hidden />
            {site.email}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a href={site.socials.instagram.href} aria-label="Instagram" className="hover:text-white" target="_blank" rel="noopener noreferrer">
            <InstagramIcon size={16} />
          </a>
          <a href={site.socials.tiktok.href} aria-label="TikTok" className="hover:text-white" target="_blank" rel="noopener noreferrer">
            <TikTokIcon size={16} />
          </a>
          <a href={site.socials.facebook.href} aria-label="Facebook" className="hover:text-white" target="_blank" rel="noopener noreferrer">
            <FacebookIcon size={16} />
          </a>
          <span aria-hidden className="h-4 w-px bg-line-strong" />
          <LocaleSwitcher />
        </div>
      </div>
    </div>
  )
}

export function Header() {
  const t = useTranslations('Nav')
  return (
    <header className="relative z-40 border-b border-line bg-ink">
      <TopBar />
      <div className="mx-auto flex min-h-20 max-w-[1360px] items-center justify-between gap-6 px-4 sm:px-10">
        <Link href="/" aria-label={t('homeLabel')} className="flex shrink-0 items-center">
          <Image src={logo} alt="" unoptimized preload className="h-12 w-auto sm:h-[3.375rem]" />
        </Link>
        <nav aria-label={t('main')} className="hidden lg:block">
          <NavLinks />
        </nav>
        <div className="flex items-center gap-3">
          <CartButton />
          <ButtonLink href="/contact" size="sm" className="hidden sm:inline-flex">
            {t('cta')}
          </ButtonLink>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
