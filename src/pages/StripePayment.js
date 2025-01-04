import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";
import { apiConnector } from "../services/apiconnector";

import { resetCart } from "../slices/cartSlice";

const StripePayment = ({ clientSecret, courseId, token, userDetails, navigate, dispatch }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        const toastId = toast.loading("Processing payment...");

        try {
            if (!stripe || !elements) {
                toast.error("Stripe has not been loaded yet.");
                setLoading(false);
                return;
            }

            const cardElement = elements.getElement(CardElement);

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
                toast.error("Payment failed. Please try again.");
                setLoading(false);
                toast.dismiss(toastId);
                return;
            }

            // Success Handling
            toast.success("Payment successful! Enrolled in course(s).");
            navigate("/dashboard/enrolled-courses");
            dispatch(resetCart());
        } catch (error) {
            toast.error("Payment failed. Please try again.");
            console.error("Error processing payment:", error.message);
        }

        setLoading(false);
        toast.dismiss(toastId);
        
    };

    return (
        <div>
            <CardElement />
            <button 
                onClick={handlePayment} 
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                disabled={loading}
            >
                {loading ? "Processing..." : "Pay Now"}
            </button>
        </div>
    );
};

export default StripePayment;
