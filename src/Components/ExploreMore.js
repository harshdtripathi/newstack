import React, { useState } from 'react';
import { HomePageExplore } from "../data/homepage";
import CourseCard from './CourseCard';

const tabsName = [
    "Free",
    "New to Coding",
    "Most Popular Skills Paths",
    "Career Path",
];

const ExploreMore = () => {
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        if (result.length > 0) {
            setCourses(result[0].courses);
            setCurrentCard(result[0].courses[0].heading);
        }
    };

    return (
        <div className='font-semibold text-3xl items-center text-center mt-8 text-richBlack-400'>
            <div>
                Unlock The <span className='text-blue-100'>Power of Code</span>
            </div>
            <p className='text-center text-richBlack-300 text-sm mt-3'>
                Learn to build anything you can imagine
            </p>
            <div className='flex gap-4 justify-center mt-4'>
                {tabsName.map((element, index) => (
                    <div
                        className={`text-[16px] flex items-center gap-2 px-4 py-2 cursor-pointer rounded-full ${
                            currentTab === element ? "text-richBlack-800 font-medium" : "text-richBlack-200"
                        } hover:ring-2 hover:ring-richBlack-900`}
                        key={index}
                        onClick={() => setMyCards(element)}
                    >
                        {element}
                    </div>
                ))}
            </div>
            <div className='lg:h-[150px] mt-20'>
                <div className=' flex flex-col md:flex md:flex-row gap-8  '>
                    {
                        courses.map((element,index)=>{
                            return (
                                <CourseCard
                                key={index}
                                cardData={element}
                                currentCard={currentCard}
                                setCurrentCard={setCurrentCard}

                                
                                >

                                </CourseCard>
                            )
                                
                            
                        })
                    }
                </div>

            </div>
        </div>
    );
};

export default ExploreMore;
