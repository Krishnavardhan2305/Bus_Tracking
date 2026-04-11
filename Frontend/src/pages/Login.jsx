import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SUPERADMIN_API_ENDPOINT } from '../../utils/constant';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await axios.post(`${SUPERADMIN_API_ENDPOINT}/login`, {
        email,
        password,
      }, { withCredentials: true });

      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Super Admin Login</h3>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login
