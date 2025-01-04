import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { GrLanguage } from 'react-icons/gr';
import { formatDate } from '../services/Formatdate';

const CoursedetailCard = ({ coursedata }) => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  return (
    <div className="w-full bg-gradient-to-br from-richBlack-900 to-richBlack-800 text-white font-inter flex flex-col p-6 rounded-lg shadow-lg mt-6 lg:mt-0">
      {/* Breadcrumb */}
      <p className="text-lg text-gray-300">
        Home / Learning /{' '}
        <span className="text-yellow-300 font-edu-sa ">
          {coursedata?.courseDetails?.courseName}
        </span>
      </p>

      {/* Course Details */}
      <div className="mt-6">
        <p className="text-4xl font-semibold text-gray-100 ">
          {coursedata?.courseDetails?.courseName}
        </p>
        <p className="text-sm text-gray-400 mt-2">
          This {coursedata?.courseDetails?.courseName} for beginners course will
          help you to become Zero to Hero. Learn it in Easy Way.
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-4">
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"
          />
        </div>

        <p className="text-sm text-gray-500 mt-2">Created by Instructor Name</p>
        <p>Created At {formatDate(coursedata.courseDetails?.createdAt)}</p>

        {/* Language */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mt-4">
          <GrLanguage size={18} />
          <p>English</p>
        </div>
      </div>
    </div>
  );
};

export default CoursedetailCard;
