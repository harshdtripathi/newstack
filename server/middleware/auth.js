const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require("../models/User");

// Authentication Middleware
exports.auth = async (req, res, next) => {
    try {
        // Extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer ", "").trim();
        
       
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        // Verify token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            console.log('Decoded user:', req.user);
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            });
        }

        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong while validating the token",
        });
    }
};

// Role Check Middleware

exports.isStudent=async(req,res,next)=>{
    try{

        if(req.user.accountType!="Student")
        {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Student only',
            });
            
        }
        next();

        
    }
    catch(e)
    {
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified, please try again'
        });

    }


}
exports.isInstructor=async (req,res,next)=>{

    try{

        if(req.user.accountType!="Instructor")
        {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Instructor only',
            });
            
        }
        next();

        
    }
    catch(e)
    {
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified, please try again'
        });

    }
}

exports.isAdmin=async (req,res,next)=>{
    try{

        if(req.user.accountType!="Admin")
        {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Admin only',
            });
            
        }
        next();

        
    }
    catch(e)
    {
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified, please try again'
        });

    }

}