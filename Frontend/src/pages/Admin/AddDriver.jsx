import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import AdminNavbar from "../../Components/AdminNavbar";
import { ADMIN_API_ENDPOINT } from "../../utils/constant";
import { Navigate, useNavigate } from "react-router-dom";



const AddDriver = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        `${ADMIN_API_ENDPOINT}/driver`,
        form,
        { withCredentials: true }
      );

      toast.success("Driver added");

      setForm({ name: "", phone: "", password: "" });
      navigate('/admindashboard');

    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="container mt-5">
        <div className="card p-4 shadow">
          <h3>Add Driver</h3>

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Name"
              className="form-control mb-2"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              name="phone"
              placeholder="Phone"
              className="form-control mb-2"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              className="form-control mb-3"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Adding..." : "Add Driver"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddDriver;