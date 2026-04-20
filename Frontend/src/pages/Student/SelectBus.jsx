import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SelectBus = () => {
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    const res = await axios.get("", {
      withCredentials: true,
    });

    setBuses(res.data.buses);
  };

  return (
    <div className="container mt-5">
      <h3>Select Bus</h3>

      {buses.map((bus) => (
        <button
          key={bus._id}
          className="btn btn-primary m-2"
          onClick={() => navigate(`/track/${bus._id}`)}
        >
          {bus.busNumber}
        </button>
      ))}
    </div>
  );
};

export default SelectBus;