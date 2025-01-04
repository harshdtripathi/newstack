import React from 'react';
import * as Icons from "react-icons/vsc";
import { matchPath, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const SidebarLink = ({ link, iconName }) => {
  const Icon = Icons[iconName];
  const location = useLocation();

  const matchRoute = (route) => {
    // Ensure matchPath returns a truthy value for the current path
    return matchPath({ path: route, end: true }, location.pathname);
  };

  const isActive = matchRoute(link.path);

  return (
    <NavLink
      to={link.path}
      className={`relative px-8 py-2 text-sm font-medium ${
        isActive ? "lg:bg-yellow-25 bg-transparent" : "bg-opacity-0"
      }`}
    >
      {/* Active state indicator */}
      <span
        className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      ></span>

      <div className="flex items-center gap-x-2">
        {/* Render the icon if valid */}
        {Icon && <Icon className="text-lg" />}
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
};

export default SidebarLink;
