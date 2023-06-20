import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import RouteTitle from "../Components/RouteTitle/RouteTitle";
import Sidebar from "../Components/Sidebar/Sidebar";
import { AuthContext } from "../Provider/AuthProvider";

const DashboardLayout = () => {
  const { loading } = useContext(AuthContext);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="relative min-h-screen md:flex dark:bg-gray-900 dark:text-white">
      <RouteTitle title={"Dashboard"} />
      <Sidebar />
      <div className="flex-1  md:ml-64">
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
