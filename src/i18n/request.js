import { getRequestConfig } from 'next-intl/server'

const locales = ['fr', 'en', 'ar'];

export default getRequestConfig(async ({ requestLocale }) => {
  // In next-intl v3.x+, the property is called requestLocale
  // and it can be a promise in Next.js 15+
  let locale = await requestLocale;
  
  // Validate the locale or fallback
  if (!locale || !locales.includes(locale)) {
    locale = 'fr';
  }
  
  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default
  };
});
