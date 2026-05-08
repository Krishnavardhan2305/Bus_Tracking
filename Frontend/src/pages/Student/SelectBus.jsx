import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { STUDENT_API_ENDPOINT } from "../../utils/constant";

const SelectBus = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchBuses();
  }, []);

  // 🚍 Fetch buses
  const fetchBuses = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${STUDENT_API_ENDPOINT}/buses`,
        {
          withCredentials: true,
        }
      );

      setBuses(res.data.buses || []);

    } catch (err) {
      console.log(err);

      toast.error("Failed to load buses");

    } finally {
      setLoading(false);
    }
  };

  // 🚪 Logout
  const handleLogout = async () => {
    try {

      await axios.get(
        `${STUDENT_API_ENDPOINT}/logout`,
        {
          withCredentials: true,
        }
      );

      toast.success("Logged out");

      navigate("/studentlogin");

    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="bg-light min-vh-100">

      {/* 🔹 Navbar */}
      <nav className="navbar navbar-dark bg-dark px-3">

        <span className="navbar-brand fw-bold">
          🎓 Student Panel
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

        {/* Header */}
        <div className="text-center mb-5">

          <h2 className="fw-bold">
            🚍 Select Your Bus
          </h2>

          <p className="text-muted">
            Choose your bus to track live location
          </p>

        </div>

        {/* Loading */}
        {loading ? (

          <div className="text-center mt-5">

            <div
              className="spinner-border text-primary"
              role="status"
            >
              <span className="visually-hidden">
                Loading...
              </span>
            </div>

            <p className="mt-3">
              Loading buses...
            </p>

          </div>

        ) : buses.length > 0 ? (

          /* Bus Cards */
          <div className="row g-4">

            {buses.map((bus) => (

              <div
                className="col-lg-4 col-md-6"
                key={bus._id}
              >
                <div
                  className="card shadow border-0 h-100 rounded-4"
                  style={{
                    transition: "0.3s",
                  }}
                >

                  <div className="card-body d-flex flex-column p-4">

                    {/* Bus Number */}
                    <h3 className="text-primary fw-bold">
                      🚌 {bus.busNumber}
                    </h3>

                    <hr />

                    {/* Driver */}
                    <p className="mb-2">
                      <strong>Driver:</strong>{" "}
                      {bus.driverId?.name || "Not Assigned"}
                    </p>

                    {/* Route */}
                    <p className="mb-3">
                      <strong>Route:</strong>{" "}
                      {bus.routeId?.name || "No Route"}
                    </p>

                    {/* Stops */}
                    {bus.routeId?.stops?.length > 0 && (
                      <div className="mb-4">

                        <strong>Stops:</strong>

                        <ul className="list-group mt-2">

                          {bus.routeId.stops.map((stop, index) => (
                            <li
                              key={index}
                              className="list-group-item"
                            >
                              📍 {stop.name}
                            </li>
                          ))}

                        </ul>
                      </div>
                    )}

                    {/* Track Button */}
                    <button
                      className="btn btn-success mt-auto w-100"
                      onClick={() =>
                        navigate(`/track/${bus._id}`)
                      }
                    >
                      Track Bus Live 📍
                    </button>

                  </div>
                </div>
              </div>

            ))}

          </div>

        ) : (

          /* Empty State */
          <div className="text-center mt-5">

            <h5>No buses available</h5>

          </div>

        )}

      </div>
    </div>
  );
};

export default SelectBus;