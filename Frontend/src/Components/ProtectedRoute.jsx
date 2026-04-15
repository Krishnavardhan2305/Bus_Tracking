import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { SUPERADMIN_API_ENDPOINT } from '../utils/constant';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await axios.get(
        `${SUPERADMIN_API_ENDPOINT}/me`,
        { withCredentials: true }
      );
      if (res.data.user.role === "superadmin") {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }

    } catch (err) {
      setAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!authorized) return <Navigate to="/superadminlogin" />;

  return children;
};

export default ProtectedRoute;