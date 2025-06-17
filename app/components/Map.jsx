// /app/components/Map.jsx
'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useRef } from 'react';

// Fix for default Leaflet icon issue
const icon = L.icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function Map({ wines, highlightSlug }) {
  const token = process.env.NEXT_PUBLIC_JAWG_ACCESS_TOKEN;
  // Create a place to store references to each marker
  const markerRefs = useRef({});

  useEffect(() => {
    // If there's a slug to highlight and the marker exists...
    if (highlightSlug && markerRefs.current[highlightSlug]) {
      // ...open its popup after a short delay to allow the map to load.
      setTimeout(() => {
        markerRefs.current[highlightSlug].openPopup();
      }, 500);
    }
  }, [highlightSlug]); // This effect runs when the highlightSlug changes

  const markers = wines.filter((wine) => wine.coordinates);
  const mapCenter =
    markers.length > 0
      ? [markers[0].coordinates.lat, markers[0].coordinates.lng]
      : [46.8182, 8.2275];

  return (
    <div className="h-full w-full">
      <MapContainer
        center={mapCenter}
        zoom={markers.length > 0 ? 5 : 2}
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
            icon={icon}
            // Assign a ref to this marker using its slug as the key
            ref={(el) => (markerRefs.current[wine.slug.current] = el)}
          >
            <Popup>
              <div className="text-base font-bold">{wine.name}</div>
              <div className="text-sm text-gray-300">{wine.winery}</div>
              <Link
                href={`/wine/${wine.slug.current}`}
                className="popup-link mt-2 block"
              >
                View Details →
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}