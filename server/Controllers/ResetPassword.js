
const mailSender=require("../utils/mailsender")
const User=require("../models/User");
const bcrypt=require("bcrypt");
const crypto=require("crypto");

// resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try {
      const { email } = req.body;
  
      // Check if user exists
      const isUser = await User.findOne({ email });
      console.log(isUser);
      if (!isUser) {
        return res.status(400).json({
          success: false,
          message: 'User does not exist',
        });
      }
  
      // Generate a token
      const token = crypto.randomUUID();
  
      // Generate reset URL
      const url = `http://localhost:3000/update-password/${token}`;
  
      // Update user's token and expiration time
      await User.findOneAndUpdate(
        { email },
        {
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 5 * 60 * 1000, // Token valid for 5 minutes
        },
        { new: true }
      );
  
      // Send email with the reset link
      const emailBody = `
        <h1>Password Reset Request</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${url}" target="_blank">${url}</a>
        <p>This link is valid for 5 minutes. If you did not request this, please ignore this email.</p>
      `;
      await mailSender(email, "Password Reset", emailBody);
  
      return res.status(200).json({
        success: true,
        message: 'Email sent successfully',
      });
    } catch (e) {
      console.error('Error in resetPasswordToken:', e);
      return res.status(500).json({
        success: false,
        message: 'Something went wrong',
      });
    }
  };
  
// reset password vala page pe pahuch gye

exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword, confirmPassword } = req.body;

        // Check if any fields are missing
        if (!newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Check if the passwords match
        if (newPassword !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Confirm password does not match with new password",
            });
        }

        // Get user details from the database using token
        const userDetails = await User.findOne({ resetPasswordToken: token });

        // If no user is found, return an invalid token error
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: 'Token is invalid',
            });
        }

        // Check if the token has expired
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: 'Token has expired',
            });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password and clear the token and expiration
        await User.findOneAndUpdate(
            { resetPasswordToken: token },
            {
                password: hashedNewPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null,
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: 'Password cannot be reset',
        });
    }
};
