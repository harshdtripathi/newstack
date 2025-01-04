import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSignupData } from "../../slices/authSlice";
import { sendOtp } from "../../services/operations/authAPI";






function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const btns = [
    "Student",
    "Instructor"
  ]

  // student or instructor
  const [accountType, setAccountType] = useState("Student");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    const signupData = {
      ...formData,
      accountType,
    };

    // Setting signup data to state
    // To be used after otp verification

    // Send OTP to user for verification
    dispatch(setSignupData(signupData));
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate));


    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType("Student");
  };

  // data to pass to Tab component


  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex flex-row gap-10 rounded-xl shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] w-full sm:w-[280px] mt-[80px] text-xl font-inter">
        {btns.map((btn, index) => (
          <button
            key={index}
            onClick={() => setAccountType(btn)}
            className={`px-4 py-2 rounded w-full ${accountType === btn
                ? "bg-richBlack-300 text-richBlack-900"
                : "bg-gray-200"
              }`}
          >
            {btn}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4  ">
        <div className="flex flex-col sm:flex-row gap-x-4 sm:gap-x-6 sm:w-full w-full">
          <label className="w-full sm:w-[48%]">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richBlack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richBlack-800 p-[12px] text-richBlack-5"
            />
          </label>
          <label className="w-full sm:w-[48%]">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richBlack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richBlack-800 p-[12px] text-richBlack-5"
            />
          </label>
        </div>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richBlack-5">
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
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richBlack-800 p-[12px] text-richBlack-5"
          />
        </label>
        <div className="flex flex-col sm:flex-row gap-x-4 sm:gap-x-6 sm:w-full w-full">
          <label className="relative sm:w-[48%] w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richBlack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richBlack-800 p-[12px] pr-10 text-richBlack-5"
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
          </label>
          <label className="relative sm:w-[48%] w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richBlack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richBlack-800 p-[12px] pr-10 text-richBlack-5"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richBlack-900"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignupForm;