import React from 'react'
import Logo1 from "../assets/logo/logo1.svg"
import Logo2 from "../assets/logo/logo2.svg"
import Logo3 from "../assets/logo/logo3.svg"
import Logo4 from "../assets/logo/logo4.svg"
import timelineimage from "../assets/images/timelineimage.png"


const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description: "Fully committed to success company"
    },
    {
        Logo: Logo2,
        heading: "Responsibility",
        Description: "Student will always be our Priority"
    },
    {
        Logo: Logo3,
        heading: "Flexibility",
        Description: "The ability to Switch is an important skill"
    },
    {
        Logo: Logo4,
        heading: "Solve the Problem",
        Description: "Code your way to solution"
    },
]

const GetSkills = () => {


    return (
        <div className='w-11/12 max-w-maxContent mt-10 md:mt-28 mx-auto'>
    <div className='grid grid-cols-1 md:flex flex-row gap-8 items-center text-richBlack-400'>
        
     
        <div className='flex flex-col gap-6 md:gap-10 mx-auto w-full md:w-[50%]'>
            {timeline.map((element, index) => (
                <div className='flex items-start gap-4 md:gap-6' key={index}>
                    <div className='w-12 h-12 bg-white flex items-center justify-center'>
                        <img src={element.Logo}  />
                    </div>
                    <div className='flex flex-col'>
                        <h2 className='text-lg md:text-xl font-semibold text-richBlack-800'>{element.heading}</h2>
                        <p className='text-sm md:text-base text-richBlack-400'>{element.Description}</p>
                    </div>
                </div>
            ))}
        </div>

        {/* Timeline Image Section */}
        <div className='w-35% md:w-[55%] h-auto shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]'>
            <img src={timelineimage} alt="Timeline" className="w-full h-full object-cover" />

           
        </div>
        
    </div>
</div>
    )
}

export default GetSkills
