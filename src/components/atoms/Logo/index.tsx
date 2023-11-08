import Image from 'next/image'
import bigstoreLogo from '@/assets/bigstore-logo.png'
import Link from 'next/link'
import { ClassNameProps } from '@/types/componentClassName'

export function Logo({ className }: ClassNameProps) {
  const logoClasses = `${className} shrink-0`

  return (
    <Link href={'/'} className={logoClasses}>
      <Image src={bigstoreLogo} alt="Bigstore" height={60} priority={true} />
    </Link>
  )
}
