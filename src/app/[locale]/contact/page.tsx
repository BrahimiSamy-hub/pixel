import { Mail, MapPin, Phone } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ContactForm, type StudioOption } from '@/components/forms/contact-form'
import { PageHero } from '@/components/sections/page-hero'
import { WhatsAppIcon } from '@/components/ui/brand-icons'
import { Container } from '@/components/ui/container'
import { Faq } from '@/components/ui/faq'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { staticPageMetadata } from '@/lib/seo'
import { site } from '@/lib/site'
import { studioList } from '@/lib/studios'

export async function generateMetadata({ params }: PageProps<'/[locale]/contact'>) {
  const { locale } = await params
  return staticPageMetadata(locale as Locale, 'contact', '/contact')
}

function HexIcon({ children, onOrange = false }: { children: React.ReactNode; onOrange?: boolean }) {
  return (
    <span className={`flex h-15 w-13 shrink-0 items-center justify-center clip-hex ${onOrange ? 'bg-ink text-whatsapp' : 'bg-line text-orange'}`}>
      {children}
    </span>
  )
}

export default async function ContactPage({ params }: PageProps<'/[locale]/contact'>) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const [t, tNav, tStudios, tTop] = await Promise.all([
    getTranslations('Contact'),
    getTranslations('Nav'),
    getTranslations('Studios'),
    getTranslations('TopBar'),
  ])

  const studios: StudioOption[] = [
    ...studioList.map((s) => ({ value: tStudios(`${s.key}.name`), label: tStudios(`${s.key}.short`), tone: s.tone })),
    { value: 'Autre', label: t('other'), tone: 'mist' as const },
  ]

  return (
    <>
      <PageHero crumbs={[{ label: tNav('contact') }]} title={t('title')} accent={t('titleAccent')} lead={t('lead')} />

      <Container className="flex flex-wrap items-start gap-8 pb-18 md:pb-28">
        <ContactForm studios={studios} />

        <aside className="flex min-w-0 flex-[1_1_22.5rem] flex-col gap-4">
          <a href={site.whatsapp.href} className="flex items-center gap-4.5 rounded-card bg-orange p-6 text-ink">
            <HexIcon onOrange>
              <WhatsAppIcon size={22} strokeWidth={2} />
            </HexIcon>
            <span className="flex flex-col gap-1">
              <span className="text-label font-bold">{t('aside.fastest')}</span>
              <span className="text-[1.375rem] font-bold tracking-[-0.01em]" dir="ltr">
                {site.whatsapp.display}
              </span>
            </span>
          </a>
          <a href={site.phone.href} className="flex items-center gap-4.5 rounded-card border border-line bg-ink-2 p-6 hover:border-line-strong">
            <HexIcon>
              <Phone size={22} strokeWidth={2} aria-hidden />
            </HexIcon>
            <span className="flex flex-col gap-1">
              <span className="text-label text-mist">{t('aside.phone')}</span>
              <span className="text-xl font-semibold" dir="ltr">
                {site.phone.display}
              </span>
            </span>
          </a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-4.5 rounded-card border border-line bg-ink-2 p-6 hover:border-line-strong">
            <HexIcon>
              <Mail size={22} strokeWidth={2} aria-hidden />
            </HexIcon>
            <span className="flex min-w-0 flex-col gap-1">
              <span className="text-label text-mist">{t('aside.email')}</span>
              <span className="text-lg font-semibold break-all">{site.email}</span>
            </span>
          </a>
          <div className="flex flex-col gap-4 rounded-card border border-line bg-ink-2 p-6">
            <div className="flex items-center gap-4.5">
              <HexIcon>
                <MapPin size={22} strokeWidth={2} aria-hidden />
              </HexIcon>
              <span className="flex flex-col gap-1">
                <span className="text-label text-mist">{t('aside.studio')}</span>
                <span className="text-lg font-semibold">{tTop('location')}</span>
              </span>
            </div>
            <p className="flex justify-between border-t border-line pt-4 text-[0.9375rem]">
              <span className="text-mist">{t('aside.days')}</span>
              <span dir="ltr">09:00 – 18:00</span>
            </p>
            <Link href="/a-propos" className="text-label font-bold text-orange">
              {t('aside.map')}
            </Link>
          </div>
        </aside>
      </Container>

      <section className="border-t border-line">
        <Container className="section-y flex flex-wrap gap-x-20 gap-y-10">
          <h2 className="min-w-0 flex-[1_1_20rem] text-[clamp(2rem,3.6vw,3rem)] leading-[1.08] font-semibold tracking-[-0.03em]">{t('faq.title')}</h2>
          <Faq
            className="min-w-0 flex-[2_1_35rem]"
            items={(['quote', 'duration', 'print'] as const).map((k) => ({ q: t(`faq.${k}.q`), a: t(`faq.${k}.a`) }))}
          />
        </Container>
      </section>
    </>
  )
}
