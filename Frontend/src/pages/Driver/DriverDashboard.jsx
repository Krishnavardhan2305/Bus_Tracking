import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { DRIVER_API_ENDPOINT } from "../../utils/constant";
import { socket } from "../../socket";

const DriverDashboard = () => {
  const [bus, setBus] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [watchId, setWatchId] = useState(null);

  useEffect(() => {
    fetchDashboard();

    return () => {
      // cleanup GPS + socket listeners
      if (watchId) navigator.geolocation.clearWatch(watchId);
      socket.off();
    };
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(`${DRIVER_API_ENDPOINT}/dashboard`, {
        withCredentials: true,
      });
      setBus(res.data.bus);
    } catch (err) {
      toast.error("Failed to load dashboard");
    }
  };

  const startTracking = () => {
    if (!bus) return toast.error("No bus assigned");

    setTracking(true);

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        const data = {
          busId: bus._id,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        console.log("Sending:", data);
        socket.emit("send-location", data);
      },
      (err) => {
        console.log("GPS ERROR:", err);

        if (err.code === 1) toast.error("Permission denied");
        else if (err.code === 2) toast.error("Location unavailable");
        else if (err.code === 3) toast.error("Timeout");
      },
      {
        enableHighAccuracy: false,
        maximumAge: 10000,
        timeout: 20000,
      }
    );

    setWatchId(id);
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