// /app/layout.js

import {Inter} from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Link from 'next/link';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

const inter = Inter({subsets: ['latin']});

export const metadata = {
  title: "Otto's Wine Collection",
  description: 'A personal digital wine portfolio.',
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-900 text-gray-100 min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="text-center py-4 text-gray-500 border-t border-gray-800">
          <Link href="/" className="hover:text-white">
            Otto’s Collection
          </Link>
        </footer>
      </body>
    </html>
  );
}