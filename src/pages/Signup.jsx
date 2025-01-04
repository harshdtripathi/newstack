import React from 'react';
import Signf from '../Components/auth/Signf';
import image from "../assets/images/signup.webp";

const Signup = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center lg:justify-evenly gap-6 lg:gap-0 px-4 lg:px-8 py-8 lg:py-16">
      {/* Image Section for smaller screens */}
      <div className="lg:hidden w-full mb-8">
        <div className="shadow-glowingShadow rounded-xl w-full h-auto">
          <img src={image} alt="Signup illustration" className="w-full h-full object-cover rounded-xl" />
        </div>
      </div>
      
      {/* Form Section */}
      <div className="flex flex-col w-full lg:w-[40%] lg:mt-8 gap-4">
        <div className="text-3xl font-inter font-bold">
          Welcome back
        </div>
        <div className="font-mono">
          Discover your Passion,<br />
          be unstoppable
        </div>
        <Signf />
      </div>

      {/* Image Section for larger screens */}
      <div className="lg:block hidden shadow-glowingShadow mt-8 lg:mt-[120px] rounded-xl w-full lg:w-[30%] h-auto lg:h-[50%]">
        <img src={image} alt="Signup illustration" className="w-full h-full object-cover rounded-xl" />
      </div>
    </div>
  );
}

export default Signup;
