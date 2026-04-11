import axios from "axios";
import React, { useEffect, useState } from "react";
import { SUPERADMIN_API_ENDPOINT } from "../../utils/constant";

const CreateAdmin = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    collegeId: "",
  });

  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);

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
      console.error("Error fetching colleges:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.collegeId) {
      alert("Please select a college");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${SUPERADMIN_API_ENDPOINT}/admin`, 
        form,
        { withCredentials: true }
      );

      alert("Admin created successfully");

      setForm({
        name: "",
        email: "",
        password: "",
        collegeId: "",
      });

    } catch (err) {
      console.error("Error creating admin:", err);
      alert(err.response?.data?.message || "Error creating admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h3 className="mb-3">Create College Admin</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input
              name="name"
              placeholder="Name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <select
              name="collegeId"
              className="form-select"
              value={form.collegeId}
              onChange={handleChange}
              required
            >
              <option value="">Select College</option>

              {colleges.length > 0 ? (
                colleges.map((college) => (
                  <option key={college._id} value={college._id}>
                    {college.name} ({college.code})
                  </option>
                ))
              ) : (
                <option disabled>No colleges available</option>
              )}
            </select>
          </div>

          <button
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Admin"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAdmin;