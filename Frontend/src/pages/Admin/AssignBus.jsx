import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminNavbar from "../../Components/AdminNavbar";
import { ADMIN_API_ENDPOINT } from "../../utils/constant";
import { useParams } from "react-router-dom";

const AssignBus = () => {

   const { driverId } = useParams(); 

  console.log(driverId);
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const res = await axios.get(
        `${ADMIN_API_ENDPOINT}/buses`,
        { withCredentials: true }
      );

      setBuses(res.data.buses);

    } catch (err) {
      toast.error("Failed to load buses");
    }
  };

  const handleAssign = async (busId) => {
  if (!driverId) {
    toast.error("Driver ID missing");
    return;
  }

  try {
    console.log("driverId:", driverId);

    await axios.put(
      `${ADMIN_API_ENDPOINT}/assign-driver`,
      {
        driverId,
        busId,
      },
      { withCredentials: true }
    );

    toast.success("Assigned successfully 🚍");
    fetchBuses();

  } catch (err) {
    toast.error(err.response?.data?.message || "Assignment failed");
  }
};

  return (
    <>
      <AdminNavbar />

      <div className="container mt-4">
        <h3>Assign Bus</h3>

        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Bus Number</th>
              <th>Assigned Driver</th>
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
                    {bus.driverId
                      ? bus.driverId.name
                      : "Not Assigned"}
                  </td>

                  <td>
                    {!bus.driverId ? (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleAssign(bus._id)}
                      >
                        Assign
                      </button>
                    ) : (
                      <span className="text-muted">
                        Already Assigned
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
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

export default AssignBus;