const RatingAndReview = require("../models/RatingAndreview");
const Course = require("../models/Course");
const mongoose = require("mongoose");

// Create Rating and Review
exports.createRatingAndReviews = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rating, review, courseId } = req.body;

    // Validate input
    if (!rating || !review || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Rating, review, and course ID are required.",
      });
    }

    // Check if user is enrolled in the course
    const isEnrolled = await Course.findOne({
      _id: courseId,
      studentsEnrolled: userId, // Assuming `studentsEnrolled` is an array of user IDs
    });

    if (!isEnrolled) {
      return res.status(400).json({
        success: false,
        message: "User is not enrolled in this course.",
      });
    }

    // Check if user has already reviewed the course
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Course has already been reviewed by this user.",
      });
    }

    // Create new rating and review
    const newRating = await RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });

    // Update the course with the new rating and review
    await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratingAndReviews: newRating._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Rating and review created successfully.",
      newRating,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "Failed to create rating and review.",
    });
  }
};

// Get Average Rating
exports.getAverageRating = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required.",
      });
    }

    // Calculate average rating
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId), // Convert string to ObjectId
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    return res.status(200).json({
      success: true,
      message: "No ratings found for this course.",
      averageRating: 0,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "Failed to get average rating.",
    });
  }
};

// Get All Ratings
exports.getAllRating = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required.",
      });
    }

    // Fetch all ratings for a specific course
    const allRatings = await RatingAndReview.find({ course: courseId })
      .sort({ rating: "desc" })
      .populate("user", "name") // Populating the user and course fields with selected details
      .populate("course", "title");

    return res.status(200).json({
      success: true,
      message: "All ratings fetched successfully.",
      allRatings,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "Failed to fetch ratings.",
    });
  }
};
