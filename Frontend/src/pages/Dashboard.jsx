import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SUPERADMIN_API_ENDPOINT } from "../../utils/constant";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [colleges, setColleges] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const res = await axios.get(
        `${SUPERADMIN_API_ENDPOINT}/colleges`,
        { withCredentials: true }
      );

      setColleges(res.data.colleges || []);
    } catch (err) {
      toast.error("Failed to fetch colleges");
    }
  };

  const handleAddAdmin = (collegeId) => {
    navigate(`/create-admin?collegeId=${collegeId}`);
  };

  const viewAdmin = (collegeId) => {
    navigate(`/viewadmins?collegeId=${collegeId}`);
  };

  const handleLogout = async () => {
    try {
      await axios.get(
        `${SUPERADMIN_API_ENDPOINT}/logout`,
        { withCredentials: true }
      );

      toast.success("Logged out successfully 👋");

      navigate("/superadminlogin");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark px-4">
        <span className="navbar-brand">Super Admin Panel</span>

        <div>
          <Link to="/create-college" className="btn btn-success me-2">
            Add College
          </Link>

          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </nav>

      <div className="container mt-4">
        <h3 className="mb-4">Colleges</h3>

        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>College Name</th>
              <th>Email</th>
              <th>Code</th>
              <th>Actions</th> 
            </tr>
          </thead>

          <tbody>
            {colleges.length > 0 ? (
              colleges.map((college, index) => (
                <tr key={college._id}>
                  <td>{index + 1}</td>
                  <td>{college.name}</td>
                  <td>{college.email}</td>
                  <td>{college.code}</td>

                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleAddAdmin(college._id)}
                    >
                      Add Admin
                    </button>

                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => viewAdmin(college._id)}
                    >
                      View Admins
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No colleges available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;