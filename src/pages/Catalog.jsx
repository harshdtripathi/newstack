import React, { useEffect, useState } from 'react'
import FooterSection from '../Components/FooterSection'
import { useParams } from 'react-router-dom'
import { getCatalogPageData } from '../services/operations/pageAndComponenetdata';
import { apiConnector } from '../services/apiconnector';
import { categories } from "../services/api"
import CourseSlider from '../Components/common/CourseSlider';
import Course_Card from '../Components/common/Course_Card';
const Catalog = () => {

    const { catalogName } = useParams();
    const [catalogPagedata, setCatalogPagedata] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [loading, setLoading] = useState(false);
    const [activecourse, setActivecourse] = useState(false);

    // fetch all categories
    // jab bho catalog vala page render ho to bhaiya pehle render pe lete aana


    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            try {
                const res = await apiConnector("GET", categories.CATEGORIES_API);

                // Ensure data exists and filter for the matching category name
                const category = res?.data?.allTags?.find(
                    (ct) =>
                        ct.name.split(" ").join("-").toLowerCase() ===
                        catalogName.split(" ").join("-").toLowerCase()
                );

                // Extract the category ID if found
                const category_id = category?._id || null;

                console.log("Category ID is: ", category_id);

                setCategoryId(category_id);
                console.log("yaa", categoryId);
            } catch (error) {
                console.error("Error fetching categories: ", error);
            } finally {
                setLoading(false);
            }
        };

        getCategories();
    }, [catalogName]);








    useEffect(() => {
        const getCategoryDetails = async () => {
            try {
                const res = await getCatalogPageData(categoryId);
                console.log("getting result from getcatalogdata...", res);
                setCatalogPagedata(res);
                console.log("pagedata", catalogPagedata);
            }
            catch (e) {
                console.log(e.message);

            }
        }
        getCategoryDetails();
    }, [categoryId])
    return (
        <div className='text-white  font-inter '>

            <div className='flex flex-col bg-richBlack-800 w-full h-[200px] '>
                <div className='felx flex-col mt-10 ml-8'>
                    <p >Home/Catalog/<span className='font-edu-sa text-yellow-25'>{catalogPagedata?.data?.selectedCategory?.name}</span></p>
                    <p className='text-3xl font-semibold text-white mt-10'>{catalogPagedata?.data?.selectedCategory?.name}</p>
                    <p>{catalogPagedata?.data?.selectedCategory?.description}</p>
                </div>
            </div>
            {/* section 1 */}
            <div className='flex flex-col gap-3 mt-[60px] ml-8 mx-auto'>
                <div className='font-inter text-3xl '>Courses to get you started</div>
                <div className='flex  flex-row gap-x-5  '>
                    <img src={catalogPagedata?.data?.topSellingCourses?.thumbnail}></img>
                    <p >Most Popular</p>
                    <p>New</p>
                    <p>trending</p>
                </div>
                <div class="w-full h-0.5 bg-richBlack-500"></div>
                <div className='flex  '>
                <CourseSlider Courses={catalogPagedata?.data?.topSellingCourses}  ></CourseSlider>
                </div>

            </div>
            <div class="w-full h-0.5 bg-richBlack-500"></div>
            {/* section 2 */}

            <div className='mt-10'>
                <p className='font-inter text-3xl mb-4 hover:text-yellow-100 ml-6'>Top Courses</p>
                <div>
                    <CourseSlider Courses={catalogPagedata?.data?.topSellingCourses}></CourseSlider>
                </div>

            </div>
            <div class="w-full h-0.5 bg-richBlack-500"></div>

            <div className='mt-[120px]'>

                <p className='font-inter text-3xl mb-8 ml-6  hover:text-yellow-100 font-semibold'>Frequently bought Courses</p>
                <div className="grid grid-cols-3  lg:grid-cols-2 mx-auto lg:ml-40  ">
                    {catalogPagedata?.data?.topSellingCourses?.slice(0, 4).map((course, index) => (
                        <Course_Card
                            course={{
                                _id: course?._id,
                                courseName: course.courseName,
                                thumbnail: course.thumbnail,
                                price: course.price,
                                instructor: course?.instructor?.firstName, // Add other desired properties here
                                ratingAndReviews:course?.ratingAndReviews
                            }}
                            key={index}
                        />
                    ))}
                </div>
            </div>




        </div>
    )
}

export default Catalog;

