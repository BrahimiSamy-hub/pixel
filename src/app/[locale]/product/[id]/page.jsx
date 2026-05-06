import ProductClient from './ProductClient'

export async function generateMetadata({ params }) {
  const { id } = await params
  // If we could fetch product name we would do it here. 
  // For now, improving the static descriptive parts.
  return {
    title: 'Produit de la Collection | Pixel Creative Agency',
    description: 'Découvrez les détails de ce produit exclusif chez Pixel Creative Agency Algérie. Personnalisation, qualité d\'impression supérieure et designs uniques.',
    alternates: {
      canonical: `https://pixeldz.store/product/${id}`,
    },
  }
}

export default async function ProductPage({ params }) {
  const { id } = await params
  return <ProductClient id={id} />
}
