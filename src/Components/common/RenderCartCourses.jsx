import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from '../../slices/cartSlice';
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa";

const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col flex-1 px-4 py-6 md:px-8 lg:px-16">
      {cart.map((course, indx) => (
        <div
          key={course._id}
          className={`flex flex-wrap items-start justify-between gap-6 
            w-full md:w-[90%] 
            ${indx !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"} 
            ${indx !== 0 && "mt-6"}`}
        >
          {/* Course Details */}
          <div className="flex flex-col gap-4 md:flex-row md:flex-1">
            {/* Thumbnail */}
            <img
              src={course?.courseDetails.thumbnail}
              alt={course?.courseDetails?.courseName}
              className="h-[120px] w-full rounded-lg object-cover sm:h-[148px] sm:w-[220px]"
            />

            {/* Text Details */}
            <div className="flex flex-col space-y-2" >
              <p className="text-lg font-medium text-richblack-5 truncate">
                {course?.courseDetails?.courseName}
              </p>
              <p className="text-sm text-richblack-300">
                {course?.courseDetails.category?.name}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-yellow-5 text-sm md:text-base">4.5</span>
                <ReactStars
                  count={5}
                  value={course?.courseDetails?.ratingAndReviews?.length}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
                <span className="text-richblack-400 text-xs md:text-sm">
                  {course?.courseDetails?.ratingAndReviews?.length} Ratings
                </span>
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className="flex flex-col items-center md:items-end">
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center gap-x-1 rounded-md border border-richblack-600 
                bg-richblack-700 py-2 px-4 text-pink-200 
                hover:bg-yellow-300 hover:text-richblack-800 transition-all"
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
            <p className="mt-4 text-xl font-medium text-yellow-100 md:text-3xl">
              ₹ {course?.courseDetails?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderCartCourses;
