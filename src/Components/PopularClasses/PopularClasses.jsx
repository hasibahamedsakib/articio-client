import { Fade } from "react-awesome-reveal";
import { FaUsers } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { GetPopularCourse } from "../../api/utils";
import SectionHeader from "../SectionHeader/SectionHeader";

const PopularClasses = () => {
  const courses = GetPopularCourse();

  return (
    <div className="container">
      <SectionHeader
        title={"Our Popular Classes"}
        text={"This is our best class based On User Enrolled"}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {courses?.slice(0, 6)?.map((course) => {
          return (
            <Fade key={course._id} direction="up" triggerOnce>
              <div className="max-w-sm bg-white border h-full border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-700 hover:shadow-xl mb-8">
                <img
                  className="rounded-t-lg w-96 h-64 object-cover"
                  src={course.classImage}
                  alt=""
                />

                <div className="p-5">
                  <h5 className="text-xl font-semibold hover:text-hotPink tracking-tight text-gray-900 dark:text-white">
                    {course.className}
                  </h5>

                  <div className="pt-5">
                    <p className=" text-gray-700 hover:text-hotPink dark:text-gray-400 flex gap-2 items-center text-lg font-semibold">
                      <GiTeacher /> {course.instructorName}
                    </p>
                    <p className="font-bold text-gray-700 hover:text-hotPink dark:text-gray-400 flex gap-2 items-center text-lg ">
                      Enrolled: {course.enrolled}
                      <FaUsers />
                    </p>
                    <p className="font-bold text-lg text-gray-700 hover:text-hotPink dark:text-gray-400 flex gap-2 items-center">
                      Seats: {course.availableSeats}{" "}
                      <MdAirlineSeatReclineNormal />
                    </p>
                  </div>
                </div>
              </div>
            </Fade>
          );
        })}
      </div>
    </div>
  );
};

export default PopularClasses;
