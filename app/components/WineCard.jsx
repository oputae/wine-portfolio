// /app/components/WineCard.jsx

import Link from 'next/link';
import Image from 'next/image';
import {client} from '@/lib/sanity';
import imageUrlBuilder from '@sanity/image-url';

// Helper to generate image URLs from Sanity image assets
const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

export default function WineCard({wine}) {
  return (
    <Link
      href={`/wine/${wine.slug.current}`}
      className="bg-gray-800 rounded-lg overflow-hidden group transition-transform transform hover:-translate-y-1 block"
    >
      <div className="relative w-full h-48">
        {wine.mainImage ? (
          <Image
            src={urlFor(wine.mainImage).width(400).height(480).url()}
            alt={`Bottle of ${wine.name}`}
            layout="fill"
            objectFit="cover"
            className="group-hover:opacity-90 transition-opacity"
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
        {wine.isFavorite && (
          <span className="absolute top-2 right-2 text-yellow-400">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-400">{wine.winery}</p>
        <h3 className="text-lg font-semibold text-white truncate">
          {wine.name}
        </h3>
        <div className="mt-2 flex justify-between items-center text-sm">
          <span className="bg-indigo-600/50 text-indigo-200 px-2 py-1 rounded-full">
            {wine.wineType}
          </span>
          <span className="text-gray-400">{wine.region}</span>
        </div>
      </div>
    </Link>
  );
}