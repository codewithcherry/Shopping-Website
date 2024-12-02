import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import { AuthContext } from "./UserAuthContext";
import {
  UserIcon,
  ShoppingCartIcon,
  BookmarkIcon,
  ClipboardDocumentListIcon,
  MagnifyingGlassIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [inputSearchValue,setInputSearchValue]=useState('');
  const navigate = useNavigate();
  const { isLogged, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsAccountOpen(false);
  };

  const closeDropdownOnClickOutside = (event) => {
    if (!event.target.closest(".account-dropdown")) {
      setIsAccountOpen(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevents form submission
    console.log("Search clicked:", inputSearchValue);

    const query = encodeURIComponent(inputSearchValue); // Ensures proper encoding
    navigate(`/products?query=${query}`);
};

  useEffect(() => {
    document.addEventListener("click", closeDropdownOnClickOutside);
    return () => {
      document.removeEventListener("click", closeDropdownOnClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-indigo-300 shadow-lg z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink to="/" className="text-2xl font-bold text-white">
              <img src={Logo} alt="Logo" className="h-10" />
            </NavLink>
          </div>

          {/* search bar */}
          <div className="flex justify-center items-center w-full ">
            <form
              onSubmit={handleSearch}
              className="flex  items-center rounded-lg px-4 py-2 w-full max-w-md "
            >
              <input
                type="text"
                placeholder="Search..."
                value={inputSearchValue}
                onChange={(e)=>setInputSearchValue(e.target.value)}
                className="p-2 rounded-l-lg w-full outline-none focus:outline-2 focus:outline-indigo-600 focus:outline-offset-0 placeholder:text-gray-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 px-3 py-2 rounded-r-lg text-white hover:bg-indigo-700 transition"
              >
                <MagnifyingGlassIcon className="w-6 h-6" />
              </button>
            </form>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-700 font-medium border-b-2 border-indigo-700 p-2"
                  : "text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-700 font-medium border-b-2 border-indigo-700 p-2"
                  : "text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "flex gap-1 items-center text-indigo-700 font-medium border-b-2 border-indigo-700 p-2"
                  : "flex gap-1 items-center text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
              }
            >
              <ShoppingCartIcon className="w-6 h-6 text-white " />
              Cart
            </NavLink>

            {/* Account Dropdown */}
            <div className="relative account-dropdown">
              <button
                className="flex items-center gap-2 text-white font-medium hover:text-indigo-700 transition duration-300"
                onClick={() => setIsAccountOpen(!isAccountOpen)}
              >
                <UserIcon className="w-5 h-5 text-white" />
                Account
              </button>
              {isAccountOpen && (
                <div className="absolute top-10 -right-24 mt-2 w-48 bg-indigo-300 rounded-lg shadow-lg z-50">
                  {!isLogged && (
                    <NavLink
                      to="/login"
                      className="flex items-center gap-2 p-2 text-white hover:bg-indigo-400 rounded transition duration-300"
                      onClick={() => setIsAccountOpen(false)}
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5" />
                      Login
                    </NavLink>
                  )}
                  {!isLogged && (
                    <NavLink
                      to="/signup"
                      className="flex items-center gap-2 p-2 text-white hover:bg-indigo-400 rounded transition duration-300"
                      onClick={() => setIsAccountOpen(false)}
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5" />
                      Signup
                    </NavLink>
                  )}
                  {isLogged && (
                    <>
                      <NavLink
                        to="/profile"
                        className="flex items-center gap-2 p-2 text-white hover:bg-indigo-400 rounded transition duration-300"
                        onClick={() => setIsAccountOpen(false)}
                      >
                        <UserIcon className="w-5 h-5" />
                        Profile
                      </NavLink>
                      <NavLink
                        to="/wishlist"
                        className="flex items-center gap-2 p-2 text-white hover:bg-indigo-400 rounded transition duration-300"
                        onClick={() => setIsAccountOpen(false)}
                      >
                        <BookmarkIcon className="w-5 h-5" />
                        Wishlist
                      </NavLink>
                      <NavLink
                        to="/orders"
                        className="flex items-center gap-2 p-2 text-white hover:bg-indigo-400 rounded transition duration-300"
                        onClick={() => setIsAccountOpen(false)}
                      >
                        <ClipboardDocumentListIcon className="w-5 h-5" />
                        Orders
                      </NavLink>
                      <button
                        className="flex items-center gap-2 p-2 text-white hover:bg-indigo-400 rounded transition duration-300 w-full text-left"
                        onClick={handleLogout}
                      >
                        <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                        Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-white hover:text-indigo-300 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col px-4 pb-4 space-y-2">
          {/* Mobile navigation links */}
          <NavLink
            to="/"
            className="text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
            onClick={toggleMobileMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className="text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
            onClick={toggleMobileMenu}
          >
            Products
          </NavLink>
          <NavLink
            to="/cart"
            className="text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
            onClick={toggleMobileMenu}
          >
            Cart
          </NavLink>
          {!isLogged && (
            <NavLink
              to="/login"
              className="text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
              onClick={toggleMobileMenu}
            >
              Login
            </NavLink>
          )}
          {!isLogged && (
            <NavLink
              to="/signup"
              className="text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
              onClick={toggleMobileMenu}
            >
              Signup
            </NavLink>
          )}
          {isLogged && (
            <>
              <NavLink
                to="/profile"
                className="text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
                onClick={toggleMobileMenu}
              >
                Profile
              </NavLink>
              <NavLink
                to="/wishlist"
                className="text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
                onClick={toggleMobileMenu}
              >
                Wishlist
              </NavLink>
              <NavLink
                to="/orders"
                className="text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
                onClick={toggleMobileMenu}
              >
                Orders
              </NavLink>
              <button
                className="text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
                onClick={() => {
                  toggleMobileMenu();
                  handleLogout();
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
