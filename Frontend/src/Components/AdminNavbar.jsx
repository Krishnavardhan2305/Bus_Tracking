import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ADMIN_API_ENDPOINT } from "../utils/constant";

const AdminNavbar = () => {
  const navigate = useNavigate();

  // 🚪 Logout
  const handleLogout = async () => {
    try {
      await axios.get(
        `${ADMIN_API_ENDPOINT}/logout`,
        {
          withCredentials: true,
        }
      );

      toast.success("Logged out");

      navigate("/adminlogin");

    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-sm sticky-top"
      style={{
        background: "linear-gradient(90deg, #0f172a, #1e293b)",
      }}
    >

      <div className="container-fluid px-3">

        {/* 🔹 Brand */}
        <span
          className="navbar-brand fw-bold fs-4"
          style={{
            cursor: "pointer",
            letterSpacing: "0.5px",
            fontFamily: "'Poppins', sans-serif",
          }}
          onClick={() => navigate("/admindashboard")}
        >
          🚍 Admin Panel
        </span>

        {/* 🔹 Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 🔹 Nav Content */}
        <div
          className="collapse navbar-collapse"
          id="adminNavbar"
        >

          <div className="ms-auto d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">

            <button
              className="btn btn-success px-3"
              onClick={() => navigate("/admin/add-driver")}
            >
              Add Driver
            </button>

            <button
              className="btn btn-warning px-3"
              onClick={() => navigate("/admin/add-bus")}
            >
              Add Bus
            </button>

            <button
              className="btn btn-info text-white px-3"
              onClick={() => navigate("/admin/add-route")}
            >
              Add Route
            </button>

            <button
              className="btn btn-primary px-3"
              onClick={() => navigate("/admin/buses")}
            >
              View Buses
            </button>

            <button
              className="btn btn-secondary px-3"
              onClick={() => navigate("/admin/upload-students")}
            >
              Upload Students
            </button>

            <button
              className="btn btn-danger px-3"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;