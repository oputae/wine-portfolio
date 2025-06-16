// /app/favorites/page.js

import {client} from '@/lib/sanity';
import WineCard from '../components/WineCard';

async function getFavoriteWines() {
  const query = `*[_type == "wine" && isFavorite == true] | order(name asc)`;
  const wines = await client.fetch(query);
  return wines;
}

export default async function FavoritesPage() {
  const wines = await getFavoriteWines();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Favorites</h1>
      <p className="text-gray-400 mb-6">
        A curated list of the most memorable and cherished wines.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wines.length > 0 ? (
          wines.map((wine) => <WineCard key={wine._id} wine={wine} />)
        ) : (
          <p>No favorite wines marked yet.</p>
        )}
      </div>
    </div>
  );
}