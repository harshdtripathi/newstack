import React from 'react';
import Photo1 from "../assets/images/aboutus1.webp"
import Photo2 from "../assets/images/aboutus2.webp"
import Photo3 from "../assets/images/aboutus3.webp"
import ourstoryimg from "../assets/images/foundingStory.png"
import { Link } from 'react-router-dom';
import ContactForm from './ContactForm';
import FooterSection from '../Components/FooterSection';


const images = [
    {
        title: Photo1
    },
    {
        title: Photo2
    },
    {
        title: Photo3
    }
];
const Aboutus = () => {
    return (
        <div className='flex flex-col gap-16 justify-center items-center w-11/10'>
            <div className='flex flex-col justify-center items-center mt-[5%] font-inter gap-7 px-4 sm:px-6 lg:px-0'>
                <h2 className="text-xl sm:text-2xl lg:text-3xl">About Us</h2>
                <p className='text-2xl sm:text-3xl lg:text-4xl font-bold text-white w-full sm:w-[600px] lg:w-[800px] text-center'>
                    Driving Innovation in Online Education for a
                    <span className='text-blue-50 block'>Brighter Future</span>
                </p>
                <p className='w-full sm:w-[600px] lg:w-[800px] font-inter text-center opacity-50'>
                    Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing
                    <span className='block text-center'>a vibrant learning community.</span>
                </p>
            </div>

            <div className='flex flex-wrap justify-center gap-6 mt-10'>
                {images.map((image, key) => (
                    <img
                        key={key}
                        src={image.title}
                        alt={`About Us Image ${key + 1}`}
                        className='w-72 sm:w-80 h-48 sm:h-64 object-cover rounded-md'
                    />
                ))}
            </div>

            <div className='mt-20 text-center w-11/12 sm:w-10/12 lg:w-8/12 text-lg sm:text-xl lg:text-3xl bg-blend-luminosity font-semibold px-4'>
                <span className='opacity-40 text-3xl sm:text-4xl lg:text-5xl'>"</span>We are passionate about revolutionizing the way we learn. Our innovative platform <span className='text-blue-200'>combines technology</span>,<span className='text-yellow-100'>expertise</span>, and community to create an <span className='text-brown-200'>unparalleled educational experience</span>.<span className='opacity-40 text-3xl sm:text-4xl lg:text-5xl'>"</span>
            </div>
            <div className='flex flex-col lg:flex-row justify-center gap-6 items-center px-4 sm:px-6 lg:px-8'>
                {/* Text Section */}
                <div className='flex flex-col mt-12 lg:ml-32 lg:mt-24 w-full lg:w-1/2'>
                    <h1 className="font-semibold font-inter text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-blue-500 via-yellow-400 to-teal-400 text-transparent bg-clip-text">
                        Our Founding Story
                    </h1>
                    <p className='text-sm opacity-40 mt-8 w-full sm:w-4/5 lg:w-3/5 text-left'>
                        Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                    </p>
                    <p className='mt-3 text-sm opacity-40 w-full sm:w-4/5 lg:w-3/5 text-left'>
                        As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                    </p>
                </div>

                {/* Image Section */}
                <div className='w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0'>
                    <img src={ourstoryimg} alt="Our Founding Story" className='w-full lg:mr-24 sm:w-4/5 lg:w-3/4 object-cover rounded-md' />
                </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-center items-center mt-16 lg:mt-40 gap-12 lg:gap-24">
                <div className="flex flex-col lg:flex-row justify-center items-start gap-8 lg:gap-12 mt-16 lg:mt-24 px-6 sm:px-10 lg:px-16">
                    {/* Vision Section */}
                    <div className="flex flex-col gap-4 w-full lg:w-1/2 lg:ml-6 lg:mr-6">
                        <h1 className="font-semibold font-inter text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-400 text-transparent bg-clip-text">
                            Our Vision
                        </h1>
                        <p className="mt-3 text-sm opacity-40 text-left">
                            With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                        </p>
                    </div>

                    {/* Mission Section */}
                    <div className="flex flex-col gap-4 w-full lg:w-1/2 lg:ml-6 lg:mr-6">
                        <h1 className="font-semibold font-inter text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-blue-50 via-blue-25 to-blue-25 text-transparent bg-clip-text">
                            Our Mission
                        </h1>
                        <p className="mt-3 text-sm opacity-40 text-left">
                            Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                        </p>
                    </div>
                </div>

            </div>

            <div className='flex flex-col md:flex-row justify-evenly items-center sm:text-brown-100 bg-richBlack-600 opacity-50 w-full h-auto md:h-[254px] py-6 md:py-0'>
                {/* Active Students */}
                <div className='flex flex-col items-center md:items-start mb-4 md:mb-0'>
                    <p className='font-inter text-2xl'>5K</p>
                    <p className='text-center md:text-left'>active Students</p>
                </div>
                {/* Mentors */}
                <div className='flex flex-col items-center md:items-start mb-4 md:mb-0'>
                    <p className='font-inter text-2xl'>10+</p>
                    <p className='text-center md:text-left'>Mentors</p>
                </div>
                {/* Courses */}
                <div className='flex flex-col items-center md:items-start mb-4 md:mb-0'>
                    <p className='font-inter text-2xl'>200+</p>
                    <p className='text-center md:text-left'>Courses</p>
                </div>
                {/* Awards */}
                <div className='flex flex-col items-center md:items-start'>
                    <p className='font-inter text-2xl'>50+</p>
                    <p className='text-center md:text-left'>Awards</p>
                </div>
            </div>

            <div className='flex flex-col lg:flex-row justify-center items-center'>
                {/* Text Section */}
                <div className='flex flex-col gap-3 text-left w-full lg:w-[40%] font-inter mt-[-100px] px-4'>
                    <h1 className='font-semibold text-2xl sm:text-3xl'>
                        World Class learning for
                        <span className='text-blue-100'> Anyone, Anywhere</span>
                    </h1>
                    <p className='text-sm opacity-40'>
                        Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.
                    </p>
                    <div Link to="/login" className='bg-yellow-25 text-black w-32 p-2 font-semibold mt-14 rounded-lg text-center cursor-pointer'>
                        Learn More
                    </div>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full lg:w-[40%] ml-0 lg:ml-10 font-inter text-white p-4">
                    {/* Grid Items */}
                    <div className="col-span-1 bg-richBlack-600 p-5 rounded-md">
                        Curriculum Based on Industry Needs
                        <p className='opacity-40 text-sm'>
                            Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.
                        </p>
                    </div>
                    <div className="col-span-1 bg-richBlack-600 p-5 rounded-md">
                        Our Learning Methods
                        <p className='opacity-40 text-sm'>
                            Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.
                        </p>
                    </div>
                    <div className="col-span-1 bg-richBlack-600 p-5 rounded-md">
                        Certificaton
                        <p className='opacity-40 text-sm'>
                            Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.
                        </p>
                    </div>
                    <div className="col-span-1 bg-richBlack-600 p-5 rounded-md">
                        Rating "Auto-grading"
                        <p className='opacity-40 text-sm'>
                            Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.
                        </p>
                    </div>
                    <div className="col-span-1 bg-richBlack-600 p-5 rounded-md">
                        Ready to Work
                        <p className='opacity-40 text-sm'>
                            Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.
                        </p>
                    </div>
                </div>
               
            </div>
            <ContactForm></ContactForm>
            <FooterSection></FooterSection>




        </div>

    );
};

export default Aboutus;
