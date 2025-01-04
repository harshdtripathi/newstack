const Profile=require("../models/Profile")
const User=require("../models/User");
const {imageuploadetocloudinary}=require("../utils/imageuploader");
const  mailsender  = require("../utils/mailsender");





exports.updateProfile = async (req, res) => {
    try {
        // Get user ID from the request
        console.log("kya huaa");
        const id = req.user.id; // dikkat thi underscore id
    
        
        // Check if user ID is present
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }
        console.log("kya kya");

        // Extract fields from the request body
        const { dateOfBirth, about, contactNumber, gender } = req.body;

        // Ensure at least one field to update is provided
        if (!dateOfBirth && !about && !contactNumber && !gender) {
            return res.status(400).json({
                success: false,
                message: "At least one field is required to update",
            });
        }

        // Fetch user and profile details
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        if (!profileDetails) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }
        

        // Update profile fields
        if (dateOfBirth) profileDetails.dateofBirth = dateOfBirth;
        if (about) profileDetails.about = about;
        if (contactNumber) profileDetails.ContactNumber = contactNumber;
        if (gender) profileDetails.gender = gender;

        
        // Save updated profile details
        // await profileDetails.save();
        // console.log("profileDetails",profileDetails);
        // userDetails.additionalDetails = {
        //     gender: profileDetails.gender,
        //     dateOfBirth: profileDetails.dateofBirth,
        //     contactNumber: profileDetails.ContactNumber,
        // };

        // // Save updated user details
        // await userDetails.save();
        const updatedUser = await User.findById(id).populate("additionalDetails");
        

        // Return success response
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser,
            
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.updateProfilePicture=async (req,res)=>{
    try{
        // fetch user

        const id= req.user.id;
        
        
        const getuser= await User.findById(id);
        console.log("here is get user",getuser);
        if(!getuser)
            {
                return res.status(500).json({
                    success:false,
                    message:"cannot find user"
    
                });
            }
           // console.log("checkponint1");
          

            if (!req.files ) {
                return res.status(400).json({
                    success: false,
                    message: "No image file uploaded",
                });
            }
            console.log("checkponint2");
        const image= req.files?.displaypicture;
        console.log("image is",req.files?.displaypicture)
       const result= await imageuploadetocloudinary(image,process.env.FOLDER_NAME);
       console.log("checkponint3");
     

        getuser.image = result.secure_url;
        await getuser.save();
        


        return res.status(200).json({
            success:true,
            message:"image updated successfully"
        });



    }
    catch(e)
    {
        return res.status(404).json({
            success:false,
            message:"image cannot be updated"
        })

    }
}

exports.deleteAccount = async (req, res) => {
    try {
        // Get user ID from request
        const id = req.user.id; // Retrieved from the decoded token in your auth middleware
        console.log("Printing user ID:", id);

        // Fetch user details from the database
        const userDetails = await User.findById(id);
        console.log("User details:", userDetails);

        // Check if the user exists
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        console.log("Step reached: Deleting associated profile");

        // Delete user's profile
        await Profile.findByIdAndDelete(userDetails.additionalDetails);

        // TODO: Unenroll the user from all enrolled courses
        // (Add logic here to remove user from course enrollment records if necessary)

        console.log("Step reached: Deleting user record");

        // Delete the user record
        await User.findByIdAndDelete(id);

        // Send success response
        return res.status(200).json({
            success: true,
            message: "Profile deleted successfully",
        });

    } catch (error) {
        console.error("Error while deleting account:", error);

        // Send error response
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the account",
            error: error.message,
        });
    }
};


exports. getAllUserdetails=async (req,res)=>{
    try{

    const userid=req.user.id;
    console.log("User ID from token---:", userid); 
        
    
    if(!userid)
      {  return res.status(400).json({
    success:false,
    message:" id missing"
                });
            }

            const userDetails=await User.findById(userid);
            if (!userDetails) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            const profileDetails=await userDetails.populate("additionalDetails");
            console.log("Profile details..",profileDetails);
            return res.status(200).json({
                success:true,
                message: "user Details get succesfully",
                userDetails
                
            })


    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching user details",
            error: e.message, // Log the actual error for debugging
        });
}
}

exports.Contactus=async (req,res)=>{
    try{
        const {firstname,lastname,email,message}=req.body;
            // perform validation
            if(!firstname|| !lastname|| !email||!message)
            {
                return res.status(500).json({
                    success:false,
                
                    message:"Please fill out all fields",

                })
            }
         await mailsender(
            email,
            "Thanks for Contacting StudyNotion",
             `<p>Dear ${firstname},</p>
             <p>Thank you for reaching out to us. Our team will contact you shortly.</p>
             <p>Best regards,</p>
             <p>StudyNotion Team</p>` 
         );
         res.status(200).json({
            success:true,
            message:"email has been sent"
         })
           

    }
    catch (error) {
        console.error("Error in Contactus API:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while processing your request. Please try again later.",
        });
    }
    
}

exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id;
  
      // Find user details and populate courses
      const userDetails = await User.findOne({ _id: userId })
        .populate("Courses")
        .exec();

        console.log("USER DETAILS",userDetails);
  
      // If user not found
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userId}`,
        });
      }
  
      // Respond with user's enrolled courses
      return res.status(200).json({
        success: true,
        data: userDetails.Courses, // 'courses' field should match the model
      });
  
    } catch (error) {
      // Catch any unexpected errors
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  