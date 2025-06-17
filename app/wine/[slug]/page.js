// /app/wine/[slug]/page.js

import {client} from '@/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

async function getWine(slug) {
  const query = `*[_type == "wine" && slug.current == $slug][0]`;
  const wine = await client.fetch(query, {slug});
  return wine;
}

export default async function WinePage({params}) {
  const wine = await getWine(params.slug);

  if (!wine) {
    return <div>Wine not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Navigation Links */}
      <div className="flex justify-between items-center mb-6">
        <Link
          href="/collection"
          className="text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          ← Back to Collection
        </Link>
        {/* === THIS LINK HAS BEEN CHANGED === */}
        {wine.coordinates && (
          <Link
            href={`/?highlight=${wine.slug.current}`}
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            View on Map →
          </Link>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Image */}
        <div className="md:col-span-1">
          {wine.mainImage ? (
            <Image
              src={urlFor(wine.mainImage).width(600).url()}
              alt={`Bottle of ${wine.name}`}
              width={600}
              height={800}
              className="rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-full h-96 bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
        </div>

        {/* Right Column: Details */}
        <div className="md:col-span-2">
          <p className="text-lg text-gray-400">{wine.winery}</p>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            {wine.name}
          </h1>

          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div className="bg-gray-800 p-3 rounded-lg">
              <strong>Type:</strong> {wine.wineType || 'N/A'}
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <strong>Region:</strong> {wine.region || 'N/A'}
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <strong>Grapes:</strong> {wine.grapes || 'N/A'}
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <strong>Status:</strong> {wine.status}
            </div>
          </div>

          {wine.tastingNotes && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Tasting Notes</h2>
              <p className="text-gray-300 whitespace-pre-wrap">
                {wine.tastingNotes}
              </p>
            </div>
          )}

          {wine.personalStory && (
            <div>
              <h2 className="text-xl font-bold mb-2">Personal Story</h2>
              <p className="text-gray-300 whitespace-pre-wrap">
                {wine.personalStory}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}