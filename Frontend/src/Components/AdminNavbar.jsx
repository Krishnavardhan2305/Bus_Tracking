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

      navigate("/admin/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand">Admin Panel</span>

      <div>
        <button
          className="btn btn-success me-2"
          onClick={() => navigate("/admin/add-driver")}
        >
          Add Driver
        </button>

        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;