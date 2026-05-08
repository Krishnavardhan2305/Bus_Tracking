import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { DRIVER_API_ENDPOINT } from "../../utils/constant";
import { socket } from "../../socket";

const DriverDashboard = () => {
  const [bus, setBus] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [watchId, setWatchId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboard();

    return () => {
      // cleanup GPS watcher
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  // 🚍 Fetch assigned bus
  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        `${DRIVER_API_ENDPOINT}/dashboard`,
        {
          withCredentials: true,
        }
      );

      setBus(res.data.bus);

    } catch (err) {
      toast.error("Failed to load dashboard");
    }
  };

  // ▶ Start Tracking
  const startTracking = () => {
    if (!bus) {
      return toast.error("No bus assigned");
    }

    if (tracking) return;

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
        console.log(err);

        if (err.code === 1) {
          toast.error("Location permission denied");
        } else if (err.code === 2) {
          toast.error("Location unavailable");
        } else if (err.code === 3) {
          toast.error("Location timeout");
        }

        setTracking(false);
      },

      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 15000,
      }
    );

    setWatchId(id);

    toast.success("Tracking started 📍");
  };

  // ⏹ Stop Tracking
  const stopTracking = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
    }

    setTracking(false);
    setWatchId(null);

    toast.success("Tracking stopped");
  };

  // 🚪 Logout
  const handleLogout = async () => {
    try {
      await axios.get(
        `${DRIVER_API_ENDPOINT}/logout`,
        {
          withCredentials: true,
        }
      );

      toast.success("Logged out");

      navigate("/driverlogin");

    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="bg-light min-vh-100">

      {/* 🔹 Navbar */}
      <nav className="navbar navbar-dark bg-dark px-3">
        <span className="navbar-brand fw-bold">
          🚍 Driver Panel
        </span>

        <button
          className="btn btn-danger btn-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      {/* 🔹 Main Content */}
      <div className="container py-5">

        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-9">

            <div className="card shadow border-0 rounded-4">

              <div className="card-body p-4">

                <h2 className="fw-bold text-center mb-4">
                  Driver Dashboard
                </h2>

                {bus ? (
                  <>
                    {/* Bus Info */}
                    <div className="mb-4">

                      <h4 className="text-primary fw-bold">
                        🚌 Bus Number: {bus.busNumber}
                      </h4>

                      <p className="mt-3 mb-1 fw-semibold">
                        Route:
                      </p>

                      {bus.routeId?.stops?.length > 0 ? (
                        <ul className="list-group">
                          {bus.routeId.stops.map((stop, index) => (
                            <li
                              key={index}
                              className="list-group-item"
                            >
                              📍 {stop.name}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted">
                          No route assigned
                        </p>
                      )}
                    </div>

                    {/* Status */}
                    <div className="mb-4 text-center">

                      {tracking ? (
                        <div className="alert alert-success">
                          🔴 Live Tracking Active
                        </div>
                      ) : (
                        <div className="alert alert-secondary">
                          🟢 Ready to Start Tracking
                        </div>
                      )}

                    </div>

                    {/* Buttons */}
                    <div className="d-grid gap-3">

                      {!tracking ? (
                        <button
                          className="btn btn-success btn-lg"
                          onClick={startTracking}
                        >
                          Start Tracking 📍
                        </button>
                      ) : (
                        <button
                          className="btn btn-danger btn-lg"
                          onClick={stopTracking}
                        >
                          Stop Tracking ⏹
                        </button>
                      )}

                    </div>
                  </>
                ) : (
                  <div className="text-center py-5">

                    <h5 className="text-muted">
                      No bus assigned
                    </h5>

                  </div>
                )}

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default DriverDashboard;