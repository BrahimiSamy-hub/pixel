import ShopClient from './ShopClient'

export async function generateMetadata({ params }) {
  const { categoryId } = await params
  // Format categoryId for title (e.g. "wall-posters" -> "Wall Posters")
  const formattedCategory = categoryId
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title: `${formattedCategory} | Boutique Pixel Creative Agency`,
    description: `Découvrez notre collection de ${formattedCategory} en Algérie. Designs exclusifs, impressions haute qualité et formats personnalisables chez Pixel Creative Agency.`,
    alternates: {
      canonical: `https://pixeldz.store/shop/${categoryId}`,
    },
  }
}

export default async function CategoryPage({ params }) {
  const { categoryId } = await params
  return <ShopClient categoryId={categoryId} />
}
