import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateCollege from "./pages/CreateCollege";
import CreateAdmin from "./pages/CreateAdmin";
import ViewColleges from "./pages/ViewColleges";
import ViewAdmins from "./pages/ViewAdmins";
import ProtectedRoute from "./Components/ProtectedRoute";

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
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;