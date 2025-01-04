const Category=require("../models/Category");
const Course =require("../models/Course")
// create tag 

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }
exports.createCategory= async  (req,res)=>{

    try{
        const {name,description,course}= req.body;
        if(!name ||!description){
            return res.status(400).json({
                success:false,
                message: "all fields are required"
            })
        }
        // create entry in db
        const tagDetails=await Category.create({name:name,description:description})
        return res.status(200).json({
            success:true,
            message: "tag created successfully",
            tagDetails,
        })

    }
    catch(e) {
        return res.status(400).json({
            success:false,
            message:"tag cannot be created"
        });
    }
    
}

// get all tags

exports.showAllCategory=async (req,res) =>{
    try{ 
        const allTags=await Category.find({},{name:true,description:true});
        console.log("here is the tag",allTags);
        res.status(200).json({
            success:true,
            message:"All tags return successfully",
            allTags
        });

    }
    catch(e){

        return res.status(400).json({
            success:false,
            message:"tag cannot be created"
        });

    }
}
// 


const mongoose = require("mongoose");

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;
    
    console.log("Here is categoryId:", categoryId);

    // Validate categoryId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }
    console.log("Flag1");

    // Fetch selected category with its courses
    const selectedCategory = await Category.findById(categoryId)
  .populate({
    path: "course",
    match: { status: "Published" }, // Only include courses with status 'Published'
    populate: [
      { path: "ratingAndReviews" }, // Populate reviews for each course
      { path: "instructor", select: "firstName lastName" }, // Populate instructor's name
    ],
  })
  .exec();


    //console.log("SelectedCategory:", selectedCategory);

    // If no category is found
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Courses for selected category not found",
      });
    }
    console.log("Flag2");

    // Fetch other categories and their courses
    const differentCategories = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate({
        path: "course",
        match: { status: "Published" },
      })
      .exec();

    console.log("Flag3");

    // Fetch top-selling courses
    const topSellingCourses = await Course.find({ status: "Published" })
      .sort({ studentsEnrolled: -1 })
      .limit(10)
      .populate("ratingAndReviews"); // Populate reviews for top-selling courses

    // Build the `course` array for the response
    const courseArray = selectedCategory.course.map(course => ({
      id: course._id,
      name: course.name,
      description: course.description,
      ratings: course.ratingAndReviews,
    }));

    // Send the response
    res.status(200).json({
      success: true,
      data: {
        selectedCategory: {
          id: selectedCategory._id,
          name: selectedCategory.name,
          description: selectedCategory.description,
          courses: courseArray, // Include the course array here
        },
        differentCategories: differentCategories.map(category => ({
          id: category._id,
          name: category.name,
          courses: category.course, // Include the courses in other categories
        })),
        topSellingCourses, // Include top-selling courses as-is
      },
    });
    console.log("Flag4");
  } catch (error) {
    console.error("Error in categoryPageDetails:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
