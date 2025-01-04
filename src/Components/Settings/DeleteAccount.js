import React from 'react';
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProfile } from "../../services/operations/SettingsAPI";
import toast from 'react-hot-toast';

const DeleteAccount = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

    // Corrected deleteHandler function
    const deleteHandler = async () => {
        try {
            dispatch(deleteProfile(token, navigate)); // Ensure you pass the correct arguments to your deleteProfile action
        } catch (e) {
            console.log(e.message);
            toast.error(e.message);
        }
    }

    return (
        <div className='flex flex-row w-full bg-pink-500 gap-5  opacity-70 font-inter'>
            <MdDelete className='w-16 h-16 ' />
            <div className='flex flex-col'>
                <h2 className='text-white text-xl  font-bold'>Delete Account</h2>
                <p className='font-edu-sa mt-3'>Would You Like to delete Account?</p>
                <p className='font-edu-sa'>This Account may contain paid courses that you have purchased. Deleting the account may result in losing all access to the courses!</p>
                

                <div 
                    className='bg-richBlack-600 w-40 p-2 rounded-md mt-10 text-white text-lg cursor-pointer'
                    onClick={deleteHandler} // Pass the function reference instead of invoking it here
                >
                    Delete Anyway
                </div>
            </div>
        </div>
    )
}

export default DeleteAccount;
