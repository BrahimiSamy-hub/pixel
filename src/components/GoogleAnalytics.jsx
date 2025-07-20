import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initGA, logPageView } from '../utils/analytics'

const GoogleAnalytics = () => {
  const location = useLocation()

  useEffect(() => {
    // Initialize Google Analytics on component mount
    initGA()
  }, [])

  useEffect(() => {
    // Track page views when location changes
    if (location.pathname) {
      logPageView(location.pathname + location.search)
    }
  }, [location])

  return null // This component doesn't render anything
}

export default GoogleAnalytics
