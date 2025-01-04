import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { studentEndpoints } from "../api";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const { COURSE_PAYMENT_API } = studentEndpoints;

export const buyCourse = async (token, courses, userDetails, navigate, dispatch) => {
    const toastId = toast.loading("Initializing payment...");
    dispatch(setPaymentLoading(true));

    try {
        // Initialize Stripe
        const stripePromise = loadStripe('pk_test_51QaeMoCMCMW6YupZD6s3Xce5dxC5Dt7900o9qnN1vG1iAKyMHdO9y55cSbtSnV7AxhpCtgMc0GL2iapEexf2xsjF00b16uJb0t');
        const stripe = await stripePromise;

        if (!stripe) {
            toast.error("Stripe SDK failed to load");
            return;
        }

        // Create Payment Intent
        const orderResponse = await apiConnector(
            "POST",
            COURSE_PAYMENT_API,
            { courses },
            { Authorization: `Bearer ${token}` }
        );

        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }

        const { clientSecret } = orderResponse.data;

        // Confirm Payment with Card Details
        const stripeElements = useElements();
        const cardElement = stripeElements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: userDetails.firstName,
                    email: userDetails.email,
                },
            },
        });

        if (error) {
            console.error("Payment failed:", error.message);
            toast.error("Payment failed. Please try again.");
            return;
        }

        // Success Handling
        toast.success("Payment successful! Enrolled in course(s).");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    } catch (error) {
        console.error("Error during payment:", error.message);
        toast.error("Payment process encountered an issue.");
    }

    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
};

