import { FaEnvelope, FaUserTie } from "react-icons/fa";
import { GetAllInstructors } from "../../api/utils";
import RouteHeader from "../RouteHeader/RouteHeader";
import RouteTitle from "../RouteTitle/RouteTitle";

const Instructors = () => {
  const instructors = GetAllInstructors();

  return (
    <div className="container">
      <RouteTitle title={"Instructors"} />
      <RouteHeader title={"Our All Instructors"} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {instructors.map((inst) => {
          return (
            <div
              key={inst._id}
              className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex flex-col items-center py-10">
                <img
                  className="w-44 h-44 mb-3 rounded-full border-hotPink border-4 shadow-lg object-cover"
                  src={inst.photoURL}
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white  flex gap-2 items-center">
                  <FaUserTie /> {inst.displayName}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400 flex gap-2 items-center">
                  <FaEnvelope /> {inst.email}
                </span>
                <div className="flex mt-4 space-x-3 md:mt-6"> </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Instructors;
