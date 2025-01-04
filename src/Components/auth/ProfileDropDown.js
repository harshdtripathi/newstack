import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserDetails } from "../../services/operations/ProfileAPI";
import toast from "react-hot-toast";
import { RiDropdownList } from "react-icons/ri";
import { RiDashboardLine } from "react-icons/ri";
import { logout } from "../../services/operations/authAPI";
import { SlLogout } from "react-icons/sl";
import { RiLogoutBoxLine } from "react-icons/ri";


const ProfileDropDown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const [openDropdown, setOpenDropdown] = useState(false);
  const handledropdown = () => {
    if (openDropdown) {
      setOpenDropdown(false);
    }
    else
      setOpenDropdown(true);
  }




  // Fetch user details on component mount
  const fetchUserDetails = async () => {
    try {
      const res = getUserDetails(token, "/");
      console.log("Response from ProfileDropdown:", res);

    } catch (error) {
      toast.error("Some error occurred while fetching user details");
      console.error("Error fetching user details:", error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserDetails();
    }
  }, [token]);

  // Handle dropdown navigation
  const handleNavigation = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "logout") {
      dispatch(logout(navigate));
    }
    else
      navigate(selectedValue);
  };

  return (
    <div className="flex flex-row items-center">
      {/* User Image */}
      <div className="rounded-full overflow-hidden w-10 h-10 border border-yellow-50">
        <img
          src={user?.image}
          alt="User"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dropdown */}
      <div className="ml-6 rounded-full items-center " onClick={handledropdown}>
        <RiDropdownList
          className={`text-2xl cursor-pointer transition-transform ${openDropdown ? "rotate-180" : ""
            }`}
        />
        <div
          className={`absolute mt-2 right-0 bg-richBlack-800 text-white rounded-md shadow-lg w-40 ${openDropdown ? "opacity-100" : "opacity-0 pointer-events-none"
            } transition-opacity duration-300 ease-in-out`}
        >
          {openDropdown && (
            <div className=" absolute  flex flex-col p-4 space-y-2 bg-richBlack-700 hover:bg-transparent z-50 rounded-md">

              <button
                className="flex flex-row items-center gap-2 text-sm hover:text-yellow-300"
                onClick={() => navigate("dashboard/my-profile")}
              >
                <RiDashboardLine />
                Dashboard
              </button>


              <button
                onClick={() => {
                  dispatch(logout(navigate))
                }}
                className="flex flex-row items-center gap-2 text-sm hover:text-pink-300"

              >
                <RiLogoutBoxLine />
                Logout
              </button>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDropDown;
