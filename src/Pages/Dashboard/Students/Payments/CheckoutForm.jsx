import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../../Provider/AuthProvider";

const CheckoutForm = ({ price, classInfo }) => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        // console.log(res.data);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    setProcessing(true);
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) return;
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      Swal.fire(`Error`, `${error.message}`, "error");
    } else {
      // console.log("[paymentMethod]", paymentMethod);
    }
    if (paymentMethod) {
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: user?.displayName || "Unknown",
              email: user?.email || "Anonimas",
            },
          },
        });
      if (confirmError) {
        Swal.fire(`Confirm Payment Error`, `${confirmError.message}`, "error");
      } else {
        if (paymentIntent.status === "succeeded") {
          const {
            _id,
            name,
            email,
            className,
            classId,
            instructorEmail,
            classImage,
            instructorName,
          } = classInfo;
          setProcessing(false);

          const paymentInfo = {
            classId,
            selectClassId: _id,
            name,
            email,
            price,
            classImage,
            date: new Date().toLocaleString(),
            className,
            instructorEmail,
            instructorName,
            transitionId: paymentIntent.id,
            currency: paymentIntent.currency,
          };
          axiosSecure.post("/payments", paymentInfo).then((res) => {
            if (res.data.result.insertedId) {
              Swal.fire(
                "Payment Successful",
                `Your Payment id is <br /> ${paymentIntent.id}`,
                "success"
              );
            }
          });
        }
        // console.log("[paymentIntent]", paymentIntent);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl w-full md:px-5 mx-auto  dark:text-white space-y-3 "
    >
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",

              color: "#c1c1c1",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn-orchid mt-5 "
        type="submit"
        disabled={!stripe || !clientSecret || processing}
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
