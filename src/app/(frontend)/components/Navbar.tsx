import Link from 'next/link'
import Image from 'next/image'
import { fetchNavigation } from '../utils/fetchNavigation'

export default async function Navbar() {
  const nav = await fetchNavigation()

  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Ørvur Logo" width={50} height={50} />
        </Link>

        <div className="flex gap-6 font-medium mix-blend-difference">
          {nav?.navItems?.slice(1).map((item: any, i: number) => (
            <Link
              key={i}
              href={`/${item.page.slug === 'home' ? '' : item.page.slug}`}
              className="transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
