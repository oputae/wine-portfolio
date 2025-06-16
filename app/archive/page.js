// /app/archive/page.js

import {client} from '@/lib/sanity';
import WineCard from '../components/WineCard';

async function getArchivedWines(filter = '') {
  let query;
  const params = {filter: `%${filter}%`};

  if (filter) {
    query = `*[_type == "wine" && status == "Consumed" && wineType match $filter] | order(name desc)`;
  } else {
    query = `*[_type == "wine" && status == "Consumed"] | order(name desc)`;
  }
  const wines = await client.fetch(query, params);
  return wines;
}

// Fetch available wine types for filtering
async function getWineTypes() {
  const query = `*[_type == "wine" && status == "Consumed"].wineType`;
  const types = await client.fetch(query);
  return [...new Set(types)].filter(Boolean).sort(); // Unique, non-null, sorted
}

export default async function ArchivePage({searchParams}) {
  const filter = searchParams.filter || '';
  const wines = await getArchivedWines(filter);
  const wineTypes = await getWineTypes();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Archive</h1>
      <p className="text-gray-400 mb-6">Wines that have been enjoyed.</p>

      {/* TODO: Add a client-side Filter component here */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wines.length > 0 ? (
          wines.map((wine) => <WineCard key={wine._id} wine={wine} />)
        ) : (
          <p>No wines in the archive.</p>
        )}
      </div>
    </div>
  );
}