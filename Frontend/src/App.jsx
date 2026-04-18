import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from "react-hot-toast";

import Login from "./pages/SuperAdmin/Login"
import Dashboard from "./pages/SuperAdmin/Dashboard"
import CreateCollege from "./pages/SuperAdmin/CreateCollege"
import CreateAdmin from "./pages/SuperAdmin/CreateAdmin"
import ViewColleges from "./pages/SuperAdmin/ViewColleges"
import ViewAdmins from "./pages/SuperAdmin/ViewAdmins"
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminLogin from "./pages/Admin/AdminLogin";
import AddDriver from "./pages/Admin/AddDriver";
import AssignBus from "./pages/Admin/AssignBus";

const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/superadminlogin" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-college"
            element={
              <ProtectedRoute>
                <CreateCollege />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-admin"
            element={
              <ProtectedRoute>
                <CreateAdmin />
              </ProtectedRoute>
            }
          />
          <Route path="/colleges" element={<ViewColleges />} />
          <Route path="/viewadmins" element={<ViewAdmins />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/admin/add-driver" element={<AddDriver />} />
          <Route path="/admin/assign-bus" element={<AssignBus />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;