import Link from 'next/link'
import { fetchNavigation } from '../utils/fetchNavigation'

export default async function Navbar() {
  const nav = await fetchNavigation()

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex gap-6">
        {nav?.navItems?.map((item: any, i: number) => (
          <Link 
            key={i} 
            href={`/${item.page.slug === 'home' ? '' : item.page.slug}`}
            className="hover:text-gray-300"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}