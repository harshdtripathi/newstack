const express = require("express")
const router = express.Router()

const {
  deleteAccount,
  updateProfile,
  getAllUserdetails,
  updateProfilePicture ,
  Contactus,
  
  getEnrolledCourses
  
  
} = require("../Controllers/Profile")


// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth")
const {isDemo}=require("../middleware/dummyuser");
// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile",auth,  deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserdetails)
router.post("/updateDisplayPicture",auth, updateProfilePicture)
router.post("/Contactus",Contactus);
router.get("/getEnrolledCourses",auth,getEnrolledCourses);
// Get Enrolled Courses


module.exports = router