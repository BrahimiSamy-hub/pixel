import { setRequestLocale } from 'next-intl/server'
import { CheckoutView } from '@/components/shop/checkout-view'
import { Container } from '@/components/ui/container'
import type { Locale } from '@/i18n/routing'
import { staticPageMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: PageProps<'/[locale]/paiement'>) {
  const { locale } = await params
  // Cart pages are personal: keep them out of the index.
  return staticPageMetadata(locale as Locale, 'checkout', '/paiement', true)
}

export default async function CheckoutPage({ params }: PageProps<'/[locale]/paiement'>) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  return (
    <section className="pt-10 pb-16 md:pb-24">
      <Container>
        <CheckoutView />
      </Container>
    </section>
  )
}
