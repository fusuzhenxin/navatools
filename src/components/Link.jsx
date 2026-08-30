import NextLink from 'next/link'

export default function Link({ to, href, children, ...props }) {
  return (
    <NextLink href={to || href || '/'} {...props}>
      {children}
    </NextLink>
  )
}
