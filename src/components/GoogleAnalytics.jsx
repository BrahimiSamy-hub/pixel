"use client"
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { initGA, logPageView } from '@/utils/analytics'

const GoogleAnalytics = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Initialize Google Analytics on component mount
    initGA()
  }, [])

  useEffect(() => {
    // Track page views when pathname or searchParams changes
    const url = pathname + searchParams.toString()
    logPageView(url)
  }, [pathname, searchParams])

  return null // This component doesn't render anything
}

export default GoogleAnalytics
