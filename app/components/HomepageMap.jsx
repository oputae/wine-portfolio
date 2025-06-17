// /app/components/HomepageMap.jsx
'use client'; 

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-800 flex items-center justify-center rounded-lg"><p>Loading map...</p></div>,
});

export default function HomepageMap({ wines }) {
  // Read URL search parameters
  const searchParams = useSearchParams();
  const highlightSlug = searchParams.get('highlight');

  return (
    <div className="relative h-full w-full">
       <Suspense fallback={<div className="text-center">Loading...</div>}>
        {/* Pass the slug to highlight down to the map component */}
        <Map wines={wines} highlightSlug={highlightSlug} />
      </Suspense>
    </div>
  );
}