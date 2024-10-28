import React from 'react'
import { Link , useLocation} from 'react-router-dom';
import {
    HomeIcon,
    HeartIcon,
    InboxIcon,
    ClipboardIcon,
    TableCellsIcon,
    CalendarIcon,
    CheckCircleIcon,
    UserIcon,
    DocumentTextIcon,
    ChartBarIcon,
    CogIcon,
    PowerIcon,
    Bars3Icon,
  } from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';
import { useState } from 'react';


const NavItem = ({ item, isOpen, isActive }) => (
    <Link
      to={item.path}
      className={`flex items-center space-x-3 text-md p-2 my-2 rounded-md hover:bg-indigo-600 hover:text-white transition-colors duration-200 ${
        isActive ? 'bg-indigo-600 text-white' : ' '
      }`}
    >
      <item.icon className={isOpen?"w-4 h-4":'w-5 h-5 rounded-full'} />
      <span className={`${isOpen ? 'block' : 'hidden'} origin-left duration-200`}>
        {item.name}
      </span>
    </Link>
  );

const SideNavigation = () => {
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();
  
    const navItems = [
      { name: 'Dashboard', icon: HomeIcon, path: '/admin/dashboard' },
      { name: 'Products', icon: TableCellsIcon, path: '/admin/dashboard/products' },
      { name: 'Inbox', icon: InboxIcon, path: '/admin/dashboard/inbox' },
      { name: 'Order Lists', icon: ClipboardIcon, path: '/admin/dashboard/orders' },
      { name: 'Product Stock', icon: ClipboardIcon, path: '/admin/dashboard/product-stock' },
    ];
  
    const pages = [
      { name: 'Calendar', icon: CalendarIcon, path: '/admin/dashboard/calendar' },
      { name: 'To-Do', icon: CheckCircleIcon, path: '/admin/dashboard/to-do' },
      { name: 'Contact', icon: UserIcon, path: '/admin/dashboard/contact' },
      { name: 'Invoice', icon: DocumentTextIcon, path: '/admin/dashboard/invoice' },
      { name: 'Team', icon: UserIcon, path: '/admin/dashboard/team' },
     
    ];
  
    const footerItems = [
      { name: 'Settings', icon: CogIcon, path: '/admin/dashboard/settings' },
      { name: 'Logout', icon: PowerIcon, path: '/admin/dashboard/logout' },
    ];
    return (
      <>
        {/* Sidebar */}
        <div
          className={`${
            isOpen ? 'w-64' : 'w-20'
          } bg-white h-svh p-5 pt-8 duration-300 relative text-black shadow-xl rounded-sm`}
        >
          {/* Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute right-0 top-9 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer"
          >
            {isOpen ? <Bars3Icon className='w-6 h-6 mr-2'/> : <Bars3Icon className='w-6 h-6 absolute -inset-6 mb-2'/>}
          </button>
          {/* Logo */}
          <div className="flex items-center ">
            <span className={`text-2xl font-bold text-indigo-600 mb-2 ${isOpen ? '' : 'hidden'}`}>
              MyShop
            </span>
          </div>
  
          {/* Navigation Links */}
          <div>
            {/* Main Links */}
            <div>
              <h3 className={`text-gray-600 text-sm   ${isOpen ? 'block' : 'hidden'}`}>
                Main
              </h3>
              {navItems.map((item) => (
                <NavItem
                  key={item.name}
                  item={item}
                  isOpen={isOpen}
                  isActive={location.pathname === item.path}
                />
              ))}
            </div>
            {/* Pages Links */}
            <div className="mt-4">
              <h3 className={`text-gray-600  text-sm  ${isOpen ? 'block' : 'hidden'}`}>
                Pages
              </h3>
              {pages.map((item) => (
                <NavItem
                  key={item.name}
                  item={item}
                  isOpen={isOpen}
                  isActive={location.pathname === item.path}
                />
              ))}
            </div>
          </div>
  
          {/* Footer Links */}
          <div className="mt-auto">
            {footerItems.map((item) => (
              <NavItem
                key={item.name}
                item={item}
                isOpen={isOpen}
                isActive={location.pathname === item.path}
              />
            ))}
          </div>
        </div>
        </>
      
    );
}

export default SideNavigation
