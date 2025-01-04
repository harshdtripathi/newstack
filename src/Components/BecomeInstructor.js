import React from 'react';
import instructor from "../assets/images/instructor.png";
import CTAButton from '../Components/Button';

const BecomeInstructor = () => {
  return (
    <div className="flex flex-col md:flex-row gap-10 md:gap-20 lg:gap-52 mt-16 items-center">
      <div className="w-full md:w-[50%] shadow-glowingShadow rounded-sm">
        <img src={instructor} className="w-full" alt="Instructor" />
      </div>
      <div className="flex flex-col text-white mt-8  md:ml-10">
        <div className="text-2xl md:text-3xl font-inter font-semibold text-center md:text-left">
          Become an <span className="text-blue-100">instructor</span>
        </div>
        <div className="text-md md:text-lg text-richBlack-600 font-inter mt-4 md:mt-6 w-full md:w-[80%] text-center md:text-left">
          Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
          <div className="mt-8 md:mt-14 flex justify-center md:justify-start">
            <CTAButton active={true}>Start Learning Today</CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BecomeInstructor;
