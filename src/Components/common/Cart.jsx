import React from 'react';
import { useSelector } from 'react-redux';
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';
import Sidebar from './Sidebar';

const Cart = () => {
    const { total, totalItems } = useSelector((state) => state.cart);

    return (
        <div className="flex min-h-screen font-inter">
            {/* Sidebar */}
            <div className=" lg:w-1/5 bg-gray-100 sm:block hidden">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="w-full sm:w-3/4 p-6">
                <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                <p className="mb-4">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </p>
                {totalItems > 0 ? (
                    <div className='flex flex-col lg:flex-row justify-between gap-y-6 lg:gap-x-7'>
                        {/* Render Cart Courses */}
                        <div className='w-full lg:w-[80%]'>
                            <RenderCartCourses />
                        </div>

                        {/* Render Total Amount */}
                        <div className='w-full lg:w-[30%] lg:h-[20%] p-4 rounded-md'>
                            <RenderTotalAmount />
                        </div>
                    </div>
                ) : (
                    <p className="flex justify-center items-center text-gray-500">
                        Your Cart is Empty
                    </p>
                )}
            </div>
        </div>
    );
};

export default Cart;
