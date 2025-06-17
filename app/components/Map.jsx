'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

const wineIcon = L.icon({
  iconUrl: '/bottle-icon.png',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
  alt: 'Wine bottle location icon'
});

export default function Map({ wines, highlightSlug }) {
  const token = process.env.NEXT_PUBLIC_JAWG_ACCESS_TOKEN;
  const markerRefs = useRef({});

  useEffect(() => {
    if (highlightSlug && markerRefs.current[highlightSlug]) {
      setTimeout(() => {
        // We also need to get the map instance from the ref to fly to the location
        const map = markerRefs.current[highlightSlug]._map;
        if(map) {
          map.flyTo(markerRefs.current[highlightSlug].getLatLng(), 10); // zoom level 10
        }
        markerRefs.current[highlightSlug].openPopup();
      }, 500);
    }
  }, [highlightSlug]);

  const markers = wines.filter((wine) => wine.coordinates);
  // Default center of the map, slightly north of the equator
  const defaultCenter = [20, 10]; 

  return (
    <div className="h-full w-full">
      <MapContainer
        center={defaultCenter}
        zoom={2} // A hardcoded zoom level of 2 will show most of the world
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