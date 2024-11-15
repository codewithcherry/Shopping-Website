import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import { AuthContext } from "./UserAuthContext";
import { UserIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const navigate = useNavigate();
  const { isLogged, logout } = useContext(AuthContext);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-indigo-300 shadow-lg z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-2xl font-bold text-white">
              <img src={Logo} alt="Logo" className="h-10" />
            </NavLink>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
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
              <ShoppingCartIcon className="w-6 h-6 text-white hover:text-indigo-700" /> Cart
            </NavLink>
            {/* Account Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsAccountOpen((prev) => !prev)}
                className="flex gap-1 items-center text-white hover:text-indigo-700 transition duration-300 p-2 focus:outline-none"
              >
                <UserIcon className="w-5 h-5" />
                <p className="text-md font-medium">Account</p>
              </button>
              {isAccountOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-indigo-300 rounded-lg shadow-lg flex flex-col z-50">
                  {!isLogged && (
                    <NavLink
                      to="/login"
                      className="text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
                      onClick={() => setIsAccountOpen(false)}
                    >
                      Login
                    </NavLink>
                  )}
                  {!isLogged && (
                    <NavLink
                      to="/signup"
                      className="text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
                      onClick={() => setIsAccountOpen(false)}
                    >
                      Signup
                    </NavLink>
                  )}
                  {isLogged && (
                    <NavLink
                      to="/profile"
                      className="text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
                      onClick={() => setIsAccountOpen(false)}
                    >
                      Profile
                    </NavLink>
                  )}
                  <NavLink
                    to="/orders"
                    className="text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
                    onClick={() => setIsAccountOpen(false)}
                  >
                    Orders
                  </NavLink>
                  <NavLink
                    to="/wishlist"
                    className="text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
                    onClick={() => setIsAccountOpen(false)}
                  >
                    Wishlist
                  </NavLink>
                  {isLogged && (
                    <button
                      className="text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
                      onClick={() => {
                        handleLogout();
                        setIsAccountOpen(false);
                      }}
                    >
                      Logout
                    </button>
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
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-700 font-medium border-b-2 border-indigo-700 p-2"
                : "text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
            }
            onClick={toggleMobileMenu}
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
            onClick={toggleMobileMenu}
          >
            Products
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-700 font-medium border-b-2 border-indigo-700 p-2"
              : "text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
            }
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
            <NavLink
              to="/profile"
              className="text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
              onClick={toggleMobileMenu}
            >
              Profile
            </NavLink>
          )}
          <NavLink
            to="/orders"
            className="text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
            onClick={toggleMobileMenu}
          >
            Orders
          </NavLink>
          <NavLink
            to="/wishlist"
            className="text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
            onClick={toggleMobileMenu}
          >
            Wishlist
          </NavLink>
          {isLogged && (
            <button
              className="text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
              onClick={() => {
                handleLogout();
                toggleMobileMenu();
              }}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
