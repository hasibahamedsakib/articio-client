import Swal from "sweetalert2";
import RouteHeader from "../../../../Components/RouteHeader/RouteHeader";
import RouteTitle from "../../../../Components/RouteTitle/RouteTitle";
// import useAdmin from "../../../../Hooks/useAdmin";
import useAllUsers from "../../../../Hooks/useAllUsers";
// import useInstructor from "../../../../Hooks/useInstractor";

const ManageUsers = () => {
  const [allUsers, , refetch] = useAllUsers();
  // const [isAdmin] = useAdmin();
  // const [isInstructor] = useInstructor();
  const handleAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://articio-server.vercel.app/student/admin/${id}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.modifiedCount > 0) {
              refetch();
              Swal.fire(
                "Updated!",
                "Congratulation. You Are Admin Now",
                "success"
              );
            }
          });
      }
    });
  };
  const handleInstructor = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Instructor!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://articio-server.vercel.app/student/instructor/${id}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.modifiedCount > 0) {
              refetch();
              Swal.fire("Updated!", "You are Instructor Now", "success");
            }
          });
      }
    });
  };

  return (
    <div className="">
      <RouteTitle title={"Manage Users"} />
      <RouteHeader title={"Manage All Users"} />

      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 py-5">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Make Admin
                </th>
                <th scope="col" className="px-6 py-3">
                  Make Instructor
                </th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => {
                return (
                  <tr
                    key={user._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th scope="row" className="px-6 py-4">
                      <img
                        src={user.photoURL}
                        alt="user profile image"
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                    </th>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {user.displayName}
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">
                      <button
                        disabled={user?.role == "admin"}
                        onClick={() => handleAdmin(user._id)}
                        className="text-white bg-hotPink hover:bg-[#e76d95]  focus:outline-none  font-medium rounded-tr-lg rounded-bl-xl text-sm p-2.5 text-center inline-flex items-center "
                      >
                        Make Admin
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        disabled={
                          user?.role == "instructor" || user?.role == "admin"
                        }
                        onClick={() => handleInstructor(user._id)}
                        className="text-white bg-hotPink hover:bg-[#e76d95]  focus:outline-none  font-medium rounded-tl-lg rounded-br-xl text-sm p-2.5 text-center inline-flex items-center "
                      >
                        Make Instructor
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

export default ManageUsers;
