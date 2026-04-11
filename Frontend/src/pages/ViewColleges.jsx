import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import { SUPERADMIN_API_ENDPOINT } from '../../utils/constant';
const ViewColleges = () => {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const res = await axios.get(
        "${SUPERADMIN_API_ENDPOINT}/colleges",
        { withCredentials: true }
      );
      setColleges(res.data.colleges);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">All Colleges</h3>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Code</th>
            <th>ID</th>
          </tr>
        </thead>

        <tbody>
          {colleges.map((college, index) => (
            <tr key={college._id}>
              <td>{index + 1}</td>
              <td>{college.name}</td>
              <td>{college.email}</td>
              <td>{college.code}</td>
              <td style={{ fontSize: "12px" }}>{college._id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ViewColleges
