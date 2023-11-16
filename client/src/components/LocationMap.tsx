import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const LocationMap = () => {
  return (
    <div className="h-80">
      <MapContainer
        style={{ height: '100%', width: '100%' }}
        center={[25.261, 55.315]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
        />
        <Marker position={[25.261, 55.315]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default LocationMap
