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

  return (
    <div className="container py-5">

      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">🚍 Select Your Bus</h2>
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
            <span className="visually-hidden">Loading...</span>
          </div>

          <p className="mt-3">Loading buses...</p>
        </div>
      ) : buses.length > 0 ? (

        /* Bus Cards */
        <div className="row g-4">
          {buses.map((bus) => (
            <div className="col-md-4" key={bus._id}>
              <div
                className="card shadow border-0 h-100"
                style={{
                  transition: "0.3s",
                  cursor: "pointer",
                }}
              >
                <div className="card-body d-flex flex-column">
                  <h4 className="card-title text-primary">
                    {bus.busNumber}
                  </h4>

                  <hr />

                  <p className="mb-2">
                    <strong>Driver:</strong>{" "}
                    {bus.driverId?.name || "Not Assigned"}
                  </p>

                  <p className="mb-3">
                    <strong>Route:</strong>{" "}
                    {bus.routeId?.name || "No Route"}
                  </p>

                  {/* Stops */}
                  {bus.routeId?.stops?.length > 0 && (
                    <div className="mb-3">
                      <strong>Stops:</strong>

                      <ul className="mt-2 ps-3">
                        {bus.routeId.stops.map((stop, index) => (
                          <li key={index}>{stop.name}</li>
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
  );
};

export default SelectBus;