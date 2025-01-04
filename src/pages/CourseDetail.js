import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";
import { apiConnector } from "../services/apiconnector";
import { resetCart } from "../slices/cartSlice";
import { studentEndpoints } from "../services/api";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { fetchCourseDetails } from "../services/operations/CourseDetailsApis";
import AddCart from "../Components/common/AddCart";
import CoursedetailCard from "./CoursedetailCard";
import ConfirmationModal from "../Components/common/ConfirmationModal";
import { RiArrowDropDownLine } from "react-icons/ri";
import FooterSection from "../Components/FooterSection"
const { COURSE_PAYMENT_API } = studentEndpoints;

const stripePromise = loadStripe(
  "pk_test_51QaeMoCMCMW6YupZD6s3Xce5dxC5Dt7900o9qnN1vG1iAKyMHdO9y55cSbtSnV7AxhpCtgMc0GL2iapEexf2xsjF00b16uJb0t"
);

  const CheckoutForm = ({ clientSecret, courseId, user, onSuccess }) => { // checkoutform component
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const toastId = toast.loading("Processing payment...");

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
          },
        },
      });

      if (error) {
        console.error("Payment error:", error.message);
        toast.error("Payment failed.");
        toast.dismiss(toastId);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        toast.success("Payment Successful!");
        onSuccess();
        dispatch(resetCart());
      }
    } catch (error) {
      console.error("Error confirming payment:", error.message);
      toast.error("There was an error processing your payment.");
    }

    toast.dismiss(toastId);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md p-4 bg-blue-100 border rounded-md">
      <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      <button
        type="submit"
        disabled={!stripe}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Pay
      </button>
    </form>
  );
};

const CourseDetail = () => {




  const sectionarr = [
    {
      lecture: "1",
      title: "Introduction to the Course",
      description: "An overview of the course structure and what you will learn.",
      duration: "1h 30min",
      _id: "11254207-8d0a-40c8-a7bc-a2ee31f2774d",
    },
    {
      lecture: "2",
      title: "Understanding the Basics",
      description: "Learn the fundamental concepts and set up your environment.",
      duration: "1h 50min",
      _id: "d99b34fb-d9f7-427a-97fb-aff81251c18e",
    },
    {
      lecture: "3",
      title: "Intermediate Concepts",
      description: "Dive deeper into core concepts with practical examples.",
      duration: "2h 45min",
      _id: "3b5e35a7-bdc4-4aa8-98e5-81b1f8e98c2f",
    },
    {
      lecture: "4",
      title: "Advanced Topics",
      description: "Explore advanced topics and real-world applications.",
      duration: "2h 10min",
      _id: "62173fb1-b48a-43bd-8bb0-3a0cdaac58c8",
    },
  ];

  const { user } = useSelector((state) => state.profile);
  console.log("USER", user);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [buttonvisible, setButtonvisible] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [coursedata, setCoursedata] = useState(null);
  const [isActive, setIsActive] = useState([]);
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id) ? isActive.concat(id) : isActive.filter((e) => e != id)
    )
  }

  const handledropdown = () => {
    handleActive(coursedata?.courseDetails?.courseContent?._id);

  }




  useEffect(() => {
    const getCourseFulldetails = async () => {
      setLoading(true);
      try {
        const response = await fetchCourseDetails(courseId);
        //console.log("RESPONSEEEE", response);

        // console.log("here is response", response);

        setCoursedata(response);
        console.log("COURSEDATA", coursedata);
        setLoading(false);



      }
      catch (e) {
        toast.error(e.message);

      }

    }
    getCourseFulldetails();



  }, [courseId]);
  if (loading === "true" || !coursedata) {
    return (
      <div>Loading...</div>
    )
  }



  const handleBuyCourse = async () => {
    if (!token) {
      setConfirmationModal({
        text1: " You are not logged in",
        text2: "Please Login to purchase the course",
        btn1Text: "Login",
        btn2Text: "Cancel",

        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null)
      })
      return;


    }
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
        throw new Error(orderResponse.data.message);
      }

      const { clientSecret } = orderResponse.data;
      setClientSecret(clientSecret);
      setLoading(false);
      setButtonvisible(true);
      toast.dismiss(toastId);
    } catch (error) {
      console.error("Error during payment:", error.message);
      toast.error("Payment initialization failed.");
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  const handleSuccess = () => {

    navigate("/dashboard/enrolled-courses");
  };

  return (
    <div className=" text-black p-4 flex flex-col  w-full  ">
      <div className="flex flex-col lg:flex-row w-full lg:relative ">
  {/* Course Details Card */}
  <CoursedetailCard coursedata={coursedata} />

  {/* Checkout Card */}
  <div className="lg:absolute lg:right-16 lg:top-0   lg:h-auto md:w-[30%] w-full p-2 bg-richBlack-700 rounded-lg flex flex-col items-center gap-6 shadow-md">
    {/* Thumbnail and Price */}
    <div className="w-full relative">
      <img
        src={coursedata.courseDetails?.thumbnail}
        className="rounded-md w-full lg:h-[240px]  h-[150px] object-cover"
        alt="Course Thumbnail"
      />
      <p className="absolute top-64 left-4 bg-richBlack-500 text-xl text-white font-bold px-2 py-1 rounded">
        Rs. {coursedata.courseDetails?.price}
      </p>
    </div>

    {/* Add to Cart and Buy Course Button */}
    <div className="w-full flex flex-col mt-16 gap-3 items-center">
      <AddCart  course={coursedata} />
      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
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
            onSuccess={handleSuccess}
          />
        </Elements>
      )}
    </div>

    {/* Additional Info */}
    <p className="text-richBlack-100 text-center font-inter mt-2 text-sm">
      30-Day Money-Back Guarantee
    </p>
    <div className="mt-4 text-caribbeangreen-100 text-sm flex-col gap-3">
      <p className="text-white text-md">This Course includes:</p>
      <ul className="list-disc pl-6 mt-3 text-gray-300">
        <li>8 hours on-demand video</li>
        <li>Full lifetime access</li>
        <li>Access on Mobile and TV</li>
        <li>Certificate of completion</li>
      </ul>
    </div>
  </div>
</div>


      {/* what will you learns section */}
      <div className="flex flex-col lg:-translate-x-[200px]  md:w-[40%] border border-richBlack-600 bg-gradient-to-br from-richBlack-800 to-richBlack-900 rounded-lg shadow-lg mx-auto text-white text-center justify-center items-center  sm:mt-8 p-6 space-y-4">
        <h1 className="text-white text-3xl sm:text-2xl font-bold">What you'll learn</h1>
        <p className="text-gray-300 text-lg sm:text-base leading-relaxed">
          {coursedata.courseDetails?.courseDescription}
        </p>
      </div>

      {/* section  */}
      {/* section */}
      <div className="flex flex-col mt-28 ml-28 lg:w-[60%] md:w-full">
        <p className="text-white text-4xl font-bold font-inter">Course Content:</p>
        <div className="flex flex-row justify-between p-4 mt-6 bg-gray-800 rounded-lg shadow-md text-white text-lg font-semibold">
          <div className="flex flex-row gap-4 items-center">
            <span className="text-white">
              {coursedata.courseDetails?.courseContent?.length} section(s)
            </span>
            <span>lecture(s) 2</span>
          </div>
          <button
            onClick={() => setIsActive([])}
            className="text-yellow-100 sm:w-auto sm:text-center"
          >
            Collapse All sections
          </button>
        </div>


        {/* dropdown section */}
        <div className="flex flex-col w-full border border-richBlack-600 bg-gradient-to-br from-richBlack-800 to-richBlack-900 rounded-lg shadow-lg justify-center mx-auto text-white">
          {sectionarr.map((name, index) => {
            const isOpen = isActive.includes(name._id); // Check if the section is active
            return (
              <div key={name._id} className="border-b w-full border-richBlack-600">
                {/* Lecture Header */}
                <div
                  className="flex flex-col sm:flex-row justify-between items-center cursor-pointer p-4"
                  onClick={() => handleActive(name._id)}
                >
                  <div className="flex flex-row items-center gap-x-4">
                    <RiArrowDropDownLine className={`text-2xl  ${isOpen ? "rotate-180" : ""}`} />
                    <p className="text-lg sm:text-xl font-medium">{`Lecture ${name.lecture}: ${name.title}`}</p>
                  </div>
                  <p className="text-yellow-25 text-sm sm:text-base">{isOpen ? "Hide Details" : "View Details"}</p>
                </div>

                {/* Lecture Content */}
                {isOpen && (
                  <div className="p-4 bg-richBlack-700 text-gray-300 text-sm sm:text-base">
                    <p>Description: {name.description}</p>
                    <p>Duration: {name.duration}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>




      </div>
      <div className="mt-10 ml-24 flex flex-col gap-y-3 lg: w-[60%]">
        <h1 className="font-bold text-white text-4xl ">Author</h1>
        <div className="flex flex-row gap-x-6 mt-5 font-semibold text-3xl text-white hover:text-yellow-200  items-center">
          <img src={user?.image} className="w-[80px] rounded-full "></img>
          <p>{user.firstName} {user.lastName}</p>

        </div>
        <div className="text-white font-xl opacity-60 mt-8  hover:text-yellow-200">I will be your lead trainer in this course. Within no time, I will help you to understand the subject in an easy manner. I have a huge experience in online training and recording videos. Let's get started!</div>



      </div>
      <div className="mt-20 justify-center">

        <FooterSection ></FooterSection>
      </div>



    </div>
  );
};

export default CourseDetail;
export { CheckoutForm  };