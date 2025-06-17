'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useState, useEffect } from 'react';

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

/**
 * A client component to render a Leaflet map.
 * @param {Array} wines - Array of wine objects with coordinates.
 */
export default function Map({ wines }) {
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get the token from the build environment
  const token = process.env.NEXT_PUBLIC_JAWG_ACCESS_TOKEN;
  
  if (!isClient) {
    return (
      <div className="h-full w-full bg-gray-800 flex items-center justify-center rounded-lg">
        <p>Initializing map...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full bg-gray-800 flex items-center justify-center rounded-lg">
        <div className="text-center text-red-400">
          <p>Map failed to load</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  try {
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
            >
              <Popup>
                <div className="text-base font-bold">{wine.name}</div>
                <div className="text-sm text-gray-300">{wine.winery}</div>
                <a
                  href={`/wine/${wine.slug.current}`}
                  className="popup-link mt-2 block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Details →
                </a>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    );
  } catch (err) {
    return (
      <div className="h-full w-full bg-gray-800 flex items-center justify-center rounded-lg">
        <div className="text-center text-red-400">
          <p>Map error: {err.message}</p>
        </div>
      </div>
    );
  }
}