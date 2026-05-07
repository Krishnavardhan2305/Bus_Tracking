import React, { useEffect, useState } from "react";
import { socket } from "../socket";
import { useParams } from "react-router-dom"; // ✅ IMPORTANT
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// 🔁 Auto recenter
const RecenterMap = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position);
    }
  }, [position, map]);

  return null;
};

const   LiveMap = () => {
  const { busId } = useParams(); 
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const handler = (data) => {
      console.log("Received:", data, "URL bus:", busId);

      if (String(data.busId) === String(busId)) {
        setPosition([data.lat, data.lng]);
      }
    };

    socket.on("receive-location", handler);

    return () => {
      socket.off("receive-location", handler);
    };
  }, [busId]);

  // ⛔ wait until first GPS comes
  if (!position) {
    return (
      <div className="text-center mt-5">
        <h4>Waiting for live location... 📍</h4>
      </div>
    );
  }

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={position}>
          <Popup>Bus Live Location 🚍</Popup>
        </Marker>

        <RecenterMap position={position} />
      </MapContainer>
    </div>
  );
};

export default LiveMap;