import { client } from '@/lib/sanity';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// We now dynamically import our single, all-in-one Map component
const Map = dynamic(() => import('./components/Map'), {
    ssr: false, // Ensure it only runs on the client
    loading: () => <div className="w-full h-full bg-gray-800 flex items-center justify-center rounded-lg"><p>Loading map...</p></div>
});

async function getWines() {
    const query = `*[_type == "wine" && defined(coordinates)]{ _id, name, winery, slug, coordinates }`;
    const wines = await client.fetch(query);
    return wines;
}

export default async function HomePage({ searchParams }) {
    const wines = await getWines();
    // We get the highlight slug here and pass it down
    const highlightSlug = searchParams.highlight || null;

    return (
        <div className="h-[calc(100vh-12rem)] flex flex-col">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Wine Origins Map
            </h1>
            <div className="flex-grow">
                <Suspense>
                    <Map wines={wines} highlightSlug={highlightSlug} />
                </Suspense>
            </div>
        </div>
    );
}