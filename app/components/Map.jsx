'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// The stable icon fix for Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// The custom wine bottle icon
const wineIcon = L.icon({
    iconUrl: '/bottle-icon.png',
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35],
    alt: 'Wine bottle location icon'
});

// A robust controller that handles resizing and zooming
function MapController({ wines }) {
    const map = useMap();

    useEffect(() => {
        // Wait until there are wines to display
        if (!wines || wines.length === 0) return;

        // A short delay to ensure the container has resized
        const timer = setTimeout(() => {
            // 1. Force the map to re-check its size
            map.invalidateSize();
            // 2. Calculate the bounds and fit the markers
            const bounds = L.latLngBounds(wines.map(wine => [wine.coordinates.lat, wine.coordinates.lng]));
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
        }, 100);

        return () => clearTimeout(timer); // Cleanup timer

    }, [map, wines]);

    return null;
}

export default function Map({ wines }) {
    return (
        <MapContainer
            center={[20, 10]}
            zoom={2}
            scrollWheelZoom={true}
            className="h-full w-full rounded-lg z-10"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={`https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${process.env.NEXT_PUBLIC_JAWG_ACCESS_TOKEN}`}
            />
            {wines && wines.map((wine) => (
                <Marker
                    key={wine._id}
                    position={[wine.coordinates.lat, wine.coordinates.lng]}
                    icon={wineIcon}
                >
                    <Popup>
                        <div className="text-base font-bold">{wine.name}</div>
                        <div className="text-sm text-gray-300">{wine.winery}</div>
                        <a href={`/wine/${wine.slug.current}`} className="popup-link mt-2 block">
                            View Details →
                        </a>
                    </Popup>
                </Marker>
            ))}
            <MapController wines={wines} />
        </MapContainer>
    );
}