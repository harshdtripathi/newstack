import React from 'react'
import { Link } from 'react-router-dom'
import RatingStars from "./RatingStarts"
import GetAvgRating from '../../utils/AvgRating';
import { useState } from 'react';
import { useEffect } from 'react';

const Course_Card = ({course,index}) => {
    const [avgReviewCount, setAvgRatingCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgRatingCount(count);
    }, []);

    return (
        <div className="p-5 w-full max-w-[350px]  shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300">
            <Link to={`/courses/${course._id}`}>
                <div className="relative rounded-md overflow-hidden">
                    <img 
                        src={course?.thumbnail} 
                        alt={`${course?.courseName} Thumbnail`} 
                        className="w-full h-[200px] object-cover"
                    />
                    <div className="absolute top-0 left-0 bg-gradient-to-b from-black/40 to-transparent w-full h-full"></div>
                </div>
            </Link>
            <div className="mt-4">
                {/* Course Title */}
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {course?.courseName}
                </h3>

                {/* Instructor */}
                <p className="text-sm text-gray-600 mt-2">
                    By <span className="font-medium">{course?.instructor?.User?.firstName}</span>
                </p>

                {/* Ratings */}
                <div className="flex items-center mt-3 space-x-2">
                    <span className="text-yellow-500 font-bold">{avgReviewCount || 0}</span>
                    <RatingStars Review_Count={avgReviewCount} />
                    <span className="text-sm text-gray-500">{course?.ratingAndReviews?.length} Ratings</span>
                </div>

                {/* Price */}
                <p className="text-lg font-semibold text-green-600 mt-3">
                    ₹{course?.price}
                </p>
            </div>
        </div>
    );
}

export default Course_Card
