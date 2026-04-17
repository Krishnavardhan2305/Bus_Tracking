import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminNavbar from "../../Components/AdminNavbar";
import { ADMIN_API_ENDPOINT } from "../../utils/constant";



const AddBus = () => {
  const [busNumber, setBusNumber] = useState("");
  const [routes, setRoutes] = useState([]);
  const [routeId, setRouteId] = useState("");

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    const res = await axios.get(`${ADMIN_API_ENDPOINT}/routes`, {
      withCredentials: true,
    });
    setRoutes(res.data.routes);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${ADMIN_API_ENDPOINT}/bus`,
        { busNumber, routeId },
        { withCredentials: true }
      );

      toast.success("Bus created");

    } catch (err) {
      toast.error("Error creating bus");
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="container mt-5">
        <h3>Add Bus</h3>

        <input
          placeholder="Bus Number"
          className="form-control mb-3"
          onChange={(e) => setBusNumber(e.target.value)}
        />

        <select
          className="form-select mb-3"
          onChange={(e) => setRouteId(e.target.value)}
        >
          <option>Select Route</option>
          {routes.map((r) => (
            <option key={r._id} value={r._id}>
              {r.name}
            </option>
          ))}
        </select>

        <button className="btn btn-primary" onClick={handleSubmit}>
          Create Bus
        </button>
      </div>
    </>
  );
};

export default AddBus;