"use client";
import { Icon, LatLngLiteral } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

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

  const [showGuide, setShowGuide] = useState(true);

  const getUrl = () => {
    const mapTypeUrls: Record<MapType, string> = {
      roadmap: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      satellite:
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      hybrid: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      terrain:
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    };
    return mapTypeUrls[mapType];
  };

  const ControlScrollWheel = ({ onZoom }: { onZoom: () => void }) => {
    const map = useMap();
    useEffect(() => {
      const handleWheel = (e: WheelEvent) => {
        if (e.ctrlKey) {
          e.preventDefault();
          map.scrollWheelZoom.enable();
          onZoom();
        } else {
          map.scrollWheelZoom.disable();
        }
      };

      map
        .getContainer()
        .addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        map.getContainer().removeEventListener("wheel", handleWheel);
      };
    }, [map, onZoom]);

    return null;
  };

  const ZoomGuideModal = ({ onClose }: { onClose: () => void }) => {
    return (
      <div className="absolute inset-0 bg-black/60 bg-opacity-60 flex items-center justify-center z-[400]">
        <div className="text-center text-white p-6 rounded-xl">
          <p className="text-lg">Hold Ctrl + Scroll to zoom in or out</p>
          {/* <button
            onClick={onClose}
            className="mt-3 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-sm"
          >
            Got it
          </button> */}
        </div>
      </div>
    );
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
      <div style={{ height: "450px", width: "100%", borderRadius: "12px" }}>
        <MapContainer
          center={center}
          zoom={12}
          minZoom={5}
          zoomControl={false}
          attributionControl={false}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%", outline: "none" }}
        >
          <ControlScrollWheel onZoom={() => setShowGuide(false)} />

          <TileLayer
            url={getUrl()}
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          />
          {selectedLocation && <SelectedLocationFnc center={center} />}

          {renderMarks()}
          {/* <ZoomControl position="topright" /> */}
          {showGuide && <ZoomGuideModal onClose={() => setShowGuide(false)} />}
        </MapContainer>

        {/* Fullscreen Modal Guide */}
      </div>
      <div style={{ display: "flex", marginTop: "10px", gap: "20px" }}>
        <button onClick={() => setMapType("roadmap")}>Roadmap</button>
        <button onClick={() => setMapType("satellite")}>Satellite</button>
        <button onClick={() => setMapType("hybrid")}>Hybrid</button>
        <button onClick={() => setMapType("terrain")}>Terrain</button>
      </div>{" "}
      {/* </div> */}
    </>
  );
};
