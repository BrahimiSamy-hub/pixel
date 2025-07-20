import ReactGA from 'react-ga4'

// Initialize Google Analytics with your measurement ID
const GA_MEASUREMENT_ID = 'G-86F35330NS'

// Initialize GA4
export const initGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID, {
    debug: process.env.NODE_ENV === 'development',
    gaOptions: {
      siteSpeedSampleRate: 100,
    },
  })
}

// Track page views
export const logPageView = (path) => {
  ReactGA.send({ hitType: 'pageview', page: path })
}

// Track custom events
export const logEvent = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  })
}

// Track exceptions
export const logException = (description, fatal = false) => {
  ReactGA.exception({
    description: description,
    fatal: fatal,
  })
}

// Track user engagement
export const logUserEngagement = (engagementTimeMs) => {
  ReactGA.event({
    category: 'engagement',
    action: 'user_engagement',
    value: engagementTimeMs,
  })
}

// Track e-commerce events
export const logPurchase = (transactionId, value, currency = 'DZD') => {
  ReactGA.event({
    category: 'ecommerce',
    action: 'purchase',
    transaction_id: transactionId,
    value: value,
    currency: currency,
  })
}

// Track add to cart
export const logAddToCart = (itemId, itemName, value, currency = 'DZD') => {
  ReactGA.event({
    category: 'ecommerce',
    action: 'add_to_cart',
    item_id: itemId,
    item_name: itemName,
    value: value,
    currency: currency,
  })
}

// Track contact form submissions
export const logContactForm = (formType) => {
  ReactGA.event({
    category: 'contact',
    action: 'form_submit',
    label: formType,
  })
}

// Track service inquiries
export const logServiceInquiry = (serviceType) => {
  ReactGA.event({
    category: 'service',
    action: 'inquiry',
    label: serviceType,
  })
}
