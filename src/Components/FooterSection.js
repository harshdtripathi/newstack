import React from 'react';
import FooterLink2 from "../data/footerlinks";

const Resources = [
    { Res1: "Articles" },
    { Res1: "Blogs" },
    { Res1: "Chart Sheet" },
    { Res1: "Code Challenge" },
    { Res1: "Docs" },
    { Res1: "Projects" },
    { Res1: "Videos" },
];

const Company = [
    { type: "About" },
    { type: "Careers" },
    { type: "Affiliate" },
];

const Plans = [
    { type: "Paid memberships" },
    { type: "For students" },
    { type: "Business solution" },
];

const Community = [
    { type: "Forums" },
    { type: "Chapters" },
    { type: "Events" },
];

const FooterSection = () => {
    return (
        <div className="flex flex-col lg:flex-row justify-between bg-richBlack-900 text-richBlack-200 py-10 px-4 lg:px-14">
            {/* Company, Resources, Plans, and Community Section */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-full">
                <div className="flex flex-col gap-5">
                    <div className="font-semibold font-inter text-richBlack-25 text-lg">Company</div>
                    <ul className="flex flex-col gap-3 text-sm">
                        {Company.map((element, index) => (
                            <li key={index}>{element.type}</li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col gap-5">
                    <div className="font-semibold font-inter text-richBlack-25 text-lg">Resources</div>
                    <ul className="flex flex-col gap-3 text-sm">
                        {Resources.map((resource, index) => (
                            <li key={index}>{resource.Res1}</li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col gap-5">
                    <div className="font-semibold font-inter text-richBlack-25 text-lg">Plans</div>
                    <ul className="flex flex-col gap-3 text-sm">
                        {Plans.map((plan, index) => (
                            <li key={index}>{plan.type}</li>
                        ))}
                    </ul>

                    <div className="font-semibold font-inter text-richBlack-25 text-lg mt-6">Community</div>
                    <ul className="flex flex-col gap-3 text-sm">
                        {Community.map((item, index) => (
                            <li key={index}>{item.type}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block w-px h-auto bg-richBlack-600 mx-8"></div>

            {/* FooterLink2 Section */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-full mt-10 lg:mt-0">
                {FooterLink2.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="flex flex-col gap-5">
                        <div className="font-semibold font-inter text-richBlack-25 text-lg">{section.title}</div>
                        <ul className="flex flex-col gap-3 text-sm">
                            {section.links.map((linkItem, linkIndex) => (
                                <li key={linkIndex}>
                                    <a
                                        href={linkItem.link}
                                        className="hover:text-blue-100 transition-colors duration-200"
                                    >
                                        {linkItem.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FooterSection;
