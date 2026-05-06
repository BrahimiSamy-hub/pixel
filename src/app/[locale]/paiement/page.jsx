import CheckoutClient from './CheckoutClient'

export const metadata = {
  title: 'Commande | Pixel Creative Agency',
  description: 'Finalisez votre commande sur Pixel Creative Agency. Livraison rapide et paiement sécurisé.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function CheckoutPage() {
  return <CheckoutClient />
}
