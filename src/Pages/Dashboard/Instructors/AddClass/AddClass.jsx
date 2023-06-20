import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Button from "../../../../Components/Button/Button";
import Loader from "../../../../Components/Loader/Loader";
import RouteHeader from "../../../../Components/RouteHeader/RouteHeader";
import RouteTitle from "../../../../Components/RouteTitle/RouteTitle";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { SaveImageToDB } from "../../../../api/utils";

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [axiosSecure] = useAxiosSecure();
  const [load, setLoad] = useState(false);
  if (load) {
    return <Loader />;
  }
  const onSubmit = (data) => {
    setLoad(true);
    data.instructorEmail = user.email;
    data.instructorName = user.displayName;
    data.status = "pending";
    data.enrolled = 0;
    SaveImageToDB(data)
      .then((res) => res.json())
      .then((imageResult) => {
        const image = imageResult.data.display_url;
        data.classImage = image;
        axiosSecure.post("/classes", data).then((res) => {
          if (res.data.insertedId) {
            setLoad(false);
            Swal.fire(
              "Class Added",
              "Your Class is Added. waiting for approve by admin",
              "success"
            );
          }
        });
      });
  };
  return (
    <div className="container">
      <RouteTitle title={"Add Class"} />
      <RouteHeader title={"Add A New Class"} />

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Class Name
              </label>
              <input
                {...register("className")}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-hotPink focus:border-hotPink block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-hotPink dark:focus:border-hotPink"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Class Image
              </label>
              <input
                {...register("classImage")}
                required
                className="block w-full text-sm text-gray-900 border  rounded-lg cursor-pointer border-hotPink focus:outline-hotPink focus:ring-hotPink focus:border-transparent dark:placeholder-gray-400"
                type="file"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Instructor Name
              </label>
              <input
                {...register("instructorName")}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-hotPink focus:border-hotPink block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-hotPink dark:focus:border-hotPink"
                defaultValue={user?.displayName}
                disabled
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Instructor Email
              </label>
              <input
                {...register("instructorEmail")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-hotPink focus:border-hotPink block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-hotPink dark:focus:border-hotPink"
                defaultValue={user?.email}
                disabled
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Available Seats
              </label>
              <input
                {...register("availableSeats")}
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-hotPink focus:border-hotPink block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-hotPink dark:focus:border-hotPink"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Price
              </label>
              <input
                {...register("price")}
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-hotPink focus:border-hotPink block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-hotPink dark:focus:border-hotPink"
                required
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="mx-auto w-full">
              Add Your Class
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
