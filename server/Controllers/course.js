const Courses = require("../models/Course");
const Category = require("../models/category");
const User = require("../models/User");
const { imageuploadetocloudinary } = require("../utils/imageuploader");
const Section = require("../models/Section");


// Consider importing SubSection if you are using it

// Create course handler function
exports.createCourse = async (req, res) => {
  try {
    // Fetch data
    const { courseName, courseDescription, category, whatYouWillLearn, price } = req.body;
    console.log({ courseName }, { courseDescription }, { whatYouWillLearn }, { category }, { price });
    const thumbnail = req.files.thumbnailImage;



    // Validation
    if (!courseName || !courseDescription || !category || !price || !thumbnail) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }


    // Check for instructor
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);
    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor details not found"
      });
    }

    // Check given category is valid
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    // Upload image to Cloudinary
    const thumbnailImage = await imageuploadetocloudinary(thumbnail, process.env.FOLDER_NAME);
    console.log("this is thumbnail image ", thumbnailImage);
    // Create entry for new course
    const newCourse = await Courses.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      //whatYouWillLearn,
      price,
      category: categoryDetails._id, // Ensure you're using categoryDetails._id
      thumbnail: thumbnailImage.secure_url,
    });

    // Add the new course to user schema
    await User.findByIdAndUpdate(
      instructorDetails._id,
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    // Add the new course to the category
    await Category.findByIdAndUpdate(
      categoryDetails._id,
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      newCourse
    });

  } catch (e) {
    console.error("Error creating course:", e); // Log the error for debugging
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};



exports.getallCourse = async (req, res) => {
  try {
    const allCourses = await Courses.find({}, {
      courseName: true,
      price: true,
      thumbnail: true,
      instructor: true,
      ratingAndReviews: true,
      studentEnrolled: true
    }).populate("instructor");

    return res.status(200).json({
      success: true,
      message: "Data for all courses fetched successfully",
      allCourses
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses"
    });
  }


}



exports.getCourseDetails = async (req, res) => {
  try {
    //get id
    const { courseId } = req.body;
    //find course details
    const courseDetails = await Courses.findById(courseId)
      .populate(
        {
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        }
      )
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          //select: "-videoUrl",
        },
      })
      .exec();

      console.log("COURSEDETAILS",courseDetails);

    //validation
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course with ${courseId}`,
      });
    }

    // let totalDurationInSeconds = 0
    // courseDetails.courseContent.forEach((content) => {
    //   content.subSection.forEach((subSection) => {
    //     const timeDurationInSeconds = parseInt(subSection.timeDuration)
    //     totalDurationInSeconds += timeDurationInSeconds
    //   })
    // })

    // const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
    //return response
    return res.status(200).json({
      success: true,
      message: "Course Details fetched successfully",
      data: {
        courseDetails,
        // totalDuration
      },
    })

  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

exports.showAllCourses = async (req, res) => {
  try {
    const allcourses = await Courses.findById({}, {
      courseName: true,
      courseDescription: true,
      price: true,
      instructor,
      ratingAndReviews: true,
      studentEnrolled: true

    }

    ).populate("instructor").exec();

    return res.status(200).json({
      success: true,
      message: "details shown successfully"
    });


  }
  catch (e) {

    return res.status(500).json({
      success: false,
      message: "course details cannot be found"
    });

  }
}

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const getCourse = await Courses.findById(courseId);
    if (!getCourse) {
      return res.status(400).json({
        success: false,
        message: "Course not found",
      });
    }

    // Unenroll the students
    const studentsEnrolled = getCourse.studentsEnrolled;
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      });
    }

    // Delete sections and subsections
    const courseSections = getCourse.courseContent;
    for (const sectionId of courseSections) {
      const section = await Section.findById(sectionId);
      if (section) {
        const subSections = section.subSection;
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId);
        }
      }
      await Section.findByIdAndDelete(sectionId);
    }

    await Courses.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (e) {
    console.error("Error occurred while deleting course:", e);
    return res.status(500).json({
      success: false,
      message: "Failed to delete course",
    });
  }
};

exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId) {
      return res.status(400).json({ success: false, message: "Course ID is required" });
    }

    const updates = req.body;
    console.log("Received updates:", updates);

    // Check if the course exists
    const course = await Courses.findById(courseId);
    console.log("Course fetched from DB:", course);

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // If Thumbnail Image is found, update it
    if (req.files && req.files.thumbnailImage) {
      console.log("Updating thumbnail image...");
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await imageuploadetocloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      course.thumbnail = thumbnailImage.secure_url;
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key) && key !== "courseId") {
        course[key] = updates[key];
      }
    }

    // Save the course
    await course.save();

    // Populate the updated course
    console.log("jhessss");
    const updatedCourse = await Courses.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      // .populate({
      //   path: "courseContent",
      //  populate: {
      //   path: "Section",
      //    },
      // })
      .exec();

    console.log("Updated course:", updatedCourse);

    return res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Error in editCourse:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
