import CategoriesClient from './CategoriesClient'

export const metadata = {
  title: 'Boutique Créative — Photos, Sons, Design | Pixel Algérie',
  description: 'Achetez des photos professionnelles, sons, designs et actifs créatifs en ligne. Large catalogue de ressources créatives algériennes. Paiement sécurisé.',
  keywords: 'catégories produits, affiches personnalisées, posters créatifs, design personnalisé, pixel creative agency',
  alternates: {
    canonical: '/boutique',
  },
}

export default function ShopPage() {
  return <CategoriesClient />
}
