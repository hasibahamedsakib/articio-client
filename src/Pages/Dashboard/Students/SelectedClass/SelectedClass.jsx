import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import RouteHeader from "../../../../Components/RouteHeader/RouteHeader";
import RouteTitle from "../../../../Components/RouteTitle/RouteTitle";
import useSelectClass from "../../../../Hooks/useSelectClass";
import { DeleteClass } from "../../../../api/Students";

const SelectedClass = () => {
  const [selectClass, refetch] = useSelectClass();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteClass(id)
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount == 1) {
              Swal.fire("Deleted!", "Your Class has been deleted.", "success");
            }
            refetch();
          });
      }
    });
  };
  return (
    <div>
      <RouteTitle title={"Selected Class"} />
      <RouteHeader title={"All Selected Classes"} />
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 py-5 font-bold">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Class Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Instructor
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Purchase
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {selectClass.map((select, index) => {
                return (
                  <tr
                    key={select?._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 font-semibold"
                  >
                    <th scope="row" className="px-6 py-4">
                      {index + 1}
                    </th>
                    <th scope="row" className="px-6 py-4">
                      <img
                        src={select?.classImage}
                        alt="user profile image"
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                    </th>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {select?.className}
                    </td>
                    <td className="px-6 py-4">{select?.instructorName}</td>
                    <td className="px-6 py-4">{select.price} $</td>
                    <td className="px-3 py-4 ">
                      <Link to="/dashboard/payments" state={{ data: select }}>
                        <button className="btn-orchid">Payment</button>
                      </Link>
                    </td>
                    <td className="px-3 py-4 ">
                      <button
                        onClick={() => handleDelete(select._id)}
                        className="btn-primary"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SelectedClass;
