import RouteHeader from "../../../../Components/RouteHeader/RouteHeader";
import RouteTitle from "../../../../Components/RouteTitle/RouteTitle";
import { useEnrolled } from "../../../../api/utils";

const PaymentInfo = () => {
  const [enrolledClass] = useEnrolled();

  return (
    <div>
      <RouteTitle title={"Payment History"} />
      <RouteHeader title={"My Payment History"} />
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 py-3">
              <tr>
                <th scope="col" className="px-3 py-5">
                  #
                </th>
                <th scope="col" className="px-3 py-5">
                  Class Name
                </th>
                <th scope="col" className="px-3 py-5">
                  Email
                </th>

                <th scope="col" className="px-3 py-5">
                  Price
                </th>
                <th scope="col" className="px-3 py-5">
                  Currency
                </th>
                <th scope="col" className="px-3 py-5">
                  Date
                </th>
                <th scope="col" className="px-3 py-5">
                  Transition Id
                </th>
              </tr>
            </thead>
            <tbody>
              {enrolledClass.map((info, index) => {
                return (
                  <tr
                    key={info._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 font-semibold"
                  >
                    <th scope="row" className="px-4 py-3">
                      {index + 1}
                    </th>

                    <td className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {info.className.slice(0, 45)}
                    </td>

                    <td className="px-3 py-3 text-uppercase">{info?.email}</td>
                    <td className="px-3 py-3 text-uppercase">
                      $ {info?.price}
                    </td>
                    <td className="px-3 py-3 text-uppercase text-center">
                      {info?.currency}
                    </td>

                    <td className="px-3 py-3 font-bold">{info.date}</td>

                    <td className="px-3 py-3  w-20">{info.transitionId}</td>
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

export default PaymentInfo;
