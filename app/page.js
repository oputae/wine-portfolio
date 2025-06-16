// /app/page.js

import {client} from '@/lib/sanity';
import dynamic from 'next/dynamic';
import {Suspense} from 'react';

// Dynamically import the Map component to ensure it's client-side only
const Map = dynamic(() => import('./components/Map'), {
  ssr: false,
  loading: () => <p className="text-center">Loading map...</p>,
});

async function getWines() {
  const query = `*[_type == "wine"]{
    _id,
    name,
    winery,
    slug,
    coordinates
  }`;
  const wines = await client.fetch(query);
  return wines;
}

export default async function HomePage() {
  const wines = await getWines();

  return (
    <div className="relative h-[calc(100vh-12rem)]">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Wine Origins Map
      </h1>
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <Map wines={wines} />
      </Suspense>
    </div>
  );
}