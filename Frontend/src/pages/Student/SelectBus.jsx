import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { STUDENT_API_ENDPOINT } from "../../utils/constant";


const SelectBus = () => {
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const res = await axios.get(`${STUDENT_API_ENDPOINT}/buses`, {
        withCredentials: true,
      });

      setBuses(res.data.buses || []);
    } catch (err) {
      toast.error("Failed to load buses");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Select Your Bus</h3>

      <div className="mt-3">
        {buses.length > 0 ? (
          buses.map((bus) => (
            <button
              key={bus._id}
              className="btn btn-success m-2"
              onClick={() => navigate(`/track/${bus._id}`)}
            >
              {bus.busNumber}
            </button>
          ))
        ) : (
          <p>No buses available</p>
        )}
      </div>
    </div>
  );
};

export default SelectBus;