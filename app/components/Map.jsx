'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

// Icon definition
const wineIcon = L.icon({
    iconUrl: '/bottle-icon.png',
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35],
    alt: 'Wine bottle location icon'
});

// A new, stable "controller" component to manage map interactions
function MapController({ markers, highlightSlug, markerRefs }) {
    const map = useMap();

    // This effect handles the initial zoom to fit all markers
    useEffect(() => {
        if (markers && markers.length > 0) {
            const bounds = L.latLngBounds(markers.map(marker => [marker.coordinates.lat, marker.coordinates.lng]));
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
        }
    }, [map, markers]);

    // This effect handles highlighting a single marker
    useEffect(() => {
        if (highlightSlug && markerRefs.current[highlightSlug]) {
            const marker = markerRefs.current[highlightSlug];
            // Use the official 'flyTo' method from the map instance
            map.flyTo(marker.getLatLng(), 10, { animate: true, duration: 1 });
            
            // Open the popup after the fly-to animation
            setTimeout(() => {
                marker.openPopup();
            }, 1000);
        }
    }, [map, highlightSlug, markerRefs]);

    return null; // This component renders nothing
}

export default function Map({ wines, highlightSlug }) {
    const token = process.env.NEXT_PUBLIC_JAWG_ACCESS_TOKEN;
    const markerRefs = useRef({});

    const markers = wines.filter((wine) => wine.coordinates);
    const defaultCenter = [20, 10];

    return (
        <div className="h-full w-full">
            <MapContainer
                center={defaultCenter}
                zoom={2}
                scrollWheelZoom={true}
                className="h-full w-full rounded-lg z-10"
            >
                <TileLayer
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={`https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${token}`}
                />

                {markers.map((wine) => (
                    <Marker
                        key={wine._id}
                        position={[wine.coordinates.lat, wine.coordinates.lng]}
                        icon={wineIcon}
                        ref={(el) => {
                            // Assign the marker instance to our refs object
                            if (el) {
                                markerRefs.current[wine.slug.current] = el;
                            }
                        }}
                    >
                        <Popup>
                            <div className="text-base font-bold">{wine.name}</div>
                            <div className="text-sm text-gray-300">{wine.winery}</div>
                            <Link href={`/wine/${wine.slug.current}`} className="popup-link mt-2 block">
                                View Details →
                            </Link>
                        </Popup>
                    </Marker>
                ))}

                {/* Add the controller as a child of the map */}
                <MapController markers={markers} highlightSlug={highlightSlug} markerRefs={markerRefs} />
            </MapContainer>
        </div>
    );
}