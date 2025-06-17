// /app/page.js

import { client } from '@/lib/sanity';
import HomepageMap from './components/HomepageMap';
import { Suspense } from 'react'; // Make sure to import Suspense

// This data fetching happens on the server during the build
async function getWines() {
  const query = `*[_type == "wine" && defined(coordinates)]{
    _id,
    name,
    winery,
    slug,
    coordinates
  }`;
  const wines = await client.fetch(query);
  return wines;
}

// This is the main server component for the homepage
export default async function HomePage() {
  const wines = await getWines();

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Wine Origins Map
      </h1>
      <div className="flex-grow">
        {/*
          THE FIX: We must wrap any component that uses useSearchParams
          in a <Suspense> boundary.
        */}
        <Suspense fallback={<div className="text-center">Loading map...</div>}>
          <HomepageMap wines={wines} />
        </Suspense>
      </div>
    </div>
  );
}