import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const SEOHead = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  structuredData = null,
  noindex = false,
  updatedTime = null,
  imageAlt = null,
}) => {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language || 'fr'
  
  // Determine locale based on current language (only fr or en, ignore ar)
  const ogLocale = currentLanguage === 'en' ? 'en_US' : 'fr_FR'
  const alternateLocale = currentLanguage === 'en' ? 'fr_FR' : 'en_US'
  
  const defaultTitle = 'Pixel Creative Agency - Agence Créative en Algérie'
  const defaultDescription =
    'Agence créative professionnelle en Algérie spécialisée en photographie, vidéographie, design graphique, développement web et production audio.'
  const defaultImage = 'https://pixeldz.store/src/assets/astro.png'
  const defaultUrl = 'https://pixeldz.store'

  const pageTitle = title ? `${title} | Pixel Creative Agency` : defaultTitle
  const pageDescription = description || defaultDescription
  // Ensure image URL is absolute
  const pageImage =
    image && (image.startsWith('http://') || image.startsWith('https://'))
      ? image
      : image
      ? `https://pixeldz.store${image.startsWith('/') ? '' : '/'}${image}`
      : defaultImage
  const pageUrl = url || defaultUrl
  const pageImageAlt = imageAlt || title || defaultTitle

  // Format updated time if provided
  const formattedUpdatedTime = updatedTime
    ? new Date(updatedTime).toISOString()
    : null

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name='title' content={pageTitle} />
      <meta name='description' content={pageDescription} />
      {keywords && <meta name='keywords' content={keywords} />}
      {noindex && <meta name='robots' content='noindex, nofollow' />}

      {/* Canonical URL */}
      <link rel='canonical' href={pageUrl} />

      {/* Open Graph / Facebook */}
      <meta property='og:type' content={type} />
      <meta property='og:url' content={pageUrl} />
      <meta property='og:title' content={pageTitle} />
      <meta property='og:description' content={pageDescription} />
      <meta property='og:image' content={pageImage} />
      <meta property='og:image:secure_url' content={pageImage} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:image:type' content='image/png' />
      <meta property='og:image:alt' content={pageImageAlt} />
      <meta property='og:site_name' content='Pixel Creative Agency' />
      <meta property='og:locale' content={ogLocale} />
      <meta property='og:locale:alternate' content={alternateLocale} />
      {formattedUpdatedTime && (
        <meta property='og:updated_time' content={formattedUpdatedTime} />
      )}

      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:url' content={pageUrl} />
      <meta name='twitter:title' content={pageTitle} />
      <meta name='twitter:description' content={pageDescription} />
      <meta name='twitter:image' content={pageImage} />
      <meta name='twitter:image:alt' content={pageImageAlt} />

      {/* Structured Data */}
      {structuredData && (
        <script type='application/ld+json'>
          {Array.isArray(structuredData)
            ? JSON.stringify(structuredData)
            : JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  )
}

export default SEOHead
