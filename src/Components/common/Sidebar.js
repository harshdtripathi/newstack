import React, { useState } from 'react';
import { sidebarLinks } from '../../data/dashboard-link';
import { logout } from '../../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import SidebarLink from './SidebarLink';
import { VscSettingsGear, VscSignOut } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';

const Sidebar = () => {
    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);

    if (profileLoading || authLoading) {
        return (
            <div className="mt-10">
                Loading...
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 lg:flex lg:flex-col lg:min-w-[222px] border-b-[1px] lg:border-b-0 lg:border-r-[1px] border-richBlack-700 bg-richblack-800 overflow-auto px-4 lg:px-0 py-4 lg:py-10">
            {/* Sidebar Links */}
            <div className="flex col-span-3 lg:flex-col">
                {sidebarLinks.map((value) => {
                    if (value.type && user?.accountType !== value.type) return null;
                    return (
                        <SidebarLink link={value} key={value.id} iconName={value.icon} />
                    );
                })}
            </div>

            {/* Divider */}
            <div className="hidden lg:block lg:mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richBlack-400" />

            {/* Settings Link */}
            <div className="col-span-3 lg:flex lg:flex-col">
                <SidebarLink
                    link={{ name: "Settings", path: "dashboard/settings" }}
                    iconName="VscSettingsGear"
                />
            </div>

            {/* Logout Button */}
            <button
                onClick={() =>
                    setConfirmationModal({
                        text1: "Are you sure?",
                        text2: "You will be logged out of your account.",
                        btn1Text: "Logout",
                        btn2Text: "Cancel",
                        btn1Handler: () => {
                            dispatch(logout(navigate));
                            setConfirmationModal(null);
                        },
                        btn2Handler: () => setConfirmationModal(null),
                    })
                }
                className="col-span-3 lg:mt-4 lg:ml-8 text-sm font-medium text-richblack-300"
            >
                <div className="flex items-center gap-4">
                    <VscSignOut className='text-xl' />
                    <span>Logout</span>
                </div>
            </button>

            {/* Confirmation Modal */}
            {confirmationModal && (
                <ConfirmationModal modalData={confirmationModal} />
            )}
        </div>
    );
};

export default Sidebar;
