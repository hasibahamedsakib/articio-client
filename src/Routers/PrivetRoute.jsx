import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import useAdmin from "../Hooks/useAdmin";
import useInstructor from "../Hooks/useInstractor";
import { AuthContext } from "../Provider/AuthProvider";

const PrivetRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const [isAdmin, isLoading] = useAdmin();
  const [isInstructor] = useInstructor();
  if (loading || isLoading) {
    return <Loader />;
  }

  if (user && !isAdmin.admin && !isInstructor.instructor) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivetRoute;
