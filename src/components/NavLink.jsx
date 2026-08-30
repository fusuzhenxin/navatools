'use client'

import NextLink from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLink({ to, href, end, className, children, ...props }) {
  const pathname = usePathname()
  const target = to || href || '/'
  const active = end ? pathname === target : target === '/' ? pathname === '/' : pathname === target || pathname.startsWith(`${target}/`)
  const resolved = typeof className === 'function' ? className({ isActive: active }) : className
  const content = typeof children === 'function' ? children({ isActive: active }) : children

  return (
    <NextLink href={target} className={resolved} {...props}>
      {content}
    </NextLink>
  )
}
