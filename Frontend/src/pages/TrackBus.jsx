import React from "react";
import { useParams } from "react-router-dom";
import LiveMap from "../components/LiveMap";

const TrackBus = () => {
  const { busId } = useParams();

  return (
    <div className="container mt-4">
      <h3>Tracking Bus</h3>
      <LiveMap busId={busId} />
    </div>
  );
};

export default TrackBus;