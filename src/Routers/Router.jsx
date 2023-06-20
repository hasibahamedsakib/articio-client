import { createBrowserRouter } from "react-router-dom";
import Classes from "../Components/Classes/Classes";
import Instructors from "../Components/Instructors/Instructors";

import Error from "../Components/Error/Error";
import DashboardLayout from "../Main/DashboardLayout";
import Main from "../Main/Main";
import ManageClasses from "../Pages/Dashboard/Admin/ManageClasses/ManageClasses";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers/ManageUsers";
import AddClass from "../Pages/Dashboard/Instructors/AddClass/AddClass";
import MyClasses from "../Pages/Dashboard/Instructors/MyClasses/MyClasses";
import EnrolledClass from "../Pages/Dashboard/Students/EnrolledClass/EnrolledClass";
import PaymentInfo from "../Pages/Dashboard/Students/PaymentInfo/PaymentInfo";
import Payments from "../Pages/Dashboard/Students/Payments/Payments";
import SelectedClass from "../Pages/Dashboard/Students/SelectedClass/SelectedClass";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";
import PrivetRoute from "./PrivetRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "instructors",
        element: <Instructors />,
      },
      {
        path: "classes",
        element: <Classes />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      // admins route
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-classes",
        element: (
          <AdminRoute>
            <ManageClasses />
          </AdminRoute>
        ),
      },
      // instructors route
      {
        path: "add-class",
        element: (
          <InstructorRoute>
            <AddClass />
          </InstructorRoute>
        ),
      },
      {
        path: "my-classes",
        element: (
          <InstructorRoute>
            <MyClasses />
          </InstructorRoute>
        ),
      },

      // students Route
      {
        path: "selected-classes",
        element: (
          <PrivetRoute>
            <SelectedClass />
          </PrivetRoute>
        ),
      },
      {
        path: "payments",
        element: (
          <PrivetRoute>
            <Payments />
          </PrivetRoute>
        ),
      },
      {
        path: "enrolled-classes",
        element: (
          <PrivetRoute>
            <EnrolledClass />
          </PrivetRoute>
        ),
      },
      {
        path: "payment-info",
        element: (
          <PrivetRoute>
            <PaymentInfo />
          </PrivetRoute>
        ),
      },
    ],
  },
]);
export default router;
