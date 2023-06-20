import { Fade } from "react-awesome-reveal";
import { FaEnvelope, FaUserTie } from "react-icons/fa";
import { GetAllInstructors } from "../../api/utils";
import SectionHeader from "../SectionHeader/SectionHeader";

const PopularInstructors = () => {
  const instructors = GetAllInstructors();

  return (
    <div className="container">
      <SectionHeader
        title="Meet With Expert Instructors"
        text="They Are our Best and expert teachers"
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {instructors.slice(0, 6).map((inst) => {
          return (
            <Fade key={inst._id} direction="up" triggerOnce>
              <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg dark:bg-gray-700 dark:border-gray-700">
                <div className="flex flex-col items-center py-10">
                  <img
                    className="w-44 h-44 mb-3 rounded-full border-hotPink border-4 shadow-lg object-cover"
                    src={inst.photoURL}
                    alt={inst.displayName}
                  />
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white  flex gap-2 items-center">
                    <FaUserTie /> {inst.displayName}
                  </h5>
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex gap-2 items-center">
                    <FaEnvelope /> {inst.email}
                  </span>
                  <div className="flex mt-4 space-x-3 md:mt-6"></div>
                </div>
              </div>
            </Fade>
          );
        })}
      </div>
    </div>
  );
};

export default PopularInstructors;
