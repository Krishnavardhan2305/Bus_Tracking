import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ADMIN_API_ENDPOINT } from "../utils/constant";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${ADMIN_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });

      toast.success("Logged out");
      navigate("/adminlogin");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      {/* 🔹 Brand */}
      <span
        className="navbar-brand fw-bold cursor-pointer"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/admindashboard")}
      >
        🚍 Admin Panel
      </span>

      {/* 🔹 Toggle for mobile */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#adminNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* 🔹 Navbar content */}
      <div className="collapse navbar-collapse" id="adminNavbar">
        <div className="ms-auto d-flex flex-wrap gap-2 mt-3 mt-lg-0">

          <button
            className="btn btn-success btn-sm"
            onClick={() => navigate("/admin/add-driver")}
          >
            Add Driver
          </button>

          <button
            className="btn btn-warning btn-sm"
            onClick={() => navigate("/admin/add-bus")}
          >
            Add Bus
          </button>

          <button
            className="btn btn-info btn-sm"
            onClick={() => navigate("/admin/add-route")}
          >
            Add Route
          </button>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate("/admin/buses")}
          >
            View Buses
          </button>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigate("/admin/upload-students")}
          >
            Upload Students
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;