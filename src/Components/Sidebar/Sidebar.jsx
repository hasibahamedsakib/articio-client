import { Link, NavLink } from "react-router-dom";

import { useContext, useState } from "react";
import { AiOutlineBars, AiOutlineLogout } from "react-icons/ai";
import {
  FaBookReader,
  FaBookmark,
  FaHistory,
  FaSave,
  FaStripe,
  FaUsers,
} from "react-icons/fa";
import { FcHome, FcReading } from "react-icons/fc";
import useAdmin from "../../Hooks/useAdmin";
import useInstructor from "../../Hooks/useInstractor";
import { AuthContext } from "../../Provider/AuthProvider";
import Logo from "../Logo/Logo";

const Sidebar = () => {
  const { user, userLogOut } = useContext(AuthContext);
  const [isInstructor] = useInstructor();
  const [isAdmin] = useAdmin();
  const [isActive, setActive] = useState(true);

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <Logo />
            </Link>
          </div>
        </div>

        <button
          onClick={() => setActive(!isActive)}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`z-10 md:fixed dark:bg-gray-900 dark:text-white flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          {/* Branding & Profile Info */}
          <div>
            <div className="w-full hidden md:flex py-2 justify-left p-3 items-left ">
              <Link to="/">
                <Logo />
              </Link>
            </div>
            <div className="flex flex-col items-center mt-6 -mx-2">
              <img
                src={user?.photoURL}
                className="w-24 h-24 rounded-full border-4 border-hotPink object-cover"
                alt=""
              />
              <h4 className="mx-2 mt-2 text-xl font-medium text-gray-800  hover:underline">
                {user?.displayName}
              </h4>
            </div>
          </div>

          {/* conditional Side NavBar   */}
          <div className="flex flex-col justify-between flex-1 mt-6 dark:bg-gray-900 dark:text-white">
            {isAdmin.admin === true ? (
              <>
                <Link
                  to="/dashboard/manage-classes"
                  className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform space-x-3 hover:bg-gray-300 font-semibold  hover:text-gray-700"
                >
                  <FcReading className="w-5 h-5" />
                  <p>Manage Classes</p>
                </Link>
                <Link
                  to="/dashboard/manage-users"
                  className="flex items-center px-4 py-2 mt-2  transition-colors duration-300 transform space-x-3 hover:bg-gray-300 font-semibold  hover:text-gray-700"
                >
                  <FaUsers className="w-5 h-5" />
                  <p>Manage Users</p>
                </Link>
              </>
            ) : isInstructor.instructor === true ? (
              <>
                <Link
                  to="/dashboard/add-class"
                  className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform space-x-3 hover:bg-gray-300 font-semibold  hover:text-gray-700"
                >
                  <FcReading className="w-5 h-5" />
                  <p>Add a Class</p>
                </Link>
                <Link
                  to="/dashboard/my-classes"
                  className="flex items-center px-4 py-2 mt-2  transition-colors duration-300 transform space-x-3 hover:bg-gray-300 font-semibold  hover:text-gray-700"
                >
                  <FaBookReader className="w-5 h-5" />
                  <p>My Classes</p>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard/selected-classes"
                  className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform space-x-3 hover:bg-gray-300 font-semibold  hover:text-gray-700"
                >
                  <FaBookmark className="w-5 h-5" />
                  <p>Selected Classes</p>
                </Link>
                <Link
                  to="/dashboard/enrolled-classes"
                  className="flex items-center px-4 py-2 mt-2  transition-colors duration-300 transform space-x-3 hover:bg-gray-300 font-semibold  hover:text-gray-700"
                >
                  <FaSave className="w-5 h-5" />
                  <p>Enrolled Classes</p>
                </Link>
                <Link
                  to="/dashboard/payments"
                  className="flex items-center px-4 py-2 mt-2  transition-colors duration-300 transform space-x-3 hover:bg-gray-300 font-semibold hover:text-gray-700"
                >
                  <FaStripe className="w-5 h-5" />
                  <p>Payments</p>
                </Link>
                <Link
                  to="/dashboard/payment-info"
                  className="flex items-center px-4 py-2 mt-2  transition-colors duration-300 transform space-x-3 hover:bg-gray-300 font-semibold hover:text-gray-700"
                >
                  <FaHistory className="w-5 h-5" />
                  <p>Payment History</p>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="dark:bg-gray-900 dark:text-white">
          <hr />
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300 dark:text-white  hover:text-gray-700 ${
                isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
              }`
            }
          >
            <FcHome className="w-5 h-5" />

            <span className="mx-4 font-medium">Home</span>
          </NavLink>
          <button
            onClick={() => {
              userLogOut();
            }}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300 dark:text-white  hover:text-gray-700 transition-colors duration-300 transform group-hover:text-gray-700"
          >
            <AiOutlineLogout className="w-6 h-6 dark:text-white " />

            <span className="mx-4 font-medium ">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
