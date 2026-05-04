/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    'gsap',
    'framer-motion',
    'swiper',
    'react-photo-view',
    'react-icons',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.pixeldz.store',
      },
      {
        protocol: 'https',
        hostname: 'pixeldz.store',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/photoLab',
        destination: '/photo-lab',
        permanent: true,
      },
      {
        source: '/rules',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/creative',
        destination: '/graphic-design',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
