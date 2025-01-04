import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../services/operations/SettingsAPI'; // Assuming you have an updateProfile action
import toast from 'react-hot-toast';
import { getUserDetails } from '../../services/operations/ProfileAPI';

const ProfileInformation = () => {
    const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    console.log("USER",user);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitProfileForm = async (data) => {
        try {
            await dispatch(updateProfile(token, data));
            toast.success("Profile updated successfully");
            navigate("/dashboard/my-profile");
        } catch (e) {
            console.error(e.message);
            
        }
    };
    
    
      
    return (
        <div className='w-full bg-richBlack-800 text-white font-inter flex flex-col gap-10 p-8 rounded-md'>
            <form onSubmit={handleSubmit(submitProfileForm)} className="space-y-6 rounded-md">
                <h2 className='text-lg font-semibold text-richBlack-50 mb-4'>Profile Information</h2>

                <div className='grid gap-6 lg:grid-cols-2'>
                    <div>
                        <label htmlFor='firstName' className='text-sm font-medium text-richBlack-50'>First Name</label>
                        <input
                            className='w-full mt-2 p-3 rounded-md bg-richBlack-600 text-white focus:ring-2 focus:ring-yellow-500'
                            type='text'
                            name='firstName'
                            placeholder="Enter your First name"
                            {...register("firstName", { required: "First name is required" })}
                            defaultValue={user?.firstName}
                        />
                        {errors.firstName && <span className="text-xs text-red-500">{errors.firstName.message}</span>}
                    </div>

                    <div>
                        <label htmlFor='lastName' className='text-sm font-medium text-richBlack-50'>Last Name</label>
                        <input
                            className='w-full mt-2 p-3 rounded-md bg-richBlack-600 text-white focus:ring-2 focus:ring-yellow-500'
                            type='text'
                            name='lastName'
                            placeholder="Enter your Last name"
                            {...register("lastName", { required: "Last name is required" })}
                            defaultValue={user?.lastName}
                        />
                        {errors.lastName && <span className="text-xs text-red-500">{errors.lastName.message}</span>}
                    </div>

                    <div>
                        <label htmlFor='dateOfBirth' className='text-sm font-medium text-richBlack-50'>Date of Birth</label>
                        <input
                            type='date'
                            name='dateOfBirth'
                            className='w-full mt-2 p-3 rounded-md bg-richBlack-600 text-white focus:ring-2 focus:ring-yellow-500'
                            {...register("dateOfBirth", {
                                required: "Please enter your date of birth",
                                max: {
                                    value: new Date().toISOString().split("T")[0],
                                    message: "Date of Birth cannot be in the future."
                                }
                            })}
                            defaultValue={user?.additionalDetails?.dateOfBirth}
                        />
                        {errors.dateOfBirth && <span className="text-xs text-red-500">{errors.dateOfBirth.message}</span>}
                    </div>

                    <div>
                        <label htmlFor='contactNumber' className='text-sm font-medium text-richBlack-50'>Contact Number</label>
                        <input
                            type="tel"
                            name='contactNumber'
                            className='w-full mt-2 p-3 rounded-md bg-richBlack-600 text-white focus:ring-2 focus:ring-yellow-500'
                            {...register("contactNumber", {
                                required: "Enter your contact number",
                                maxLength: { value: 12, message: "Invalid contact number" },
                                minLength: { value: 10, message: "Invalid contact number" }
                            })}
                            defaultValue={user?.additionalDetails?.contactNumber}
                        />
                        {errors.contactNumber && <span className="text-xs text-red-500">{errors.contactNumber.message}</span>}
                    </div>

                    <div>
                        <label htmlFor='gender' className='text-sm font-medium text-richBlack-50'>Gender</label>
                        <select
                            {...register("gender", { required: "Please select your gender" })}
                            className='w-full mt-2 p-3 rounded-md bg-richBlack-600 text-white focus:ring-2 focus:ring-yellow-500'
                            defaultValue={user?.additionalDetails?.gender}
                        >
                            {genders.map((ele, i) => (
                                <option key={i} value={ele}>{ele}</option>
                            ))}
                        </select>
                        {errors.gender && <span className="text-xs text-red-500">{errors.gender.message}</span>}
                    </div>

                    <div>
                        <label htmlFor="about" className="text-sm font-medium text-richBlack-50">About</label>
                        <input
                            type="text"
                            name="about"
                            id="about"
                            placeholder="Enter Bio Details"
                            className="w-full mt-2 p-3 rounded-md bg-richBlack-600 text-white focus:ring-2 focus:ring-yellow-500"
                            {...register("about", { required: "Please enter your bio details" })}
                            defaultValue={user?.additionalDetails?.about}
                        />
                        {errors.about && <span className="text-xs text-red-500">{errors.about.message}</span>}
                    </div>
                </div>

                <div className='flex flex-row gap-3 justify-end'>
                    <button type="submit" className='bg-yellow-25 text-black py-2 px-4 rounded-md hover:bg-yellow-100 transition duration-300'>Save</button>
                    <button onClick={() => navigate("/dashboard/my-profile")} className="text-white bg-richBlack-600 py-2 px-4 rounded-md hover:bg-richBlack-500 transition duration-300">Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default ProfileInformation;
