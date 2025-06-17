import { client } from '@/lib/sanity';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Map with explicit loading fallback
const Map = dynamic(() => import('./components/Map'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center rounded-lg">
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                <p>Loading map...</p>
            </div>
        </div>
    )
});

async function getWines() {
    const query = `*[_type == "wine" && defined(coordinates)]{ _id, name, winery, slug, coordinates }`;
    const wines = await client.fetch(query);
    return wines;
}

export default async function HomePage({ searchParams }) {
    const wines = await getWines();

    return (
        <div className="h-[calc(100vh-12rem)] flex flex-col">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Wine Origins Map
            </h1>
            <div className="flex-grow">
                <Map wines={wines} />
            </div>
        </div>
    );
}