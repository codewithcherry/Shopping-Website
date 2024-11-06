import React from 'react';
import { NavLink } from 'react-router-dom'; // Make sure you're importing NavLink
import {SlashIcon} from '@heroicons/react/24/solid'

const Breadcrumbs = ({ breadcrumbs }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2">
      <ol className="flex space-x-2 text-sm font-medium text-gray-600">
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <li key={index} className="flex items-center">
              {index !== 0 && (
                <SlashIcon className='text-gray-800 w-6 h-6'/>
              )}
              {breadcrumb.link ? (
                <NavLink
                  to={breadcrumb.link}
                  end  // This ensures that the link is only active if the full path matches
                  className={({ isActive }) =>
                    isActive
                      ? 'text-indigo-600 font-semibold' // Active link style
                      : 'text-gray-700 hover:text-indigo-600'
                  }
                >
                  {breadcrumb.label}
                </NavLink>
              ) : (
                <span className="text-gray-500">{breadcrumb.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
