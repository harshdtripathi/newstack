import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserEnrolledCourses } from '../../services/operations/ProfileAPI';
import ProgressBar from "@ramonak/react-progress-bar";
import Sidebar from './Sidebar';

const EnrolledCourses = () => {
    const { token } = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchEnrolledCourses = async () => {
        setLoading(true);
        try {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
            console.log("RESPONSE", response);
        } catch (e) {
            console.log(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnrolledCourses();
    }, []);

    return (
        <div className="flex flex-col md:flex-row gap-6 md:gap-16 w-full p-4 md:p-8 rounded-md">
    <Sidebar />
  
    <div className="flex flex-col gap-5 justify-center items-center font-inter w-full text-white">
        {/* Page Header */}
        <div className="flex flex-col gap-4 justify-start text-center mt-16 md:mt-12 md:text-left">
            <h1 className="text-2xl md:text-3xl mt-4 font-bold text-yellow-300">Enrolled Courses</h1>
            <p className="font-edu-sa text-gray-400">
                Home / Dashboard / <span className="font-edu-sa text-yellow-300">Enrolled Courses</span>
            </p>
        </div>

        {/* Course Content */}
        <div className="w-full mt-8 md:mt-14">
            {loading ? (
                <div className="flex justify-center items-center text-xl md:text-2xl">
                    <p className="text-yellow-300 animate-pulse">Loading...</p>
                </div>
            ) : !enrolledCourses || enrolledCourses.length === 0 ? (
                <p className="text-center text-lg text-gray-400 mt-6">
                    You have not enrolled in any course yet.
                </p>
            ) : (
                <div className="flex flex-col gap-10 md:gap-12 w-full border-richBlack-600 bg-gradient-to-br from-richBlack-800 to-richBlack-900 rounded-lg shadow-lg  ">
                    {/* Table Headers */}
                    <div className="hidden md:flex flex-row bg-gray-800 justify-between items-center px-4 md:px-6 py-3 rounded-lg font-bold bg-richBlack-500 shadow-lg">
                        <p>Course Name</p>
                        <p className="translate-x-[90px]">Duration</p>
                        <p className="-translate-x-[80px]">Progress</p>
                    </div>

                    {/* Enrolled Courses */}
                    {enrolledCourses.map((course, index) => (
                        <div
                            key={index}
                            className="flex flex-col md:flex-row justify-between items-center bg-gray-700 px-4 md:px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* Course Details */}
                            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center w-full md:w-1/2">
                                <img
                                    src={course.thumbnail || "https://via.placeholder.com/150"}
                                    alt="Course Thumbnail"
                                    className="w-16 h-16 rounded-md shadow-md"
                                />
                                <div className="text-center md:text-left">
                                    <p className="font-bold text-lg text-yellow-200">
                                        {course.courseName}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {(course.courseDescription || "").slice(0, 20)}...
                                    </p>
                                </div>
                            </div>

                            {/* Duration */}
                            <p className="text-gray-300 text-center w-full md:w-1/4 mt-2 md:mt-0">
                                {course.totalDuration || "1h 20min"} mins
                            </p>

                            {/* Progress */}
                            <div className="flex flex-col items-center w-[40%] md:w-1/4 mt-2 md:mt-0">
                                <p className="mb-1">Progress: {course.progresspercentage || 0}%</p>
                                <ProgressBar
                                    completed={course.progresspercentage || 0}
                                    bgColor="#facc15"
                                    baseBgColor="#2d3748"
                                    height="10px"
                                    labelSize="0px"
                                    className="w-full md:w-40"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
</div>
    );
        
};

export default EnrolledCourses;
