import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

export function Container({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('mx-auto w-full max-w-[1360px] px-4 sm:px-10', className)} {...props} />
}
