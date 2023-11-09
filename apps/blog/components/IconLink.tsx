import { Icon } from '@iconify-icon/react'
import type { Route } from 'next'
import Link from 'next/link'
import { memo } from 'react'

export interface IconLinkProps {
  title: string
  href: Route<any> | URL
  name: string
  icon: string
  target?: string
}

export default memo(({ name, title, href, icon, target = '_self' }: IconLinkProps) => {
  return (
    <Link href={href} title={title} className="flex surface-sm hover:no-underline p-1 rounded md:px-3" target={target}>
      <p className='hidden md:inline-block m-0'>{name}</p>
      <Icon className='md:hidden' width={30} height={30} icon={icon} alt={name} name={name} />
    </Link>
  )
})
