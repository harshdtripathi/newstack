import React, { useState } from 'react';
import { RiCheckDoubleLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { resetPassword } from "../services/operations/authAPI"

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { loading } = useSelector((state) => state.auth);

    // State for form inputs
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    const [visiblePassword, setVisiblePassword] = useState(false);

    const { password, confirmPassword } = formData;

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setVisiblePassword((prev) => !prev);
    };

    const SubmitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const token = location.pathname.split('/').at(-1); // Extract token
        dispatch(resetPassword(password,confirmPassword, token));
        console.log("Password reset with:", password);
    };

    return (
        <div className="flex flex-col  justify-center items-center mt-[120px]  ">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="flex flex-col items-center  text-white font-inter text-2xl text-center">
                    <h1 className=' font-inter text-4xl font-bold'>Choose New Password</h1>
                    <p className="text-sm text-blue-500 mt-4">
                        Almost done! Enter your new password and you are all set.
                    </p>
                    <form onSubmit={SubmitHandler} className="mt-6 w-full max-w-md">
                        <div className="mb-4 relative ">
                            <label className=" text-sm mb-2 flex justify-start">New Password*</label>
                            <input
                                type={visiblePassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded bg-gray-800 text-black"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-2 top-9 text-gray-400 text-black"
                            >
                               <icon className="shadow-inner"> <FaEye /></icon>
                            </button>
                        </div>
                        <div className="mb-4">
                            <label className="flex justify-start text-sm mb-2">Confirm New Password*</label>
                            <input
                                type={visiblePassword ? "text" : "password"}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded bg-gray-800 text-black"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-2 top-9 text-gray-400 text-black"
                            >
                               <icon className="shadow-inner"> <FaEye /></icon>
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-caribbeangreen-100 text-sm">
                            <div className="flex items-center">
                                <RiCheckDoubleLine className="mr-1" /> One lowercase character
                            </div>
                            <div className="flex items-center">
                                <RiCheckDoubleLine className="mr-1" /> One uppercase character
                            </div>
                            <div className="flex items-center">
                                <RiCheckDoubleLine className="mr-1" /> One special character
                            </div>
                            <div className="flex items-center">
                                <RiCheckDoubleLine className="mr-1" /> Minimum 8 characters
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 mt-8 bg-blue-500 hover:bg-blue-600 text-white rounded"
                        >
                            Reset Password
                        </button>
                        <div className="mt-4 text-center">
                            <Link to="/login" className="text-blue-400 hover:underline">
                                Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UpdatePassword;
