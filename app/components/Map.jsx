// /app/components/Map.jsx
'use client';

import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet icon issue with Webpack
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
export default function Map({wines}) {
  // Filter out wines that don't have coordinates
  const markers = wines.filter((wine) => wine.coordinates);

  // Set default center if no markers are available
  const mapCenter =
    markers.length > 0
      ? [markers[0].coordinates.lat, markers[0].coordinates.lng]
      : [46.8182, 8.2275]; // Default to Switzerland

  return (
    <MapContainer
      center={mapCenter}
      zoom={markers.length > 0 ? 5 : 2}
      scrollWheelZoom={true}
      className="h-full w-full rounded-lg z-10"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=YOUR_JAWG_ACCESS_TOKEN" // Replace with your Jawg or other tile provider token
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
              View Details &rarr;
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}