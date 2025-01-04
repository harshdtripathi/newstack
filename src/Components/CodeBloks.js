import React from 'react';
import PropTypes from 'prop-types';
import CTAButton from '../Components/Button';
import { FaLongArrowAltRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

const CodeBloks = ({ heading, paragraph, ctabtn1, ctabtn2, codeblock, position }) => {
  
  return (
    <div className={`flex flex-col md:flex-row ${position} my-10 md:my-20 justify-between gap-8`}>
      <div className="w-full md:w-[50%] flex flex-col gap-8 px-4 md:px-0">
        <div className="font-inter font-bold flex-col gap-y-4">
          {heading}
          <br />
          {paragraph}
        </div>

        <div className="flex mt-5 gap-4 flex-wrap">
          {ctabtn1 && (
            <CTAButton
              active={ctabtn1.active}
              linkto={ctabtn1.linkto}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              Continue Lesson
              <FaLongArrowAltRight />
            </CTAButton>
          )}
          {ctabtn2 && (
            <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
              Learn more
            </CTAButton>
          )}
        </div>
      </div>

      <div className="w-full md:w-[40%] flex flex-col md:flex-row gap-0 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded-lg overflow-hidden">
    <div className="w-full md:w-[10%] flex md:flex-col flex-wrap text-center text-richblack-400 font-inter bg-richblack-800 p-2">
        {Array.from({ length: 7 }, (_, index) => (
            <p key={index}>{index + 1}</p>
        ))}
    </div>

    <div className="w-full md:w-[90%] flex flex-col gap-2 font-bold  p-4 md:pr-2 text-yellow-50 bg-richblack-900">
        <TypeAnimation
            sequence={[codeblock, 1000, ""]}
            repeat={Infinity}
        />
    </div>
</div>

    </div>
  );
};



export default CodeBloks;
