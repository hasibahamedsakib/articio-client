import { BsCalendarDate } from "react-icons/bs";
import { GiTeacher } from "react-icons/gi";
import RouteHeader from "../../../../Components/RouteHeader/RouteHeader";
import RouteTitle from "../../../../Components/RouteTitle/RouteTitle";
import { useEnrolled } from "../../../../api/utils";

const EnrolledClass = () => {
  const [enrolledClass] = useEnrolled();

  return (
    <div className="container">
      <RouteTitle title={"Enrolled Classes"} />
      <RouteHeader title=" My Enrolled Classes" />

      <div className="grid gap-5 md:grid-cold-2 lg:grid-cols-3">
        {enrolledClass.map((singleClass) => {
          return (
            <div
              key={singleClass._id}
              className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <img
                className="p-8 w-96 h-96  rounded-t-lg object-cover"
                src={
                  singleClass.classImage
                    ? singleClass.classImage
                    : "https://i.ibb.co/crQMxZg/abstract-futuristic-contemporary-modern-watercolor-art-93314-4483.webp"
                }
                alt="product image"
              />

              <div className="px-5 pb-5">
                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {singleClass.className}
                </h5>

                <p className="text-base font-semibold py-2 flex gap-2 items-center">
                  <GiTeacher />
                  {singleClass?.instructorName}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    $ {singleClass.price}
                  </span>
                  <p className="font-bold flex gap-2 items-center">
                    {" "}
                    <BsCalendarDate /> {singleClass.date.slice(0, 9)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EnrolledClass;
