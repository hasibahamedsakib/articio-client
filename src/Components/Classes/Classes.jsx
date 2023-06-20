import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import useAdmin from "../../Hooks/useAdmin";
// import useInstructor from "../../Hooks/useInstractor";
import { Fade } from "react-awesome-reveal";
import useGetRole from "../../Hooks/useGetRole";
import { AuthContext } from "../../Provider/AuthProvider";
import { useGetAllApproveClass } from "../../api/utils";
import RouteHeader from "../RouteHeader/RouteHeader";
import RouteTitle from "../RouteTitle/RouteTitle";

const Classes = () => {
  const [approvedClass] = useGetAllApproveClass();
  const role = useGetRole();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("access-token");

  const handleSelect = (id, allClass) => {
    if (!user) {
      Swal.fire("Please Login", "Login First to Select This Class.", "info");
      return navigate("/login", { state: { from: location } });
    }
    const { email, displayName, photoURL } = user;
    const {
      _id,
      classImage,
      className,
      instructorName,
      instructorEmail,
      price,
      availableSeats,
    } = allClass;

    const selectClass = {
      classId: _id,
      name: displayName,
      email,
      image: photoURL,
      className,
      classImage,
      instructorName,
      instructorEmail,
      price,
      availableSeats,
    };
    fetch("https://articio-server.vercel.app/selected", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(selectClass),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire("Selected.", "Your Class is selected.", "success");
        } else if (data.message) {
          Swal.fire(
            "Exesting Item not alow",
            "This Class is already added",
            "error"
          );
        }
      });
  };
  return (
    <div className="container">
      <RouteTitle title={"Classes"} />
      <RouteHeader title="All Top Classes" />
      <div className="grid md:grid-cols-2 gap-6">
        {approvedClass.map((allClass) => (
          <Fade key={allClass._id} direction="up" triggerOnce>
            <div
              className={`flex flex-col justify-between items-center ${
                allClass.availableSeats <= 0 ? "bg-red-500" : "bg-white"
              } border border-gray-200 rounded-lg shadow md:flex-row md:max-w-2xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 hover:shadow-xl`}
            >
              <img
                className="object-cover w-full   rounded-t-lg h-52 md:h-60 md:w-64 rounded-md md:rounded-l-lg"
                src={allClass.classImage}
                alt=""
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-800 dark:text-white">
                  {allClass.className}
                </h5>
                <p className="mb-3  text-gray-700 font-semibold dark:text-gray-400">
                  Author: {allClass.instructorName}
                </p>
                <p className="mb-3  text-gray-700 font-semibold dark:text-gray-400">
                  Email: {allClass.instructorEmail}
                </p>
                <p className="mb-3  text-gray-700 font-semibold dark:text-gray-400 flex justify-between space-x-4">
                  <span>Price : {allClass.price}$</span>
                  <span>Available Seats : {allClass.availableSeats}</span>
                </p>

                <button
                  onClick={() => handleSelect(allClass._id, allClass)}
                  className="btn-primary"
                  disabled={
                    role === "admin" ||
                    role === "instructor" ||
                    allClass?.availableSeats <= 0
                  }
                >
                  Select Class
                </button>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
};

export default Classes;
