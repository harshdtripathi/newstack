// signup
// login
// senotp
// changePassword
const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt=require("bcrypt");
const Profile=require("../models/Profile");
const JWT= require("jsonwebtoken")
require("dotenv").config(); 
const mailsender=require("../utils/mailsender");

exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const checkUserPresent = await User.findOne({ email });
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: 'User is already registered',
            });
        }
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        let result = await OTP.findOne({ otp });
        let maxRetries = 5;  // Limit retries to prevent infinite loop
        while (result && maxRetries > 0) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp });
            maxRetries--;
        }

        const otpPayload = { email, otp };
        const otpBody = await OTP.create(otpPayload);

        // return response successful
        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            otp,
        });



    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: "OTP cannot be generated",

        })

    }
}

exports.signUp = async (req, res) => {
    try {
        const { email, firstName, lastName, password, confirmPassword, accountType, otp } = req.body;
        console.log({email},{firstName},{lastName},{password},{confirmPassword},{accountType},{otp});
        // VALIDATING data
        if (!firstName || !lastName || !email || !password || !confirmPassword || !accountType || !otp) {

            return res.status(403).json({
                success: false,
                message: "user cannot be registerd"
            })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password and confirmPassword values do not match'
            })
        }

        // check user exist
        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return res.status(400).json({
                success: true,
                message: "user already exist",
            });
        }
        console.log("Instructor")
        // find most recent otp 
        const recentOTP = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log("here is the otp", recentOTP)
        // validate OTP

        if (recentOTP.length == 0 || recentOTP[0].otp.trim() !== otp.trim()) {
            return res.status(400).json({
                success: false,
                message: "OTP is not valid",
            });
        }
        console.log("INSTRUCTOR");
        
        // hashed passsword
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);

        }
        catch (e) {
            return res.status(500).json({
                success: false,
                message: `Hashing password error for ${password}: ` + error.message,
            });


        }
        // entry in DB

        const profileDetails = await Profile.create({
            gender: null,
            dateofBirth: null,
            about: null,
            contactNumber: null,
        });
        const newUser = await User.create(
            {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                accountType,
                additionalDetails: profileDetails,
                image: `https://api.dicebear.com/9.x/initials/svg?seed=${firstName}.${lastName}`,

            }
        )
        console.log("NEWUSER",newUser);
        return res.status(200).json({
            success: true,
            message: "user is registerd successfully",
            newUser,
        });

    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: "user cannot be registerd .Please try again "
        })

    }
}
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User does not exist.",
            });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect.",
            });
        }

        // Generate JWT
        const payload = {
            email: user.email,
            id: user._id,
            accountType: user.accountType,
        };

        console.log( "here is the user id",payload.id);
        const token = JWT.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2h",
           
        });
         console.log("here is the token",token);

        // Optionally remove the password from the user object
        user.password = undefined;

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        // Create cookie and send response
        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: 'Logged in successfully.',
        });
    } catch (e) {
        console.error(e); // Log the error for debugging
        return res.status(500).json({
            success: false,
            message: "Login failure. Please try again.",
        });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword, confirmNewPassword } = req.body;

        // Validate input fields
        if (!email || !oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Check if new password matches the confirm password
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "New password and confirm password do not match",
            });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Verify old password
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Old password is incorrect",
            });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedNewPassword;
        await user.save();

        
        try{
            const mailSent=await mailSender({email},"Password Update Mail from StudyNotion");
            console.log("mail sent successfully",mailSent);
        }
        catch(e)
        {
            return res.status(401).json({
                succes:fals,
                message:"mail cannot be sent",
            });
        }
          

        return res.status(200).json({
            success: true,
            message: 'Password updated successfully',
        });

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Error updating password",
        });
    }
};
