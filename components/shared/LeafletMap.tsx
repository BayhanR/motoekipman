'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icons in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface LeafletMapProps {
    lat?: number
    lng?: number
    zoom?: number
    popupText?: string
    className?: string
}

export default function LeafletMap({
    lat = 38.5747,
    lng = 27.4228,
    zoom = 15,
    popupText = "MİNA Giyim — İzmir Kemalpaşa",
    className = "h-full w-full min-h-[300px] z-0"
}: LeafletMapProps) {
    return (
        <div className={className}>
            <MapContainer center={[lat, lng]} zoom={zoom} scrollWheelZoom={false} className="h-full w-full rounded-md shadow-sm z-0">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, lng]}>
                    <Popup>{popupText}</Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}
