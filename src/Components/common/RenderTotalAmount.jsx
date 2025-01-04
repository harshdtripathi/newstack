import React from 'react';
import { useSelector } from 'react-redux';
import IconBtn from "./IconBtn";
import toast from 'react-hot-toast';
import { useState } from 'react';
import { apiConnector } from '../../services/apiconnector';
import { CheckoutForm } from '../../pages/CourseDetail';
import { loadStripe } from "@stripe/stripe-js";
import { studentEndpoints } from "../../services/api";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const { COURSE_PAYMENT_API } = studentEndpoints;
const stripePromise = loadStripe(
  "pk_test_51QaeMoCMCMW6YupZD6s3Xce5dxC5Dt7900o9qnN1vG1iAKyMHdO9y55cSbtSnV7AxhpCtgMc0GL2iapEexf2xsjF00b16uJb0t"
);


const RenderTotalAmount = () => {
  const {user}=useSelector((state)=>state.profile)
  const {token }=useSelector((state)=>state.auth);
  const [buttonvisible, setButtonvisible] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const courseId= ""
  const handleBuyCourse = async () => {
   
    const toastId = toast.loading("Initializing payment...");
    setLoading(true);



    try {
      const orderResponse = await apiConnector(
        "POST",
        COURSE_PAYMENT_API,
        { courseId: courseId },
        { Authorization: `Bearer ${token}` }
      );

      if (!orderResponse.data.success) {
        throw new Error("Go to particular course to buy on CoursePage");
      }

      const { clientSecret } = orderResponse.data;
      setClientSecret(clientSecret);
      setLoading(false);
      setButtonvisible(true);
      toast.dismiss(toastId);
    } catch (error) {
      //console.error("Error during payment:", error.message);
      toast.success("Payment initialization failed. Go to Particular Course You Want to buy as only one course can be bought at a time🧒");
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  const { total, cart } = useSelector((state) => state.cart);

  

  return (
    <div className="flex flex-col gap-4 p-6 bg-richblue-600 rounded-lg shadow-md hover:bg-blue-700
                    items-center justify-center sm:gap-6 md:gap-8 lg:p-8 lg:w-[90%] lg:h-[20%] xl:w-[60%] mx-auto">
      {/* Total Label */}
      <div className="text-lg font-semibold text-center   text-yellow-200 ">
        Total Amount
      </div>
      
      {/* Total Amount */}
      <div className=" text-lg font-bold sm:text-lg md:text-2xl">
        ₹ {total}
      </div>
      
      {/* Buy Button */}
      <div className="w-full flex flex-col mt-16 gap-3 items-center">
     
      {!buttonvisible && (
        <button
          onClick={handleBuyCourse}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          Buy Course
        </button>
      )}
      {clientSecret && (
        <Elements stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            courseId={courseId}
            user={user}
           // onSuccess={handleSuccess}
          />
        </Elements>
      )}
    </div>
    </div>
  );
};

export default RenderTotalAmount;
