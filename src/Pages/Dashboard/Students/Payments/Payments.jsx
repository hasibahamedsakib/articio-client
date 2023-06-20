import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import RouteHeader from "../../../../Components/RouteHeader/RouteHeader";
import RouteTitle from "../../../../Components/RouteTitle/RouteTitle";
import CheckoutForm from "./CheckoutForm";
const Payments = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PRIVET_KEY);
  const location = useLocation();
  const { state } = location;
  const price = parseFloat(state?.data?.price).toFixed(2);
  const classInfo = state?.data;
  return (
    <div className="container">
      <RouteTitle title={"Payments"} />
      <RouteHeader title={"Payment Now"} />
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm price={price} classInfo={classInfo} />
        </Elements>
      </div>
    </div>
  );
};

export default Payments;
