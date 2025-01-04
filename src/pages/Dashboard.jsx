import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/common/Sidebar';

const Dashboard = () => {
    const { loading: authLoading } = useSelector((state) => state.auth);
    const { loading: profileLoading } = useSelector((state) => state.profile);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    if (profileLoading || authLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-200">
                <div className="text-xl font-medium animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <div className="relative flex flex-row min-h-screen bg-gray-100">
            {/* Toggle Button for Sidebar */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="absolute top-28 left-36 z-50  lg:hidden bg-richBlack-600 hover:bg-richBlack-5 text-white p-2 rounded-md shadow-md"
            >
                {isSidebarOpen ? 'Close Menu' : 'Open Menu'}
            </button>

            {/* Sidebar */}
            <div
                className={`absolute lg:relative z-40 transition-transform duration-300 bg-richblack-800 lg:min-w-[222px] lg:block ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <Sidebar />
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-auto">
                <div className="mx-auto w-11/12 max-w-[1000px] mt-[200px] lg:mt-0 py-10 px-4 lg:px-0">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
