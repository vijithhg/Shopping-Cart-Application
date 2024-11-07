import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const AdminProtectedRoutes = ({ children }) => {
  const role = localStorage.getItem('role');

  if (!role) {
    toast.error('Please log in to access this page');
    return <Navigate to="/" />;
  }

  if (role !== 'admin') {
    toast.error('Admin access only');
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminProtectedRoutes;
