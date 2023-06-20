import { useContext, useEffect, useState } from "react";
import { BiLogOutCircle, BiSun } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import useGetRole from "../../../Hooks/useGetRole";
import { AuthContext } from "../../../Provider/AuthProvider";
import Button from "../../Button/Button";
import Logo from "../../Logo/Logo";
const Navbar = () => {
  const { user, userLogOut } = useContext(AuthContext);
  const [navOpen, setNavOpen] = useState(true);
  const role = useGetRole();

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const handleClick = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <nav className=" border-gray-200 dark:bg-gray-900 dark:text-white">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex md:order-2 items-center">
          <span onClick={handleClick} className="mr-2 cursor-pointer">
            {isDarkMode ? (
              <BiSun
                className="text-white"
                title="Apply Light Mode"
                size={35}
              />
            ) : (
              <MdDarkMode size={35} title="Apply Dark Mode" />
            )}
          </span>
          {user && user ? (
            <div className="flex items-center">
              <img
                title={user?.displayName}
                src={user.photoURL}
                className="w-9 md:w-12 h-9 md:h-12   rounded-full cursor-pointer object-cover"
              />

              <BiLogOutCircle
                title="Logout"
                onClick={() => userLogOut()}
                className="w-9 md:w-12 h-9 md:h-12 hover:text-hotPink cursor-pointer"
              />
            </div>
          ) : (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}

          <FaBars
            className="w-7 h-7 mt-2  ml-2  md:hidden"
            onClick={() => setNavOpen(!navOpen)}
          />
        </div>
        <div
          hidden={navOpen}
          className="items-center justify-between  w-full md:flex md:w-auto md:order-1"
        >
          {/* Home, Instructors, Classes, Dashboard */}
          <div className="flex flex-col md:flex-row">
            <NavLink
              className={`${({ isActive }) =>
                isActive
                  ? "active"
                  : ""} text-slate-600 dark:text-slate-50 font-bold rounded duration-150 transition-all  md:hover:text-orange-500 hover:bg-slate-200 py-2 pl-3 pr-4`}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={`${({ isActive }) =>
                isActive
                  ? "active"
                  : ""} text-slate-600 dark:text-slate-50 font-bold rounded duration-150 transition-all  md:hover:text-orange-500 hover:bg-slate-200 py-2 pl-3 pr-4`}
              to="/instructors"
            >
              Instructors
            </NavLink>

            <NavLink
              className={`${({ isActive }) =>
                isActive
                  ? "active"
                  : ""} text-slate-600 dark:text-slate-50 font-bold rounded duration-150 transition-all  md:hover:text-orange-500 hover:bg-slate-200 py-2 pl-3 pr-4`}
              to="/classes"
            >
              Classes
            </NavLink>

            {user && (
              <NavLink
                className={`${({ isActive }) =>
                  isActive
                    ? "active"
                    : ""} text-slate-600 dark:text-slate-50 font-bold rounded duration-150 transition-all  md:hover:text-orange-500 hover:bg-slate-200 py-2 pl-3 pr-4`}
                to={
                  role === "admin"
                    ? "dashboard/manage-users"
                    : role === "instructor"
                    ? "dashboard/add-class"
                    : "/dashboard/selected-classes"
                }
              >
                Dashboard
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
