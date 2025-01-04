import React from 'react';
import image1 from "../assets/images/know_your_progress.svg";
import image2 from "../assets/images/compare_with_others.svg";
import image3 from "../assets/images/plan_your_lessons.svg";
import CTAButton from '../Components/Button';
const photos = [
    { Logo: image1 },
    { Logo: image2 },
    { Logo: image3 },
];

const LearnanyLanguage = () => {
    return (
        <div className='mb-32'>
            <div className="flex flex-col gap-6 items-center w-full justify-center ">
                <div className="text-richBlack-800 text-3xl font-inter font-semibold ml-[25px]">
                    Your swiss knife for <span className="text-blue-50">learning any language</span>
                </div>
                <div className="text-richBlack-500 text-lg w-[60%] text-center">
                    Using spin making learning multiple languages easy. With 20+ languages, realistic voice-over, progress tracking, custom schedule, and more.
                </div>
            </div>

            <div className="flex gap-0 w-full md:w-full ">
                {photos.map((element, index) => (
                    <div key={index} className="gap-0 ">
                        <img src={element.Logo} alt={`Language feature ${index + 1}`} />
                    </div>
                ))}
            </div>
            <div className='flex items-center mx-auto justify-center mt-6'>
            <CTAButton active={true} linkto={"/signup"}>Learn more</CTAButton>


            </div>
            
        </div>
    );
};

export default LearnanyLanguage;
