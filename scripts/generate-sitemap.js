import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = 'https://pixeldz.store'
const API_URL = 'https://api.pixeldz.store'

// Get current date in ISO format (YYYY-MM-DD)
const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0]
}

// Generate sitemap XML
const generateSitemap = (staticRoutes, categories, products) => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- Static Routes -->
`

  // Add static routes with hreflang (fr and en only)
  staticRoutes.forEach((route) => {
    sitemap += `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${route.lastmod || getCurrentDate()}</lastmod>
    <changefreq>${route.changefreq || 'monthly'}</changefreq>
    <priority>${route.priority || '0.8'}</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${BASE_URL}${route.path}" />
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}${route.path}" />
  </url>
  
`
  })

  // Add category routes
  if (categories && categories.length > 0) {
    sitemap += `  <!-- Category Routes -->
`
    categories.forEach((category) => {
      sitemap += `  <url>
    <loc>${BASE_URL}/shop/${category._id}</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${BASE_URL}/shop/${category._id}" />
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/shop/${category._id}" />
  </url>
  
`
    })
  }

  // Add product routes
  if (products && products.length > 0) {
    sitemap += `  <!-- Product Routes -->
`
    products.forEach((product) => {
      // Skip disabled products
      if (product.name === 'AlgeriaPoly') {
        return
      }

      sitemap += `  <url>
    <loc>${BASE_URL}/product/${product._id}</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${BASE_URL}/product/${product._id}" />
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/product/${product._id}" />
  </url>
  
`
    })
  }

  sitemap += `</urlset>`

  return sitemap
}

// Main function
const main = async () => {
  try {
    console.log('Generating sitemap...')

    // Fetch categories
    console.log('Fetching categories...')
    const categoriesResponse = await axios.get(`${API_URL}/categories`)
    const categories = categoriesResponse.data || []

    // Fetch all products
    console.log('Fetching products...')
    const productsResponse = await axios.get(`${API_URL}/posters`)
    const products = productsResponse.data || []

    console.log(`Found ${categories.length} categories and ${products.length} products`)

    // Define static routes
    const staticRoutes = [
      {
        path: '/',
        lastmod: getCurrentDate(),
        changefreq: 'weekly',
        priority: '1.0',
      },
      {
        path: '/shop',
        lastmod: getCurrentDate(),
        changefreq: 'weekly',
        priority: '0.9',
      },
      {
        path: '/portfolio',
        lastmod: getCurrentDate(),
        changefreq: 'weekly',
        priority: '0.9',
      },
      {
        path: '/about-us',
        lastmod: getCurrentDate(),
        changefreq: 'monthly',
        priority: '0.8',
      },
      {
        path: '/contact',
        lastmod: getCurrentDate(),
        changefreq: 'monthly',
        priority: '0.8',
      },
      {
        path: '/photoLab',
        lastmod: getCurrentDate(),
        changefreq: 'monthly',
        priority: '0.8',
      },
      {
        path: '/sounds',
        lastmod: getCurrentDate(),
        changefreq: 'monthly',
        priority: '0.8',
      },
      {
        path: '/wedding',
        lastmod: getCurrentDate(),
        changefreq: 'monthly',
        priority: '0.8',
      },
      {
        path: '/development',
        lastmod: getCurrentDate(),
        changefreq: 'monthly',
        priority: '0.8',
      },
      {
        path: '/creative',
        lastmod: getCurrentDate(),
        changefreq: 'monthly',
        priority: '0.8',
      },
      {
        path: '/advertisement',
        lastmod: getCurrentDate(),
        changefreq: 'monthly',
        priority: '0.8',
      },
      {
        path: '/rules',
        lastmod: getCurrentDate(),
        changefreq: 'yearly',
        priority: '0.3',
      },
      // Checkout is intentionally excluded as it should have noindex
    ]

    // Generate sitemap XML
    const sitemapXml = generateSitemap(staticRoutes, categories, products)

    // Write to public/sitemap.xml
    const publicDir = path.join(__dirname, '..', 'public')
    const sitemapPath = path.join(publicDir, 'sitemap.xml')

    // Ensure public directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }

    fs.writeFileSync(sitemapPath, sitemapXml, 'utf8')

    console.log(`Sitemap generated successfully at ${sitemapPath}`)
    console.log(`Total URLs: ${staticRoutes.length + categories.length + products.filter(p => p.name !== 'AlgeriaPoly').length}`)
  } catch (error) {
    console.error('Error generating sitemap:', error.message)
    if (error.response) {
      console.error('API Response:', error.response.status, error.response.data)
    }
    process.exit(1)
  }
}

main()

