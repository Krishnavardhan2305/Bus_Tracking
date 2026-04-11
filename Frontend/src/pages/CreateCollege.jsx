import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { SUPERADMIN_API_ENDPOINT } from '../../utils/constant';
const CreateCollege = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    code: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${SUPERADMIN_API_ENDPOINT}/college`,
        form,
        { withCredentials: true }
      );
      alert("College created successfully");
      setForm({ name: "", email: "", code: "" });
    } catch (err) {
      alert("Error creating college");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h3 className="mb-3">Create College</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">College Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">College Code</label>
            <input
              type="text"
              name="code"
              className="form-control"
              value={form.code}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Create College
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCollege
