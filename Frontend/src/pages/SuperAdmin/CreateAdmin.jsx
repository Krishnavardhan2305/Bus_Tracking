import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SUPERADMIN_API_ENDPOINT } from "../../utils/constant";
import toast from "react-hot-toast";
const CreateAdmin = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    collegeId: "",
  });
  const navigate=useNavigate();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const collegeId = searchParams.get("collegeId");

  useEffect(() => {
    if (collegeId) {
      fetchCollege();
    }
  }, [collegeId]);

  const fetchCollege = async () => {
    try {
      const res = await axios.get(
        `${SUPERADMIN_API_ENDPOINT}/college/${collegeId}`,
        { withCredentials: true }
      );

      setCollege(res.data.college);

      setForm((prev) => ({
        ...prev,
        collegeId: res.data.college._id,
      }));

    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        `${SUPERADMIN_API_ENDPOINT}/admin`,
        form,
        { withCredentials: true }
      );

      toast.success("Admin created successfully ");

      setForm({
        name: "",
        email: "",
        password: "",
        collegeId,
      });
      navigate('/dashboard')

    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h3>Create Admin</h3>
        {college && (
          <div className="mb-3 p-3 bg-light rounded">
            <strong>College:</strong> {college.name} <br />
            <strong>Email:</strong> {college.email} <br />
            <strong>Code:</strong> {college.code}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Admin Name"
            className="form-control mb-2"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Admin Email"
            className="form-control mb-2"
            value={form.email}
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
            {loading ? "Creating..." : "Create Admin"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAdmin;