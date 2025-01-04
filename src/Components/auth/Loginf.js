import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { login } from "../../services/operations/authAPI";

const Loginf = ({ type, title, description }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(formData.email, formData.password, navigate)); // Corrected to use formData
  };
  

  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;

  return (
    <div className=' w-full  mt-[200px] flex lg:ml-36 ml-4  '>
      <form onSubmit={submitHandler} className='flex flex-col gap-10 w-auto text-richBlack-50 font-inter text-md lg:w-[38%] lg:ml-0 ml-10 '>
        <p className='font-edu-sa text-yellow-300 text-lg '>Login and enter in the world of Studynotion...</p>
        <label className="w-full mb-3">

          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richBlack-5 ">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.18)',
            }}
            className="w-full rounded-[0.5rem] bg-richBlack-800 p-[12px] text-richBlack-5"
          />
        </label>

        <label className="relative">
          <p>
            Password <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter Your Password"
            style={{
              boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.18)',
            }}
            className="w-full rounded-[0.5rem] bg-richBlack-800 p-[12px] text-richBlack-5"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
          <Link to="/forgot-password">
            <p className="ml-auto mt-1 max-w-max text-xs text-blue-100">
              Forgot Password
            </p>
          </Link>
        </label>

        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 px-[12px] py-[8px] font-medium text-richBlack-900"
        >
          Sign In
        </button>
        
      </form>
    </div>
  );
};

export default Loginf;
