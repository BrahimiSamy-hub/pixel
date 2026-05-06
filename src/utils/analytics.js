import { sendGAEvent } from '@next/third-parties/google'

// Initialize Google Analytics with your measurement ID
export const GA_MEASUREMENT_ID = 'G-86F35330NS'

// Note: Initialization is handled by the <GoogleAnalytics /> component in layout.jsx
export const initGA = () => {
  // No-op, handled by @next/third-parties
}

// Track page views
export const logPageView = (path) => {
  sendGAEvent('page_view', { page_path: path })
}

// Track custom events
export const logEvent = (category, action, label) => {
  sendGAEvent('event', {
    event_category: category,
    event_action: action,
    event_label: label,
  })
}

// Track exceptions
export const logException = (description, fatal = false) => {
  sendGAEvent('exception', {
    description: description,
    fatal: fatal,
  })
}

// Track user engagement
export const logUserEngagement = (engagementTimeMs) => {
  sendGAEvent('event', {
    event_category: 'engagement',
    event_action: 'user_engagement',
    value: engagementTimeMs,
  })
}

// Track e-commerce events
export const logPurchase = (transactionId, value, currency = 'DZD') => {
  sendGAEvent('purchase', {
    transaction_id: transactionId,
    value: value,
    currency: currency,
  })
}

// Track add to cart
export const logAddToCart = (itemId, itemName, value, currency = 'DZD') => {
  sendGAEvent('add_to_cart', {
    item_id: itemId,
    item_name: itemName,
    value: value,
    currency: currency,
  })
}

// Track contact form submissions
export const logContactForm = (formType) => {
  sendGAEvent('event', {
    event_category: 'contact',
    event_action: 'form_submit',
    event_label: formType,
  })
}

// Track service inquiries
export const logServiceInquiry = (serviceType) => {
  sendGAEvent('event', {
    event_category: 'service',
    event_action: 'inquiry',
    event_label: serviceType,
  })
}
