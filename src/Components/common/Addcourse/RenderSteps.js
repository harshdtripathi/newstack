import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from '../CourseBuilder/CourseBuilderForm';
import PublishCourse from './PublishCourse';
const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);
  const steps = [
    { id: 1, title: "Course Information" },
    { id: 2, title: "Course Builder" },
    { id: 3, title: "Publish" },
  ];

  return (
    <div className="space-y-4">
      {/* Steps Navigation */}
      <div className="flex items-center space-x-4 text-white">
        {steps.map((item, index) => (
          <React.Fragment key={item.id}>
            {/* Step Indicator */}
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step === item.id
                  ? "bg-yellow-300 text-richBlack-900"
                  : step > item.id
                  ? "bg-green-500 text-white"
                  : "bg-richBlack-400 text-gray-300"
              }`}
            >
              {step > item.id ? <FaCheck /> : item.id}
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className="flex-grow h-1 bg-gray-500"></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Titles */}
      <div className="flex justify-between text-sm text-gray-300">
        {steps.map((item) => (
          <p
            key={item.id}
            className={`${
              step === item.id ? "font-bold text-yellow-300" : "text-gray-400"
            }`}
          >
            {item.title}
          </p>
        ))}
      </div>

      {/* Step Content */}
      <div className="mt-8 w-[60%] justify-center items-center mx-auto">
        {step === 1 && <CourseInformationForm />}
       {step === 2 && <CourseBuilderForm />} 
         {step === 3 && <PublishCourse />} 
      </div>
    </div>
  );
};

export default RenderSteps;
