import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import LiveMap from "../components/LiveMap";

const TrackBus = () => {
  const { busId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container-fluid p-0">

      {/* 🔹 Header */}
      <div className="d-flex justify-content-between align-items-center bg-dark text-white px-4 py-3">
        <h5 className="m-0">Live Bus Tracking 🚍</h5>

        <button
          className="btn btn-light btn-sm"
          onClick={() => navigate("/admin/dashboard")}
        >
          ⬅ Back
        </button>
      </div>

      {/* 🔹 Map Section */}
      <div style={{ height: "90vh", width: "100%" }}>
        <LiveMap busId={busId} />
      </div>
    </div>
  );
};

export default TrackBus;