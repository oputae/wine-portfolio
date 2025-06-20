'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Search from './Search';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/collection', label: 'Collection' },
  { href: '/favorites', label: 'Favorites' },
  { href: '/archive', label: 'Archive' },
];

function NavLink({ href, label }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'bg-gray-700 text-white'
          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
      }`}
    >
      {label}
    </Link>
  );
}

export default function Header() {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4">
        {/* Main header container for logo and search */}
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-white whitespace-nowrap">
            🍷 Otto's Cellar
          </Link>
          <div className="w-full flex justify-end">
            <Search />
          </div>
        </div>
        {/* Navigation container, wraps on mobile */}
        <div className="flex items-center justify-center pb-2 md:pb-0">
          <nav className="flex items-center space-x-1 sm:space-x-2">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}