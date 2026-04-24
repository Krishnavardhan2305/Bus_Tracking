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
import AddBus from "./pages/Admin/AddBus";
import AssignBus from "./pages/Admin/AssignBus";
import AddRoute from "./pages/Admin/AddRoute";
import StudentLogin from "./pages/Student/StudentLogin";
import SelectBus from "./pages/Student/SelectBus";
import TrackBus from "./pages/TrackBus";
import LiveMap from "./components/LiveMap";
import DriverLogin from "./pages/Driver/DriverLogin";
import DriverDashboard from "./pages/Driver/DriverDashboard";
import ViewBuses from "./pages/Admin/ViewBuses";
import UploadStudents from "./pages/Admin/UploadStudents";

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
          <Route path="/admin/add-bus" element={<AddBus/>}/>
          <Route path="/admin/add-route" element={<AddRoute/>}/>
          <Route path="/admin/assign-bus/:driverId" element={<AssignBus />} />
          <Route path="/admin/buses" element={<ViewBuses />} />          
          <Route path="/driverlogin" element={<DriverLogin/>} />      
          <Route path="/driver/dashboard" element={<DriverDashboard />} />      
          <Route path="/track/:busId" element={<LiveMap />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/select-bus" element={<SelectBus />} />
          <Route path="/track/:busId" element={<TrackBus />} />
          <Route path="/admin/upload-students" element={<UploadStudents />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;