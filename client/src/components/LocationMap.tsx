import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { LocationCoordinatesType } from '../types/Auth'

interface LocationMapPropsType {
  locationCoordinates: LocationCoordinatesType
  location: string
}

const LocationMap: React.FC<LocationMapPropsType> = ({
  locationCoordinates,
  location,
}) => {
  const { latitude, longitude } = locationCoordinates
  return (
    <div className="h-80">
      <MapContainer
        style={{ height: '100%', width: '100%' }}
        center={[latitude.coordinate, longitude.coordinate]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude.coordinate, longitude.coordinate]}>
          <Popup>{location}</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default LocationMap
