import {createNavigation} from 'next-intl/navigation'

export const locales = ['fr', 'en', 'ar']

export const {Link, redirect, usePathname, useRouter} =
  createNavigation({locales})
