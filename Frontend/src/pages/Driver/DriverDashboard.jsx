import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { DRIVER_API_ENDPOINT } from "../../utils/constant";


// 🔌 socket connection
const socket = io("http://localhost:8080");

const DriverDashboard = () => {
  const [bus, setBus] = useState(null);
  const [tracking, setTracking] = useState(false);

  useEffect(() => {
    fetchDashboard();

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchDashboard = async () => {
    try {
      console.log("Hi");
      const res = await axios.get(`${DRIVER_API_ENDPOINT}/dashboard`, {
        withCredentials: true,
      });

      setBus(res.data.bus);

    } catch (err) {
      toast.error("Failed to load dashboard");
    }
  };

  // 🚀 Start sending location
  const startTracking = () => {
    if (!bus) {
      return toast.error("No bus assigned");
    }

    setTracking(true);

    navigator.geolocation.watchPosition(
      (pos) => {
        const data = {
          busId: bus._id,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        socket.emit("send-location", data);
      },
      (err) => {
        toast.error("Location error");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );

    toast.success("Tracking started 📍");
  };

  return (
    <div className="container mt-5">
      <h3>Driver Dashboard</h3>

      {bus ? (
        <div className="card p-3 mt-3">
          <h5>Bus Number: {bus.busNumber}</h5>

          <h6 className="mt-2">Route:</h6>
          <ul>
            {bus.routeId?.stops?.map((stop, i) => (
              <li key={i}>{stop.name}</li>
            ))}
          </ul>

          <button
            className="btn btn-success mt-3"
            onClick={startTracking}
            disabled={tracking}
          >
            {tracking ? "Tracking..." : "Start Tracking"}
          </button>
        </div>
      ) : (
        <p>No bus assigned</p>
      )}
    </div>
  );
};

export default DriverDashboard;