import React from 'react';
import Contactform from '../Components/Contactform';
import { FaMessage } from 'react-icons/fa6';
import { FaEarthAfrica } from 'react-icons/fa6';
import { IoCall } from 'react-icons/io5';
import FooterSection from '../Components/FooterSection';

const ContactUs = () => {
    return (
        <div className='flex flex-col'>
            {/* Main Content */}
            <div className='flex flex-col lg:flex-row lg:w-full  justify-center lg:gap-10  mt-10 px-6'>
                {/* Contact Options */}
                <div className='flex flex-col gap-8 bg-richBlack-700 p-6 md:h-[300px] rounded-lg text-white w-full md:w-[30%]'>
                    {/* Chat on Us */}
                    <div className='flex flex-row gap-3 items-center'>
                        <FaMessage className='text-xl' />
                        <div className='flex flex-col'>
                            <h2 className='font-inter font-semibold'>Chat on Us</h2>
                            <p className='font-inter text-sm opacity-50'>Our friendly team is here to help.</p>
                        </div>
                    </div>
                    {/* Visit Us */}
                    <div className='flex flex-row gap-3 items-center'>
                        <FaEarthAfrica className='text-xl' />
                        <div className='flex flex-col'>
                            <h2 className='font-inter font-semibold'>Visit us</h2>
                            <p className='font-inter text-sm opacity-50'>Come and say hello at our office HQ.</p>
                        </div>
                    </div>
                    {/* Call Us */}
                    <div className='flex flex-row gap-3 items-center'>
                        <IoCall className='text-xl' />
                        <div className='flex flex-col'>
                            <h2 className='font-inter font-semibold'>Call us</h2>
                            <p className='font-inter text-sm opacity-50'>Our friendly team is here to help.</p>
                        </div>
                    </div>
                </div>
                {/* Contact Form */}
                <div className='w-full lg:w-[40%]'>
                    <Contactform />
                </div>
            </div>

            {/* Footer Section */}
            <FooterSection />
        </div>
    );
};

export default ContactUs;
