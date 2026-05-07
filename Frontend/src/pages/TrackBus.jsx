import React from "react";
import { useNavigate } from "react-router-dom";
import LiveMap from "../components/LiveMap";

const TrackBus = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid p-0">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center bg-dark text-white px-4 py-3">
        <h5 className="m-0">Live Bus Tracking 🚍</h5>

        <button
          className="btn btn-light btn-sm"
          onClick={() => navigate(-1)}
        >
          ⬅ Back
        </button>
      </div>

      {/* Map */}
      <div style={{ height: "90vh", width: "100%" }}>
        <LiveMap />
      </div>
    </div>
  );
};

export default TrackBus;