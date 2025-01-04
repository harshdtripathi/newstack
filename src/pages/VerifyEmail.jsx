import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OtpInput from 'react-otp-input';
import { signUp } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signupData, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { accountType, firstName, lastName, email, password, confirmPassword } = signupData;
    dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
  }

  return (
    <div className="flex flex-col justify-center items-center mt-20 bg-richBlack-900 p-8 rounded-lg shadow-xl max-w-lg mx-auto">
      {loading ? (
        <div className="text-white text-xl">Loading...</div>
      ) : (
        <div className="w-full text-center">
          <h1 className="font-inter text-4xl font-bold text-white">Verify Email</h1>
          <p className="font-inter text-md text-gray-300 mt-4">
            A verification code has been sent, please enter the code below
          </p>

          <form onSubmit={handleOnSubmit} className="flex flex-col items-center gap-8 p-6 mt-8">
            <h2 className="text-3xl font-semibold text-white mb-6">Verify Your Email</h2>

            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span className="text-yellow-500 text-[80px]">-</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  className="w-[80px] h-[80px] border-2 border-gray-300 rounded-lg text-center text-white focus:outline-none focus:ring-2 focus:ring-richBlack-25 focus:border-yellow-500 transition-all duration-300 bg-transparent"
                />
              )}
            />

            <button
              type="submit"
              className="font-inter text-2xl mt-6 bg-yellow-500 hover:bg-yellow-400 text-white p-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full"
            >
              Verify Email
            </button>
          </form>

          <div className="mt-4">
            <Link to="/login">
              <p className="text-yellow-500 hover:text-yellow-400 text-lg">Back to Login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
