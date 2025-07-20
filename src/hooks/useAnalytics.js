import { useCallback } from 'react'
import {
  logEvent,
  logException,
  logUserEngagement,
  logPurchase,
  logAddToCart,
  logContactForm,
  logServiceInquiry,
} from '../utils/analytics'

export const useAnalytics = () => {
  const trackEvent = useCallback((category, action, label) => {
    logEvent(category, action, label)
  }, [])

  const trackError = useCallback((description, fatal = false) => {
    logException(description, fatal)
  }, [])

  const trackEngagement = useCallback((engagementTimeMs) => {
    logUserEngagement(engagementTimeMs)
  }, [])

  const trackPurchase = useCallback(
    (transactionId, value, currency = 'DZD') => {
      logPurchase(transactionId, value, currency)
    },
    []
  )

  const trackAddToCart = useCallback(
    (itemId, itemName, value, currency = 'DZD') => {
      logAddToCart(itemId, itemName, value, currency)
    },
    []
  )

  const trackContactForm = useCallback((formType) => {
    logContactForm(formType)
  }, [])

  const trackServiceInquiry = useCallback((serviceType) => {
    logServiceInquiry(serviceType)
  }, [])

  // Predefined tracking functions for common actions
  const trackButtonClick = useCallback(
    (buttonName, page) => {
      trackEvent('button_click', buttonName, page)
    },
    [trackEvent]
  )

  const trackNavigation = useCallback(
    (fromPage, toPage) => {
      trackEvent('navigation', 'page_change', `${fromPage} -> ${toPage}`)
    },
    [trackEvent]
  )

  const trackSocialMediaClick = useCallback(
    (platform) => {
      trackEvent('social_media', 'click', platform)
    },
    [trackEvent]
  )

  const trackPortfolioView = useCallback(
    (portfolioType) => {
      trackEvent('portfolio', 'view', portfolioType)
    },
    [trackEvent]
  )

  const trackPricingView = useCallback(
    (serviceType) => {
      trackEvent('pricing', 'view', serviceType)
    },
    [trackEvent]
  )

  return {
    trackEvent,
    trackError,
    trackEngagement,
    trackPurchase,
    trackAddToCart,
    trackContactForm,
    trackServiceInquiry,
    trackButtonClick,
    trackNavigation,
    trackSocialMediaClick,
    trackPortfolioView,
    trackPricingView,
  }
}
