import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminNavbar from "../../Components/AdminNavbar";
import { ADMIN_API_ENDPOINT } from "../../utils/constant";

const UploadStudents = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      return toast.error("Please select a file");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        `${ADMIN_API_ENDPOINT}/upload-students`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(
        `Uploaded: ${res.data.created}, Skipped: ${res.data.skipped}`
      );

      setFile(null);

    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="container mt-5">
        <div className="card p-4 shadow">
          <h3 className="mb-3">Upload Students (Excel)</h3>

          <input
            type="file"
            accept=".xlsx, .xls"
            className="form-control mb-3"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            className="btn btn-primary w-100"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>

          <div className="mt-3">
            <small>
              Excel format: <b>rollNo, password</b>
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadStudents;