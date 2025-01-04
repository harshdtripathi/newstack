import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { settingsEndpoints } from "../api"
import { logout } from "./authAPI";
import { setUser } from "../../slices/profileSlice";
import { useSelector } from "react-redux";
const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;



export function updateDisplayPicture(token, formData) {
 
  return async (dispatch) => {
    const toastId = toast.loading("Updating DP...");
    console.log("yaha tk pahuch rhe hai");
    try {
      const response = await apiConnector(
        "POST",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );
  
      console.log("response generated",response);
      toast.success("Wait a minute we are updateing your Picture...😊");
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(setUser(response?.data?.data));
    
    } catch (error) {
      console.error("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
      toast.error("Could Not Update Display Picture");
    }
    toast.dismiss(toastId);
    toast.success("if profile picture didn't shows up Please Login again after logging out");
  };
}

export async function updateProfile(token, formData) {
    let result = [];
    const toastId = toast.loading("Updating Profile...");
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      });
      console.log("what is response ",response.data);
  
      if (!response.data.success) throw new Error(response.data.message);
  
      // Successfully updated profile, returning profile details
      result = response.data.profileDetails; // Update result with profile data
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.error("UPDATE_PROFILE_API API ERROR:", error.message);
      toast.error("Error updating profile");
    }
    toast.dismiss(toastId);
    return result; // Return the result to the calling function
  }
  

export async function ChangePassword(token, formData) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    });
    if (!response.data.success) throw new Error(response.data.message);
    toast.success("Password Changed Successfully");
  } catch (error) {
    console.error("CHANGE_PASSWORD_API API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
}

export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("loading...");
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) throw new Error(response.data.message);

      toast.success("Password Deleted Successfully");
      dispatch(logout(navigate));
    } catch (error) {
      console.error("DELETE_PROFILE_API API ERROR............", error);
      toast.error("Could Not Delete Profile");
    }
    toast.dismiss(toastId);
  };
}