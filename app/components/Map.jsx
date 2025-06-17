// /app/components/Map.jsx
'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

// Using the local icon from the 'public' folder
const wineIcon = L.icon({
  iconUrl: '/bottle-icon.png',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

function MapFitter({ markers }) {
  const map = useMap();

  useEffect(() => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map(marker => [marker.coordinates.lat, marker.coordinates.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [markers, map]);

  return null;
}

export default function Map({ wines, highlightSlug }) {
  const token = process.env.NEXT_PUBLIC_JAWG_ACCESS_TOKEN;
  const markerRefs = useRef({});

  useEffect(() => {
    if (highlightSlug && markerRefs.current[highlightSlug]) {
      setTimeout(() => {
        markerRefs.current[highlightSlug].openPopup();
      }, 500);
    }
  }, [highlightSlug]);

  const markers = wines.filter((wine) => wine.coordinates);
  const defaultCenter = [20, 0];

  return (
    <div className="h-full w-full">
      <MapContainer
        center={defaultCenter}
        zoom={2}
        scrollWheelZoom={true}
        className="h-full w-full rounded-lg z-10"
      >
        <MapFitter markers={markers} />
        
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${token}`}
        />
        {markers.map((wine) => (
          <Marker
            key={wine._id}
            position={[wine.coordinates.lat, wine.coordinates.lng]}
            icon={wineIcon}
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