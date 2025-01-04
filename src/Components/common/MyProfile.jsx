import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from './IconBtn';
import { getUserDetailsforprofile } from '../../services/operations/ProfileAPI';
import toast from 'react-hot-toast';

const MyProfile = () => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [about, setAbout] = useState(user?.about || "");
    const [UserDetails, setUserDetails] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!token || !user) return;

        const getAvailableDetails = async () => {
            try {
                const response = await getUserDetailsforprofile(token);
                setUserDetails(response);
            } catch (e) {
                console.error(e.message);
                toast.error("Something went wrong");
            }
        };

        getAvailableDetails();
    }, [token, user]);

    return (
        <div className="flex flex-col lg:mr-8 lg:p-8 bg-richBlack-900 w-full lg:w-[80%] text-white rounded-lg shadow-lg justify-center lg:ml-18 px-4">
            {/* Header */}
            <h1 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 border-b pb-4 border-richBlack-700">
                My Profile
            </h1>

            {/* Profile Section */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-8 w-full">
                <img
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-2 border-yellow-50 mx-auto lg:mx-0"
                />
                <div className="flex flex-col items-center lg:items-start">
                    <h2 className="text-lg lg:text-2xl font-semibold">
                        {`${user.firstName} ${user.lastName}`}
                    </h2>
                    <p className="text-gray-400 text-sm lg:text-base">{user.email}</p>
                </div>
                <div className="flex justify-center lg:justify-start">
                    <IconBtn text="Edit Profile" onClick={() => navigate("/dashboard/settings")} />
                </div>
            </div>

            {/* About Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start w-full bg-richBlack-700 p-4 lg:p-6 rounded-lg mb-8">
                <div className="flex flex-col w-full">
                    <h2 className="text-base lg:text-lg font-semibold mb-2">About</h2>
                    <textarea
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        className="bg-richBlack-700 text-gray-300 p-3 rounded-lg resize-none h-24"
                        placeholder="Write something about yourself"
                    ></textarea>
                </div>
                <div className="mt-4 lg:mt-0 lg:ml-6 bg-yellow-200 p-3 rounded-md text-md">
                    <IconBtn text="Save" onClick={() => console.log("About updated:", about)} />
                </div>
            </div>

            {/* Personal Details Section */}
            <div className="bg-richBlack-800 p-4 lg:p-6 rounded-lg">
                <h2 className="text-base lg:text-lg font-semibold mb-4 lg:mb-6">
                    Personal Details
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 text-gray-300">
                    <div className="flex flex-col">
                        <span className="opacity-70 text-sm">First Name</span>
                        <span className="text-white">{user.firstName}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="opacity-70 text-sm">Last Name</span>
                        <span className="text-white">{user.lastName}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="opacity-70 text-sm">Email</span>
                        <span className="text-white">{user.email}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="opacity-70 text-sm">Contact Number</span>
                        <span className="text-white">
                            {UserDetails?.ContactNumber || "Add Contact Number"}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="opacity-70 text-sm">Gender</span>
                        <span className="text-white">{UserDetails?.gender || "Add Gender"}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="opacity-70 text-sm">D.O.B</span>
                        <span className="text-white">
                            {UserDetails?.dateofBirth || "Add Date of Birth"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
