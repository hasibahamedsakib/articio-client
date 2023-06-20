import axios from "axios";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const axiosSecure = axios.create({
  baseURL: "https://articio-server.vercel.app",
});
const useAxiosSecure = () => {
  const { userLogOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Berar ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await userLogOut();
          navigate("/login", { state: { from: location } });
        }
        return Promise.reject(error);
      }
    );
  }, [userLogOut, navigate, location]);

  return [axiosSecure];
};

export default useAxiosSecure;
