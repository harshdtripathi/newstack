// Import the required modules
const express = require("express")
const router = express.Router()

const { createPaymentIntent } = require("../Controllers/Payments")
const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth")
router.post("/capturePayment", auth, isStudent, createPaymentIntent)
//router.post("/verifySignature",auth, isStudent, handleWebhook)
//router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

module.exports = router