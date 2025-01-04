import { toast } from "react-hot-toast";

import { setLoading, setToken } from "../../slices/authSlice";
import { resetCart } from "../../slices/cartSlice";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import {endpoints} from "../api"
import { useState } from "react";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;



export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", `${process.env.REACT_APP_BASE_URL}${SENDOTP_API}`, {
  email,
  checkUserPresent: true,
});

      console.log("Response Data: ", response.data);
      // console.log("SENDOTP API RESPONSE............", response);

      // console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log(error.message);
      toast.error("Could Not Send OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      
      const response = await apiConnector("POST", SIGNUP_API, {
        email,
        firstName,
        lastName,
       
        password,
        confirmPassword,
        accountType,
        otp,
      });

      // console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
     
      navigate("/login");
    } catch (error) {
      console.error("SIGNUP API ERROR............", error);

      // Check if the error has a response from the server
      if (error.response) {
        // Backend returned an error
        toast.error( "Something went wrong!");
      } else {
        // Network or unexpected error
        toast.error("Unable to connect to the server. Please try again.");
      }

      // Navigate to signup in case of an error
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST",LOGIN_API, {
        email,
        password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      

      toast.success("Login Successful");
      dispatch(setToken(response.data.token));
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      dispatch(setUser({ ...response.data.user, image: userImage }));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard/my-profile");
    } catch (error) {
      console.error( error.message);
      toast.error(error.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}


export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}


export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST",RESETPASSTOKEN_API, { email });
      console.log("RESET password TOKEN RESPONSE...", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("RESET EMAIL SENT");
      setEmailSent(true);
    } catch (e) {
      console.error("RESET PASSWORD TOKEN ERROR", e); // Log the error for debugging
      toast.error("An error occurred while sending the reset email.");
    } finally {
      dispatch(setLoading(false)); // Ensure loading state is reset
    }
  };
}
export function resetPassword(password,confirmPassword,token){
  return async (dispatch)=>{
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST",  RESETPASSWORD_API,{token,password,confirmPassword})
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Password has been resetted");
    }
    catch (e) {
      console.error(e); // Log the error for debugging
      toast.error("An error occurred while sending the reset email.");
    } finally {
      dispatch(setLoading(false)); // Ensure loading state is reset
    }
    
    

  }
}
