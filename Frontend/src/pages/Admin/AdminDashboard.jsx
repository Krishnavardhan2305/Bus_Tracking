import axios from "axios";
import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AdminNavbar from "../../Components/AdminNavbar";
import { ADMIN_API_ENDPOINT } from "../../utils/constant";

const AdminDashboard = () => {
  const [drivers, setDrivers] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const res = await axios.get(
        `${ADMIN_API_ENDPOINT}/drivers`,
        { withCredentials: true }
      );

      setDrivers(res.data.drivers || []);

    } catch (err) {
      toast.error("Failed to fetch drivers");
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="container mt-4">
        <h3>Drivers</h3>

        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Bus</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {drivers.length > 0 ? (
              drivers.map((driver, index) => (
                <tr key={driver._id}>
                  <td>{index + 1}</td>
                  <td>{driver.name}</td>
                  <td>{driver.phone}</td>
                  <td>{driver.busId?.busNumber || "Not Assigned"}</td>

                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => navigate(`/admin/assign-bus/${driver._id}`)}
                    >
                      Assign Bus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No drivers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminDashboard;