import { toast } from "react-hot-toast"

import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { profileEndpoints } from "../api"
import { logout } from "../operations/authAPI"
import { useDispatch } from "react-redux"


const { GET_USER_DETAILS_API, 
  GET_USER_ENROLLED_COURSES_API,
  GET_INSTRUCTOR_DATA_API  
} = profileEndpoints

export async function getUserDetailsforprofile(token) {
  const toastId = toast.loading("Loading...");
  try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
          Authorization: `Bearer ${token}`,
      });

      console.log("GET_USER_DETAILS API RESPONSE for this", response);

      if (!response.data.success) {
          throw new Error(response.data.message);
      }

      const userImage = response?.data?.userDetails?.image
          ? response.data.userDetails.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;
      
      toast.dismiss(toastId);
      return {
          ...response.data.userDetails?.additionalDetails,
          image: userImage,
      }; // Return the user details directly
  } catch (error) {
      console.error("GET_USER_DETAILS API ERROR............", error);
      toast.dismiss(toastId);
      toast.error("Could Not Get User Details");
      throw error; // Re-throw the error for the caller to handle
  }
}

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
   
    
    const toastId = toast.loading("Loading...");

    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log("GET_USER_DETAILS API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      console.log("RESPONSEE", response);
      const userImage = response?.data?.userDetails?.image
        ? response.data.userDetails?.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;
        
      toast.dismiss(toastId);
      dispatch(setLoading(false));  // set loading false after successful response
      dispatch(setUser({ ...response.data.userDetails, image: userImage }));
       
      
    } catch (error) {
      console.log("GET_USER_DETAILS API ERROR............", error);
      
      toast.error("Could Not Get User Details");
      

      // Optionally log out the user if there’s an error in fetching user details
      dispatch(logout(navigate)); // Assuming you have a `logout` action
    }
  };
}


export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES",response);
    // console.log(
    //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
    //   response
    // )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
    console.log("call compkleted");
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastId)
  return result
}

export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {

    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null,
    {
      Authorization: `Bearer ${token}`
    } )
    console.log("GET_INSTRUCTOR_DATA_API response....", response)
    result= response?.data?.courses
  } catch (error) {
    console.log("GET_INSTRUCTOR_DATA_API API ERROR............", error)
    toast.error("Could Not Get Instructor Data")
  }
  toast.dismiss(toastId)
  return result
}