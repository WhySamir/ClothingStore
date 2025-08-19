"use client";
import { Icon, LatLngLiteral } from "leaflet";
import { useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  ZoomControl,
} from "react-leaflet";

type MapType = "roadmap" | "satellite" | "hybrid" | "terrain";

type MapLocation = LatLngLiteral & { id: string };
type MapProps = {
  center: LatLngLiteral;
  locations: MapLocation[];
};

const SelectedLocationFnc = ({ center }: { center: LatLngLiteral }) => {
  const map = useMap();
  map.panTo(center, { animate: true, duration: 1 });
  return null;
};

export const Map: React.FC<MapProps> = ({ center, locations }) => {
  const [mapType, setMapType] = useState<MapType>("roadmap");
  const [selectedLocation, setselectedLocation] = useState<
    MapLocation | undefined
  >();

  const getUrl = () => {
    const mapTypeUrls: Record<MapType, string> = {
      roadmap: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      satellite: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      hybrid: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      terrain: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    };
    return mapTypeUrls[mapType];
  };

  const mapMarkIcon = new Icon({
    iconUrl: "/locate.svg",
    iconSize: [54, 61],
  });
  const mapMarkActiveIcon = new Icon({
    iconUrl: "/locate.svg",
    iconSize: [55, 61],
  });

  const renderMarks = () => {
    return locations.map((location) => {
      return (
        <Marker
          key={location.id}
          icon={
            location.id === selectedLocation?.id
              ? mapMarkActiveIcon
              : mapMarkIcon
          }
          position={{ lat: location.lat, lng: location.lng }}
          eventHandlers={{ click: () => setselectedLocation(location) }}
        />
      );
    });
  };
  return (
    <>
      <div style={{ height: "400px", width: "100%", borderRadius: "12px" }}>
        <MapContainer
          center={center}
          zoom={12}
          minZoom={5}
          zoomControl={false}
          attributionControl={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          />
          {selectedLocation && <SelectedLocationFnc center={center} />}
          {renderMarks()}
          <ZoomControl position="topright" />
        </MapContainer>
        <div style={{ display: "flex", marginTop: "10px", gap: "20px" }}>
          <button onClick={() => setMapType("roadmap")}>Roadmap</button>
          <button onClick={() => setMapType("satellite")}>Satellite</button>
          <button onClick={() => setMapType("hybrid")}>Hybrid</button>
          <button onClick={() => setMapType("terrain")}>Terrain</button>
        </div>
      </div>
    </>
  );
};
