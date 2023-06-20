import { useRef, useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import Swal from "sweetalert2";
import RouteHeader from "../../../../Components/RouteHeader/RouteHeader";
import RouteTitle from "../../../../Components/RouteTitle/RouteTitle";
import { GetAllClasses } from "../../../../api/utils";

const ManageClasses = () => {
  const [classes, refetch] = GetAllClasses();
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("access-token");
  const [currentClassId, setCurrentClassId] = useState("");
  const feedbackText = useRef();
  const handleApprove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I want Approved",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://articio-server.vercel.app/classes/approve/${id}`, {
          method: "PATCH",

          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.modifiedCount > 0) {
              refetch();
              Swal.fire("Updated!", " Class is Approved", "success");
            }
          });
      }
    });
  };
  const handleDeny = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I want Deny",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://articio-server.vercel.app/classes/deny/${id}`, {
          method: "PATCH",

          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.modifiedCount > 0) {
              refetch();
              Swal.fire("Updated!", "Class is Denied From admin", "success");
            }
          });
      }
    });
  };
  const handleFeedback = () => {
    setOpen(!open);

    const feedback = feedbackText.current.value;
    fetch(
      `https://articio-server.vercel.app/classes/feedback/${currentClassId}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, feedback: feedback },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount > 0) {
          Swal.fire(
            "Feedback Added",
            "your feedback is store in db",
            "success"
          );
        }
      });
  };
  return (
    <div>
      <RouteTitle title={"Manage Classes"} />
      <RouteHeader title={"Manage All Classes "} />
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 py-3">
              <tr>
                <th scope="col" className="px-3 py-5">
                  Class Image
                </th>
                <th scope="col" className="px-3 py-5">
                  Class Name
                </th>
                <th scope="col" className="px-3 py-5">
                  Instructor Name
                </th>
                <th scope="col" className="px-3 py-5">
                  Instructor Email
                </th>
                <th scope="col" className="px-3 py-5">
                  A. Seats
                </th>
                <th scope="col" className="px-3 py-5">
                  Price
                </th>
                <th scope="col" className="px-3 py-5">
                  Status
                </th>
                <th scope="col" className="px-3 py-5">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {classes.map((singleClass) => {
                return (
                  <tr
                    key={singleClass._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 font-semibold"
                  >
                    <th scope="row" className="px-4 py-3">
                      <img
                        src={singleClass.classImage}
                        alt="user profile image"
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                    </th>
                    <td className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {singleClass?.className?.slice(0, 40)}
                    </td>
                    <td className="px-3 py-3">{singleClass.instructorName}</td>
                    <td className="px-3 py-3">{singleClass.instructorEmail}</td>
                    <td className="px-3 py-3">{singleClass.availableSeats}</td>
                    <td className="px-3 py-3">{singleClass.price}</td>
                    <td className="px-3 py-3 font-bold">
                      {singleClass.status}
                    </td>

                    <td className="px-3 py-3 text-right">
                      <div className="inline-flex text-center " role="group">
                        <button
                          onClick={() => handleApprove(singleClass._id)}
                          type="button"
                          disabled={
                            singleClass.status === "approve" ||
                            singleClass.status === "deny"
                          }
                          className="text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-l-lg text-sm p-2.5 text-center inline-flex items-center "
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDeny(singleClass._id)}
                          type="button"
                          disabled={
                            singleClass.status === "approve" ||
                            singleClass.status === "deny"
                          }
                          className="text-white bg-orchid hover:bg-orchid focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm p-2.5 text-center inline-flex items-center "
                        >
                          Deny
                        </button>
                        {singleClass.status === "deny" ? (
                          <button
                            onClick={() => {
                              setOpen(true);
                              setCurrentClassId(singleClass._id);
                            }}
                            type="button"
                            className="text-white bg-hotPink hover:bg-[#e76d95] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-sm p-2.5 text-center inline-flex items-center "
                          >
                            Feedback
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        <div
                          id="top-right-modal"
                          data-modal-placement="top-right"
                          tabIndex="-1"
                          className={`fixed top-0 left-0 right-0 z-50 ${
                            open ? "" : "hidden"
                          } w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
                        >
                          <div className="relative w-full max-w-2xl max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                              <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                  Send a Feedback,About This Class.
                                </h3>
                                <button
                                  onClick={() => setOpen(false)}
                                  type="button"
                                  className=" h-5 w-10"
                                >
                                  <FaRegWindowClose size={30} />
                                </button>
                              </div>

                              <div className="p-6 space-y-6">
                                <div>
                                  <label className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white">
                                    Write Your Comments
                                  </label>
                                  <input
                                    ref={feedbackText}
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-hotPink focus:border-hotPink block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required
                                  />
                                </div>

                                <button
                                  onClick={handleFeedback}
                                  type="submit"
                                  className="btn-primary "
                                >
                                  Submit Feedback
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default ManageClasses;
