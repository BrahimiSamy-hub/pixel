/* eslint-disable @next/next/no-img-element -- media is already resized WebP served from our own API with immutable caching */
import { ChevronRight, Download, Globe, Link2, Mail, MapPin, Navigation, Phone } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { cardDict, langNames } from '@/lib/card-i18n'
import { cardLangs, type CardData, type CardLang } from '@/server/card-schema'
import styles from './card-page.module.css'
import { ShareButton } from './share-button'
import { SocialIcon, socialMeta } from './social-icon'
import { themeVars } from './theme-vars'

type Props = { username: string; card: CardData; lang: CardLang; pageUrl: string }

const media = (id?: string) => (id ? `/api/media/${id}` : undefined)
const digits = (phone: string) => phone.replace(/[^+0-9]/g, '')
const waNumber = (phone: string) => {
  // Local Algerian numbers (0X XX…) become international for wa.me.
  const d = digits(phone).replace(/^\+/, '')
  return d.startsWith('0') ? `213${d.slice(1)}` : d
}
const host = (url: string) => {
  try {
    return new URL(url).host.replace(/^www\./, '')
  } catch {
    return url
  }
}
const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')

export function CardPage({ username, card, lang, pageUrl }: Props) {
  const t = cardDict(lang)
  const logo = media(card.logoId)
  const avatar = media(card.avatarId)
  const cover = media(card.coverId)
  const firstPhone = card.phones[0]
  const firstEmail = card.emails[0]
  const directions =
    card.mapsUrl ?? (card.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(card.address)}` : undefined)

  const actions: Array<{ key: string; href: string; label: string; icon: ReactNode; external?: boolean }> = []
  if (firstPhone) actions.push({ key: 'call', href: `tel:${digits(firstPhone.number)}`, label: t.call, icon: <Phone size={20} /> })
  if (card.whatsapp)
    actions.push({ key: 'wa', href: `https://wa.me/${waNumber(card.whatsapp)}`, label: t.whatsapp, icon: <SocialIcon platform="whatsapp" size={20} />, external: true })
  if (firstEmail) actions.push({ key: 'mail', href: `mailto:${firstEmail.address}`, label: t.email, icon: <Mail size={20} /> })
  if (directions) actions.push({ key: 'map', href: directions, label: t.directions, icon: <Navigation size={20} />, external: true })
  if (actions.length < 4 && card.website)
    actions.push({ key: 'web', href: card.website, label: t.website, icon: <Globe size={20} />, external: true })

  const contactRows = [
    ...card.phones.map((p) => ({ href: `tel:${digits(p.number)}`, icon: <Phone size={18} />, label: p.label ?? t.phone, value: p.number })),
    ...card.emails.map((e) => ({ href: `mailto:${e.address}`, icon: <Mail size={18} />, label: e.label ?? t.email, value: e.address })),
  ]
  const linkRows = [
    ...(card.website ? [{ label: t.website, url: card.website }] : []),
    ...card.links,
  ]

  const portrait = avatar ?? logo
  const showLogoBadge = Boolean(avatar && logo)

  return (
    <div className={styles.page} data-theme={card.theme} style={themeVars(card.theme, card.colors) as CSSProperties}>
      <div className={styles.decor} aria-hidden>
        <span />
        <span />
        <span />
      </div>

      <main className={styles.shell}>
        <header className={styles.hero}>
          <div className={styles.cover}>{cover && <img src={cover} alt="" />}</div>
          <div className={styles.identity}>
            <div className={styles.portrait} data-kind={avatar ? 'avatar' : logo ? 'logo' : 'initials'}>
              {portrait ? <img src={portrait} alt="" /> : <span>{initials(card.displayName)}</span>}
              {showLogoBadge && (
                <span className={styles.logoBadge}>
                  <img src={logo} alt="" />
                </span>
              )}
            </div>
            <h1 className={styles.name} dir="auto">{card.displayName}</h1>
            {(card.title || card.company) && (
              <p className={styles.role} dir="auto">
                {card.title}
                {card.title && card.company && <span aria-hidden> · </span>}
                {card.company && <strong>{card.company}</strong>}
              </p>
            )}
            {card.bio && <p className={styles.bio} dir="auto">{card.bio}</p>}
          </div>
        </header>

        {actions.length > 0 && (
          <nav className={styles.actions} data-count={actions.length} aria-label={t.contact}>
            {actions.map((a) => (
              <a key={a.key} href={a.href} className={styles.action} {...(a.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                <span className={styles.actionIcon}>{a.icon}</span>
                <span>{a.label}</span>
              </a>
            ))}
          </nav>
        )}

        <a href={`/api/cards/${username}/vcard`} className={styles.save}>
          <Download size={18} aria-hidden />
          <span>{t.saveContact}</span>
        </a>

        {card.socials.length > 0 && (
          <section className={styles.section} aria-labelledby="socials">
            <h2 id="socials" className={styles.sectionTitle}>
              {t.follow}
            </h2>
            <ul className={styles.socials}>
              {card.socials.map((s, i) => (
                <li key={`${s.platform}-${i}`}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.social}
                    style={{ '--brand': socialMeta[s.platform].color } as CSSProperties}
                  >
                    <span className={styles.socialIcon}>
                      <SocialIcon platform={s.platform} />
                    </span>
                    <span className={styles.socialName}>{socialMeta[s.platform].name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {contactRows.length > 1 && (
          <section className={styles.section} aria-labelledby="contact">
            <h2 id="contact" className={styles.sectionTitle}>
              {t.contact}
            </h2>
            <ul className={styles.rows}>
              {contactRows.map((r) => (
                <li key={r.href}>
                  <a href={r.href} className={styles.row}>
                    <span className={styles.rowIcon}>{r.icon}</span>
                    <span className={styles.rowText}>
                      <span className={styles.rowLabel} dir="auto">{r.label}</span>
                      <span dir="ltr">{r.value}</span>
                    </span>
                    <ChevronRight size={18} className={styles.chevron} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {linkRows.length > 0 && (
          <section className={styles.section} aria-labelledby="links">
            <h2 id="links" className={styles.sectionTitle}>
              {t.links}
            </h2>
            <ul className={styles.rows}>
              {linkRows.map((l, i) => (
                <li key={`${l.url}-${i}`}>
                  <a href={l.url} target="_blank" rel="noopener noreferrer" className={styles.row}>
                    <span className={styles.rowIcon}>
                      <Link2 size={18} />
                    </span>
                    <span className={styles.rowText}>
                      <span dir="auto">{l.label}</span>
                      <span className={styles.rowLabel} dir="ltr">
                        {host(l.url)}
                      </span>
                    </span>
                    <ChevronRight size={18} className={styles.chevron} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {card.address && (
          <section className={styles.section} aria-labelledby="location">
            <h2 id="location" className={styles.sectionTitle}>
              {t.location}
            </h2>
            <div className={styles.map}>
              <iframe
                title={t.location}
                src={`https://www.google.com/maps?q=${encodeURIComponent(card.address)}&output=embed&hl=${lang}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a href={directions} target="_blank" rel="noopener noreferrer" className={styles.mapFooter}>
                <MapPin size={18} aria-hidden />
                <span dir="auto">{card.address}</span>
                <span className={styles.mapCta}>{t.openMaps}</span>
              </a>
            </div>
          </section>
        )}

        <footer className={styles.footer}>
          <ShareButton url={pageUrl} title={card.displayName} label={t.share} copiedLabel={t.copied} className={styles.share} />
          <nav className={styles.langs} aria-label={t.language}>
            {cardLangs.map((l) => (
              <a
                key={l}
                href={l === card.defaultLang ? `/c/${username}` : `/c/${username}/${l}`}
                hrefLang={l}
                lang={l}
                aria-current={l === lang ? 'true' : undefined}
              >
                {langNames[l]}
              </a>
            ))}
          </nav>
          <a href="https://pixeldz.store" className={styles.credit} target="_blank" rel="noopener">
            {t.madeBy} <strong>Pixel</strong>
          </a>
        </footer>
      </main>
    </div>
  )
}
