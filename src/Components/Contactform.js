import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { apiConnector } from '../services/apiconnector';
import { contactusEndpoint } from '../services/api';
import toast from 'react-hot-toast';
import CountryCode from "../data/countrycode.json"


const Contactform = () => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    const submitContactForm = async (data) => {
        // Form submission logic
        try{
                setLoading(true);
                const response=await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data);
                console.log("Logging response",response);
                setLoading(false);
                toast.success("Check Your Mail😎😎😁>");

        }
        catch(e)
        {
            toast.error("error Occurred 😒😒😒😒");
            console.log("error paida ho gaya ",e);
            setLoading(false);

        }
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: "",
            });
        }
    }, [reset, isSubmitSuccessful]);

    return (
        <form
            onSubmit={handleSubmit(submitContactForm)}
            className="max-w-4xl mx-auto p-6 bg-richBlack-900 rounded-md shadow-lg"
        >
            {/* First and Last Name Row */}
            <div className="flex lg:flex-row flex-col gap-10">
                <div className="flex flex-col w-full md:w-1/2 gap-2">
                    <label htmlFor="firstname" className="text-white font-semibold">
                        First Name
                    </label>
                    <input
                        type="text"
                        placeholder="Enter First Name"
                        id="firstname"
                        {...register("firstname", { required: true })}
                        className="font-inter text-white bg-richBlack-500 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.firstname && (
                        <span className="text-red-500 text-sm">Please enter your first name</span>
                    )}
                </div>

                <div className="flex flex-col w-full md:w-1/2 gap-2">
                    <label htmlFor="lastname" className="text-white font-semibold">
                        Last Name
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Last Name"
                        id="lastname"
                        {...register("lastname", { required: true })}
                        className="font-inter text-white bg-richBlack-500 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.lastname && (
                        <span className="text-red-500 text-sm">Please enter your last name</span>
                    )}
                </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-2 mt-5">
                <label htmlFor="email" className="text-white font-semibold">
                    Email
                </label>
                <input
                    type="email"
                    placeholder="Enter Your Email"
                    id="email"
                    {...register("email", { required: true })}
                    className="font-inter text-white bg-richBlack-500 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {errors.email && (
                    <span className="text-red-500 text-sm">Please enter your email</span>
                )}
            </div>
            <div className="flex flex-col gap-2 mt-5">
    <label htmlFor="phonenumber" className="text-white font-semibold">
        Phone Number
    </label>
    <div className="flex lg:flex-row flex-col gap-5">
        <div>
            <select
                name="countrycode"
                id="countrycode"
                {...register("countrycode", { required: true })}
                className="font-inter text-white bg-richBlack-500 p-3 w-40  rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
                {CountryCode.map((Element, index) => (
                    <option key={index} value={Element.code}>
                        {Element.code} - {Element.country}
                    </option>
                ))}
            </select>
        </div>
        <div>
            <input
                type="text"
                placeholder="Enter Phone Number"
                id="phonenumber"
                {...register("phonenumber", { required: true ,maxLength:{value:10,message:"InValid Phone number"
                }, minLength:{value:8,message:"Invalid Phone Number"}})}
                className="font-inter text-white bg-richBlack-500 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
        </div>
    </div>
    {errors.phonenumber && (
        <span className="text-red-500 text-sm">Please enter your phone number</span>
    )}
</div>

            <div className="flex flex-col gap-2 mt-5">
                <label htmlFor="message" className="text-white font-semibold">
                    Message
                </label>
                <textarea
                    id="message"
                    cols={30}
                    rows={5}
                    placeholder="Enter Your Message Here"
                    {...register("message", { required: true })}
                    className="font-inter text-white bg-richBlack-500 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {errors.message && (
                    <span className="text-red-500 text-sm">Please enter your message</span>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="bg-yellow-500 text-richBlack-900 font-semibold py-2 px-6 mt-5 rounded-md hover:bg-yellow-600 transition-all"
            >
                Send Message
            </button>
        </form>
    );
};

export default Contactform;
