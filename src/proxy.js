import createMiddleware from 'next-intl/middleware'

const handleRequest = createMiddleware({
  locales: ['fr', 'en', 'ar'],
  defaultLocale: 'fr'
})

export function proxy(request) {
  return handleRequest(request)
}

export default proxy

export const config = {
  matcher: ['/', '/(fr|en|ar)/:path*']
}
