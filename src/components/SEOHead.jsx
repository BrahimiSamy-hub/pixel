import { Helmet } from 'react-helmet-async'

const SEOHead = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  structuredData = null,
}) => {
  const defaultTitle = 'Pixel Creative Agency - Agence Créative en Algérie'
  const defaultDescription =
    'Agence créative professionnelle en Algérie spécialisée en photographie, vidéographie, design graphique, développement web et production audio.'
  const defaultImage = 'https://pixeldz.store/src/assets/astro.png'
  const defaultUrl = 'https://pixeldz.store'

  const pageTitle = title ? `${title} | Pixel Creative Agency` : defaultTitle
  const pageDescription = description || defaultDescription
  const pageImage = image || defaultImage
  const pageUrl = url || defaultUrl

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name='title' content={pageTitle} />
      <meta name='description' content={pageDescription} />
      {keywords && <meta name='keywords' content={keywords} />}

      {/* Canonical URL */}
      <link rel='canonical' href={pageUrl} />

      {/* Open Graph / Facebook */}
      <meta property='og:type' content={type} />
      <meta property='og:url' content={pageUrl} />
      <meta property='og:title' content={pageTitle} />
      <meta property='og:description' content={pageDescription} />
      <meta property='og:image' content={pageImage} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:site_name' content='Pixel Creative Agency' />
      <meta property='og:locale' content='fr_FR' />

      {/* Twitter */}
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={pageUrl} />
      <meta property='twitter:title' content={pageTitle} />
      <meta property='twitter:description' content={pageDescription} />
      <meta property='twitter:image' content={pageImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type='application/ld+json'>
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  )
}

export default SEOHead
