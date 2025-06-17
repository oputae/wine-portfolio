'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Import the CSS files directly in this component
import 'leaflet/dist/leaflet.css';

// The crucial fix from our successful test:
// This stabilizes the default Leaflet icon behavior in Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Our custom wine bottle icon, which will now work correctly
const wineIcon = L.icon({
    iconUrl: '/bottle-icon.png',
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35],
    alt: 'Wine bottle location icon'
});

// Controller component to handle map interactions
function MapController({ markers, highlightSlug, markerRefs }) {
    const map = useMap();

    useEffect(() => {
        // If there is a slug to highlight, fly to it.
        if (highlightSlug && markerRefs.current[highlightSlug]) {
            const marker = markerRefs.current[highlightSlug];
            map.flyTo(marker.getLatLng(), 10, { animate: true, duration: 1 });
            setTimeout(() => {
                marker.openPopup();
            }, 1000);
        } 
        // Otherwise, if not highlighting, fit all markers in the view.
        else if (markers.length > 0) {
            const bounds = L.latLngBounds(markers.map(m => [m.coordinates.lat, m.coordinates.lng]));
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
        }
    }, [map, markers, highlightSlug, markerRefs]);

    return null;
}

// The final, all-in-one map component
export default function Map({ wines, highlightSlug }) {
    const markerRefs = useRef({});
    const markers = wines.filter((wine) => wine.coordinates);

    return (
        <MapContainer
            center={[20, 10]} // Default center, will be overridden by MapController
            zoom={2} // Default zoom, will be overridden by MapController
            scrollWheelZoom={true}
            className="h-full w-full rounded-lg z-10"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={`https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${process.env.NEXT_PUBLIC_JAWG_ACCESS_TOKEN}`}
            />
            {markers.map((wine) => (
                <Marker
                    key={wine._id}
                    position={[wine.coordinates.lat, wine.coordinates.lng]}
                    icon={wineIcon}
                    ref={(el) => { if (el) markerRefs.current[wine.slug.current] = el; }}
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
            <MapController markers={markers} highlightSlug={highlightSlug} markerRefs={markerRefs} />
        </MapContainer>
    );
}