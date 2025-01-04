

import React from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import CTAButton from '../Components/Button';
import banner from "../assets/images/banner.mp4"
import CodeBloks from '../Components/CodeBloks';
import GetSkills from '../Components/GetSkills';
import LearnanyLanguage from '../Components/LearnanyLanguage';
import BecomeInstructor from '../Components/BecomeInstructor';
import FooterSection from '../Components/FooterSection';
import ExploreMore from '../Components/ExploreMore';

const Home = () => {
    return (
        <div >
            <section className=' relative mx-auto flex flex-col w-11/12 items-center justify-between max-w-maxContent '>
                <Link to={"/signup"}>
                    <div className='flex flex-row mt-16  p-2 rounded-full shadow-ctaButtonShadow mx-auto bg-richBlack-800 text-richblack-200 transition-all duration-200 hover:scale-110 ' >

                        <button className='flex flex-row gap-3 ml-8 mr-7 items-center '> Become an Instructor
                            <FaLongArrowAltRight />

                        </button>


                    </div>
                </Link>
                <div className='mt-10   text-3xl font-inter font-bold   '>

                    Empower Your Future with <span className='text-blue-100'>Coding Skills</span>
                </div>
                <div className='font-inter text-lg mt-4 w-[90%] text-center text-richBlack-300 '>
                    With Our Online Coding Courses you can learn At your own pace, from anywhere in the world and get access to

                    a wealth of resources including hands on project,quizzes, and personalized feedback from Instructor.
                </div>

                <div className='flex  gap-7 mt-7 items-center '>

                    <CTAButton active={true} linkto={"/signup"}   >
                        Learn More
                    </CTAButton>

                    <CTAButton active={false} linkto={"/login"}>
                        Book Demo
                    </CTAButton>
                </div>

                <div className="mt-10  w-[87%] h-[87%] shadow-2xl md:w-11/12 rounded-lg  md:h-[515px]   shadow-blue-300">
                    {<video
                        muted
                        loop
                        autoPlay



                        controls loading="eager" >
                        <source src={banner} type="video/mp4" />

                    </video>}
                </div>
                <div className='mx-auto mt-10 md:mt-24 flex flex-col md:flex-row items-center'>
                    <CodeBloks
                        position="lg:flex-row"
                        heading={
                            <div className='text-xl md:text-2xl font-semibold text-center md:text-left'>
                                Unlock your <span className='text-blue-100'>coding potential </span>with our online courses
                            </div>
                        }
                        paragraph={
                            <div className='text-md md:text-lg font-semibold text-richBlack-300 text-center md:text-left'>
                                Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
                            </div>
                        }
                        ctabtn1={{
                            btnText: "Try it Yourself",
                            linkto: "/signup",
                            active: true,
                        }}
                        ctabtn2={{
                            btnText: "Learn more",
                            linkto: "/login",
                            active: false,
                        }}
                        codeblock={
                            `<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a></nav>`
                        }
                    />
                </div>

                <div className='mx-auto mt-10 md:mt-24 flex flex-col md:flex-row items-center '>
                    <CodeBloks position={"lg:flex-row-reverse"}

                        codeblock={
                            `<!DOCTYPE html>\n<html>\nhead>\n<title>Example\n</title><linkrel="stylesheet"href="styles.css">\n /head\n <body>\n h1><ahref="/">Header</a>\n</h1>\nnav><ahref="one/">One</a><ahref="two/">\nTwo</a><ahref="three/">Three</a>`
                        }

                        heading={<div className='text-xl md:text-2xl font-semibold text-center md:text-left  '>
                            Start  <span className='text-blue-100'>coding in Seconds </span>
                        </div>}
                        paragraph={<div className='text-md md:text-lg font-semibold text-richBlack-300 text-center md:text-left '>
                            Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.  </div>}
                        ctabtn1={
                            {
                                btnText: "Continue Lesson",
                                linkto: "/signup",
                                active: true,

                            }

                        }

                        ctabtn2={
                            {
                                btnText: "learn more",
                                linkto: "/login",
                                active: false,

                            }

                        }




                    >

                    </CodeBloks>






                </div>
                <ExploreMore></ExploreMore>

            </section>
            {/*section2*/}

            <section className='bg-white text-richblack-700 '>
                <div className='homepage_bg h-[333px] ' >
                    <div className='w-11/12 max-w-maxContent flex justify-center items-center gap-5 flex-col'>
                        <div className='flex flex-row gap-7 mt-48  items-center   '>
                            <CTAButton active={true} linkto={"/signup"} >
                                Explore full catalogue
                                <FaLongArrowAltRight />
                            </CTAButton>

                            <CTAButton>
                                Learn more
                            </CTAButton>

                        </div>
                    </div>
                </div>
                <div className='flex mx-auto w-11/12 max-w-maxContent items-center mt-20'>
                    <div className='flex flex-col md:flex-row items-center gap-8 md:gap-48'>
                        <div className='font-semibold text-3xl text-richBlack-800 w-full md:w-[40%] text-center md:text-left'>
                            <p> Get the skills you need<span className='text-blue-100'> for a job that is in demand</span>.</p>
                        </div>

                        <div className='font-semibold text-md text-richBlack-800 flex flex-col gap-7 w-full md:w-[40%] text-center md:text-left  md:mt-0'>
                            The modern StudyNotion dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            <CTAButton active={true} linkto={"/signup"}>
                                Learn more
                            </CTAButton>
                        </div>
                    </div>
                </div>

                <GetSkills> </GetSkills>

                <div className='w-11/12 mx-auto flex flex-col max-w-maxContent mt-[150px]'>
                    <LearnanyLanguage></LearnanyLanguage>
                </div>
            </section>

            {/* become instructor section*/}
            <section className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 mt-'>
                <BecomeInstructor></BecomeInstructor>

                <div className='flex items-center justify-center mb-10 text-3xl'>
                    <p className='mt-12'>Reviews from other learners</p>
                    {/*data will be available after posting reviews*/}
                </div>




            </section>
            <div className=' mt-28 w-full   bg-richBlack-800'>
                {/*footer section*/}
                <FooterSection></FooterSection>

            </div>




        </div>
    )
}



export default Home
