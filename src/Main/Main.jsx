import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import FooterCompo from "../Components/Shared/Footer/Footer";
import NavBar from "../Components/Shared/Navbar/Navbar";
import { AuthContext } from "../Provider/AuthProvider";

const Main = () => {
  const { loading } = useContext(AuthContext);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <NavBar />

      <div className="details">
        <Outlet />
      </div>
      <FooterCompo />
    </div>
  );
};

export default Main;
