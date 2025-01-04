const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const { v4: uuid } = require("uuid");
const Course = require("../models/Course");
const mailSender = require("../utils/mailsender");
const User = require("../models/User")
const courseEnrollmentEmail = require("../mailtemplates/courseEnrollmentEmail");
exports.createPaymentIntent = async (req, res) => {
    const { courseId, email, paymentMethodId } = req.body; // Receive email and payment method ID from frontend
    const userId= req.user.id;
    console.log("USER_ID",userId);

    if (!courseId) {
        return res.status(400).json({ success: false, message: "No course provided" });
    }

    try {
        // Find the course by courseId
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: `Course ${courseId} not found` });
        }

        if (!course.price || course.price <= 0) {
            return res.status(400).json({ success: false, message: "Invalid course price" });
        }

        // Create a customer in Stripe
        const customer = await stripe.customers.create({
            email: email,
            payment_method: paymentMethodId,
            invoice_settings: { default_payment_method: paymentMethodId },
        });

        // Create a payment intent
        const idempotencyKey = uuid();
        const paymentIntent = await stripe.paymentIntents.create({
            amount: course.price * 100, // Convert to smallest currency unit
            currency: "inr",
            customer: customer.id,
            receipt_email: email,
            metadata: { courseId: courseId }, // Pass courseId in metadata
        }, { idempotencyKey });

        console.log("step");
           
        await enrollStudent(courseId,userId,res);

        return res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
        }

    
    );
    } catch (error) {
        console.error("Error creating payment intent:", error);
        return res.status(500).json({ success: false, message: "Could not create payment intent", error: error.message });
    }
};

const enrollStudent = async (courseId, userId) => {
    try {
        // Update the course with the student ID
        console.log("function started");
        const enrolledCourse = await Course.findByIdAndUpdate(
            courseId,
            { $push: { studentsEnrolled: userId } },
            { new: true }
        );
        console.log("ENROLLED COURSE",enrolledCourse)

        if (!enrolledCourse) {
            throw new Error("Course enrollment failed");
        }

        // Update the user with the course ID
        const enrolledStudent = await User.findByIdAndUpdate(
            userId,
            { $push: { Courses: courseId } },
            { new: true }
        );
        console.log("ENROLLED STUDENT",enrolledStudent)


        if (!enrolledStudent) {
            throw new Error("User enrollment failed");
        }
        console.log("function started 33");
       // Send an enrollment email
        await mailSender(
            enrolledStudent.email,
            `Welcome to your new course!`,
            courseEnrollmentEmail(enrolledCourse.courseName, enrolledStudent.firstName)
        );

        return { success: true,
           


         };
    } catch (error) {
        console.error("Error enrolling student:", error);
        return { success: false, error: error.message };
    }
};