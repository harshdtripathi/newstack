import React from 'react';
import RenderSteps from './RenderSteps';

const AddCourse = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        {/* Left Section */}
        <div className="flex flex-col flex-1 space-y-4">
          <h1 className="text-3xl font-bold text-white text-center">Add Courses</h1>
          <div >
            <RenderSteps />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col bg-richBlack-800 text-white p-4 rounded-lg shadow-lg text-sm w-full h-72 mt-40 md:w-1/3">
          <p className="text-lg font-semibold text-yellow-200 mb-4">Course Upload Tips</p>
          <ul className="list-disc pl-5 space-y-2 ">
            <li>Set the Course Price option or make it free.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
            <li>Make Announcements to notify any important updates.</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
