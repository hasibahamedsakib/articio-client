import { useContext } from "react";
import RouteHeader from "../../../../Components/RouteHeader/RouteHeader";
import RouteTitle from "../../../../Components/RouteTitle/RouteTitle";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { useGetAllClasses } from "../../../../api/utils";

const MyClasses = () => {
  const { user } = useContext(AuthContext);
  const [myClasses] = useGetAllClasses(user.email);
  //   console.log(myClasses);
  const handleUpdate = (id) => {
    console.log(id);
  };
  return (
    <div>
      <RouteHeader title={"All My Classes"} />
      <RouteTitle title={"My Classes"} />
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 py-3">
              <tr>
                <th scope="col" className="px-3 py-5">
                  #
                </th>
                <th scope="col" className="px-3 py-5">
                  Class Image
                </th>
                <th scope="col" className="px-3 py-5">
                  Class Name
                </th>

                <th scope="col" className="px-3 py-5">
                  Total Enrolled
                </th>
                <th scope="col" className="px-3 py-5">
                  Status
                </th>
                <th scope="col" className="px-3 py-5">
                  See Feedback
                </th>
                <th scope="col" className="px-3 py-5">
                  Update
                </th>
              </tr>
            </thead>
            <tbody>
              {myClasses.map((singleClass, index) => {
                return (
                  <tr
                    key={singleClass._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 font-semibold"
                  >
                    <th scope="row" className="px-4 py-3">
                      {index + 1}
                    </th>
                    <th scope="row" className="px-4 py-3">
                      <img
                        src={singleClass.classImage}
                        alt="user profile image"
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                    </th>
                    <td className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {singleClass.className}
                    </td>

                    <td className="px-3 py-3">{singleClass?.enrolled}</td>

                    <td className="px-3 py-3 font-bold">
                      {singleClass.status}
                    </td>

                    <td className="px-3 py-3 ">
                      {/* <button className="btn-primary ">Feedback</button> */}
                      {singleClass.status === "deny" ? (
                        <p>{singleClass?.feedback}</p>
                      ) : (
                        ""
                      )}
                    </td>

                    <td className="px-3 py-3 text-right w-20">
                      <button
                        onClick={() => handleUpdate(singleClass._id)}
                        type="button"
                        className="btn-orchid"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* {
            myClasses.map(classes=>)
        } */}
      </div>
    </div>
  );
};

export default MyClasses;
