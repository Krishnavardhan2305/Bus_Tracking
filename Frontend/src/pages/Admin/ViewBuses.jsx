import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AdminNavbar from "../../Components/AdminNavbar";
import { ADMIN_API_ENDPOINT } from "../../utils/constant";

const ViewBuses = () => {
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const res = await axios.get(
        `${ADMIN_API_ENDPOINT}/buses`,
        { withCredentials: true }
      );

      setBuses(res.data.buses || []);
    } catch (err) {
      toast.error("Failed to fetch buses");
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="container mt-4">
        <h3 className="mb-3">All Buses</h3>

        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Bus Number</th>
              <th>Route</th>
              <th>Driver</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {buses.length > 0 ? (
              buses.map((bus, index) => (
                <tr key={bus._id}>
                  <td>{index + 1}</td>
                  <td>{bus.busNumber}</td>

                  <td>
                    {bus.routeId?.name || "No Route"}
                  </td>

                  <td>
                    {bus.driverId?.name || "Not Assigned"}
                  </td>

                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() =>
                        navigate(`/track/${bus._id}`)
                      }
                    >
                      Track
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No buses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewBuses;