const mongoose = require("mongoose");
const  mailSender =require("../utils/mailsender");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,  // corrected to 'required'
    },
    otp: {
        type: String,
        required: true,
    },
    createdat: {
        type: Date,
        default: Date.now,  // pass Date.now without parentheses
        expires: 5 * 60  // TTL in seconds
    }
});

// function to send email
async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(email, "Verification Email from StudyNotion", otp);
        console.log("Email sent Successfully", mailResponse);
    } catch (e) {
        console.error("Error sending email", e);  // added error logging
    }
}

OTPSchema.pre("save", async function(next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
});

module.exports = mongoose.model("OTP", OTPSchema);
