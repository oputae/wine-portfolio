// /app/search/page.js

import {client} from '@/lib/sanity';
import WineCard from '../components/WineCard';
import {Suspense} from 'react';

async function performSearch(keyword) {
  if (!keyword) return [];

  const query = `*[_type == "wine" && pt::text(name, winery, region, grapes, tastingNotes, personalStory) match $keyword]`;
  const params = {keyword: `${keyword}*`}; // Use wildcard for partial matches
  const wines = await client.fetch(query, params);
  return wines;
}

async function SearchResults({query}) {
  const wines = await performSearch(query);

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Search Results</h1>
      <p className="text-gray-400 mb-6">
        Found {wines.length} result{wines.length !== 1 ? 's' : ''} for "
        <span className="font-semibold text-white">{query}</span>"
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wines.length > 0 ? (
          wines.map((wine) => <WineCard key={wine._id} wine={wine} />)
        ) : (
          <p>No wines found matching your search.</p>
        )}
      </div>
    </>
  );
}

export default function SearchPage({searchParams}) {
  const {q} = searchParams;
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchResults query={q} />
    </Suspense>
  );
}