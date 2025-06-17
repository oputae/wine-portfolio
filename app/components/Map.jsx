// /app/components/Map.jsx
'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

// ===== CHANGE #1: Using a wine bottle icon =====
const wineIcon = L.icon({
  iconUrl: 'https://i.imgur.com/L4zK12s.png', // A simple, free wine bottle icon
  iconSize: [35, 35], // The size of the icon
  iconAnchor: [17, 35], // The point of the icon which will correspond to marker's location
  popupAnchor: [0, -35], // The point from which the popup should open relative to the iconAnchor
});


// ===== CHANGE #2: This new component will automatically zoom the map =====
function MapFitter({ markers }) {
  const map = useMap(); // Get access to the map instance

  useEffect(() => {
    if (markers.length > 0) {
      // Create a 'bounds' object that contains all marker locations
      const bounds = L.latLngBounds(markers.map(marker => [marker.coordinates.lat, marker.coordinates.lng]));
      // Tell the map to fit itself to those bounds
      map.fitBounds(bounds, { padding: [50, 50] }); // Add some padding so icons aren't on the very edge
    }
  }, [markers, map]); // Rerun this effect if the markers or map change

  return null; // This component doesn't render anything itself
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

  // We no longer need to calculate the center here, MapFitter will do it.
  const defaultCenter = [20, 0]; // A default center for when there are no markers.

  return (
    <div className="h-full w-full">
      <MapContainer
        center={defaultCenter}
        zoom={2} // Default zoom, will be overridden by MapFitter
        scrollWheelZoom={true}
        className="h-full w-full rounded-lg z-10"
      >
        <MapFitter markers={markers} /> {/* Add the auto-zoomer component here */}
        
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${token}`}
        />
        {markers.map((wine) => (
          <Marker
            key={wine._id}
            position={[wine.coordinates.lat, wine.coordinates.lng]}
            icon={wineIcon} // Use our new wine bottle icon
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