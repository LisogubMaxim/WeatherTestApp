import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "leaflet";

import styles from "./map.module.scss";
import "leaflet/dist/leaflet.css";

const Map = ({ location, picture }) => {
  const customIcon = new Icon({
    iconUrl: picture.medium,
    iconSize: [50, 50],
    className: styles.marker,
  });

  return (
    <div>
      <MapContainer
        center={[location.coordinates.latitude, location.coordinates.longitude]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[location.coordinates.latitude, location.coordinates.longitude]} icon={customIcon}></Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
