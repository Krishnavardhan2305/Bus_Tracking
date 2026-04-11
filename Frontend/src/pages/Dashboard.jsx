import React from 'react'
import { Link } from 'react-router-dom';
const Dashboard = () => {
  return (
    <div>
      <div className="container mt-5">
        <h2 className="mb-4">Super Admin Dashboard</h2>

        <div className="d-flex gap-3">
          <Link to="/create-college" className="btn btn-success">
            Create College
          </Link>

          <Link to="/create-admin" className="btn btn-primary">
            Create Admin
          </Link>
        </div>
      </div>
      <div>
        
      </div>
    </div>
      
  );
}

export default Dashboard
