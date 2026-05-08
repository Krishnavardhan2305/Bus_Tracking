import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AdminNavbar from "../../Components/AdminNavbar";
import { ADMIN_API_ENDPOINT } from "../../utils/constant";

const AdminDashboard = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDrivers();
  }, []);

  // 🚍 Fetch Drivers
  const fetchDrivers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${ADMIN_API_ENDPOINT}/drivers`,
        {
          withCredentials: true,
        }
      );

      setDrivers(res.data.drivers || []);

    } catch (err) {
      toast.error("Failed to fetch drivers");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="bg-light min-vh-100 py-4">

        <div className="container">

          {/* 🔹 Header */}
          <div className="mb-4">

            <h2
              className="fw-bold"
              style={{
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              🚍 Driver Management
            </h2>

            <p className="text-muted">
              Manage drivers and assign buses
            </p>

          </div>

          {/* 🔹 Loading */}
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
                Loading drivers...
              </p>

            </div>

          ) : (

            <div className="card shadow border-0 rounded-4">

              <div className="card-body p-0">

                {/* 🔹 Responsive Table */}
                <div className="table-responsive">

                  <table className="table table-hover align-middle mb-0">

                    <thead
                      className="text-white"
                      style={{
                        background:
                          "linear-gradient(90deg, #0f172a, #1e293b)",
                      }}
                    >
                      <tr>
                        <th className="py-3 px-3">#</th>
                        <th className="py-3">Driver</th>
                        <th className="py-3">Phone</th>
                        <th className="py-3">Assigned Bus</th>
                        <th className="py-3 text-center">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>

                      {drivers.length > 0 ? (

                        drivers.map((driver, index) => (

                          <tr key={driver._id}>

                            <td className="px-3 fw-semibold">
                              {index + 1}
                            </td>

                            <td>
                              <div className="fw-semibold">
                                {driver.name}
                              </div>
                            </td>

                            <td>
                              {driver.phone}
                            </td>

                            <td>

                              {driver.assignedBus?.busNumber ? (

                                <span className="badge bg-success px-3 py-2">
                                  {driver.assignedBus.busNumber}
                                </span>

                              ) : (

                                <span className="badge bg-secondary px-3 py-2">
                                  Not Assigned
                                </span>

                              )}

                            </td>

                            <td className="text-center">

                              <button
                                className="btn btn-primary btn-sm px-3"
                                onClick={() =>
                                  navigate(
                                    `/admin/assign-bus/${driver._id}`
                                  )
                                }
                              >
                                Assign Bus
                              </button>

                            </td>

                          </tr>

                        ))

                      ) : (

                        <tr>

                          <td
                            colSpan="5"
                            className="text-center py-5"
                          >
                            <h5 className="text-muted">
                              No drivers found
                            </h5>
                          </td>

                        </tr>

                      )}

                    </tbody>
                  </table>
                </div>

              </div>
            </div>

          )}

        </div>
      </div>
    </>
  );
};

export default AdminDashboard;