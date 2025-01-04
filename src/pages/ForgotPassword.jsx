import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';

const ForgotPassword = () => {
    const { loading } = useSelector((state) => state.auth);
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent));

       
        

        // TODO: Replace with actual API call logic
        console.log(`Password reset email sent to: ${email}`);
        
    };

    const handleResend = () => {
        // TODO: Add resend email logic
        console.log(`Resending password reset email to: ${email}`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="p-6 bg-white rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-center">
                        {!emailSent ? 'Reset Your Password' : 'Check Your Email'}
                    </h1>
                    <p className="text-gray-600 text-center mt-2">
                        {!emailSent
                            ? 'Have no fear! We will email you instructions to reset your password.'
                            : `We have sent you an email at ${email}.`}
                    </p>
                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                        {!emailSent && (
                            <label >
                                <span className="text-blue-900">Email Address:</span>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="w-full px-4 py-2 mt-1 text-black border rounded-md  "
                                />
                            </label>
                        )}
                        <button
                            type={emailSent ? 'button' : 'submit'}
                            onClick={emailSent ? handleResend : null}
                            className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        >
                            {!emailSent ? 'Reset Password' : 'Resend Email'}
                        </button>
                        <div className="text-center">
                            <Link to="/login" className="text-blue-500 hover:underline">
                                Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
