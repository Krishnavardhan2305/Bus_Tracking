import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SUPERADMIN_API_ENDPOINT } from "../../utils/constant";
import toast from "react-hot-toast";
const ViewAdmins = () => 
{
  const [searchParams] = useSearchParams();
  const collegeId = searchParams.get("collegeId");

  const [college, setCollege] = useState(null);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    if (collegeId) {
      fetchAdmins();
    }
  }, [collegeId]);

  const fetchAdmins = async () => {
    try {
      const res = await axios.get(
        `${SUPERADMIN_API_ENDPOINT}/admins/${collegeId}`,
        { withCredentials: true }
      );

      setCollege(res.data.college);
      setAdmins(res.data.admins);

    } catch (err) {
      toast.error("Failed to fetch admins");
    }
  }
  return (
    <div className="container mt-5">
  
      {college && (
        <div className="card p-3 mb-4 shadow-sm bg-light">
          <h5>College Details</h5>
          <p><strong>Name:</strong> {college.name}</p>
          <p><strong>Email:</strong> {college.email}</p>
          <p><strong>Code:</strong> {college.code}</p>
        </div>
      )}
      <div className="card p-3 shadow">
        <h4 className="mb-3">Admins</h4>
  
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
  
          <tbody>
            {admins.length > 0 ? (
              admins.map((admin, index) => (
                <tr key={admin._id}>
                  <td>{index + 1}</td>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No admins found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  
    </div>
  );
};

export default ViewAdmins;