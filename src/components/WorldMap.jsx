import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Sample Data
const rawData = [
  { id: 1, region: "US", data: 290 },
  { id: 2, region: "US", data: 490 },
  { id: 3, region: "AT", data: 790 },
  { id: 4, region: "SE", data: 590 },
  { id: 5, region: "AT", data: 290 },
  { id: 6, region: "SE", data: 390 },
];

// Coordinates for Regions
const coordinates = {
  US: { lat: 37.0902, lng: -95.7129 },
  AT: { lat: 47.5162, lng: 14.5501 },
  SE: { lat: 60.1282, lng: 18.6435 },
};

// Aggregate Data by Region
const aggregatedData = rawData.reduce((acc, curr) => {
  if (!acc[curr.region]) {
    acc[curr.region] = { region: curr.region, data: 0 };
  }
  acc[curr.region].data += curr.data;
  return acc;
}, {});

const aggregatedArray = Object.values(aggregatedData);

// Color Coding for Data
const getColor = (data) => {
  if (data > 600) return "red";
  if (data > 400) return "orange";
  return "blue";
};

// React Component
const WorldMap = () => {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={1.2}
      style={{ height: "90vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {aggregatedArray.map((item, index) => (
        <CircleMarker
          key={index}
          center={[coordinates[item.region].lat, coordinates[item.region].lng]}
          radius={Math.sqrt(Math.sqrt(item.data))}
          color={getColor(item.data)}
          fillOpacity={0.5}
        >
          <Popup>
            <small>Region:</small> {item.region} <br />
            <small>Usage:</small> {item.data} GB
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default WorldMap;
