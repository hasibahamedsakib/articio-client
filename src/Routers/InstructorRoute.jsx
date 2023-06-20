import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import useInstructor from "../Hooks/useInstractor";
import { AuthContext } from "../Provider/AuthProvider";

const InstructorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isInstructor, isLoading] = useInstructor();
  const location = useLocation();

  if (loading || isLoading) {
    return <Loader />;
  }

  if (user && isInstructor.instructor) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default InstructorRoute;
