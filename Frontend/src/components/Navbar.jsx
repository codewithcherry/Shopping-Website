import React, { useEffect, useState } from "react";
import { NavLink ,useNavigate} from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import axios from 'axios'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [islogged,setIsLogged]=useState(false)
  const navigate=useNavigate()

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        try {
          const response = await axios.get("http://localhost:3000/validate", {
            headers: { "Authorization": `Bearer ${token}` },
          });
          
          setIsLogged(true); // Assuming you have a state to track login
        } catch (error) {
          setIsLogged(false); // Handle invalid token or server error
        }
      } else {
        setIsLogged(false); // No token found
      }
    };
  
    validateToken();
  }, []);
  

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout =()=>{
    
    localStorage.removeItem('jwtToken')
    setIsLogged(false)
    navigate("/")

  }

  return (
    <nav className="bg-indigo-300 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-2xl font-bold text-white">
              <img src={Logo} alt="Logo" className="h-10" />
            </NavLink>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
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
            {
              islogged && <NavLink
              to="/orders"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-700 font-medium border-b-2 border-indigo-700 p-2"
                  : "text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
              }
            >
              orders
            </NavLink>
            }
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-700 font-medium border-b-2 border-indigo-700 p-2"
                  : "text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
              }
            >
              Cart
            </NavLink>
            {!islogged && <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-700 font-medium border-b-2 border-indigo-700 p-2"
                  : "text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
              }
            >
              Login
            </NavLink>}
            {
              !islogged && <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-700 font-medium border-b-2 border-indigo-700 p-2"
                  : "text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
              }
            >
              Signup
            </NavLink>           
            }
            {islogged && <button className="text-white font-medium hover:text-indigo-700 transition duration-300 p-2" onClick={handleLogout}>logout</button>}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-white hover:text-indigo-300 focus:outline-none"
              onClick={toggleMobileMenu} // Toggle mobile menu on button click
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
      {isMobileMenuOpen && ( // Only render the mobile menu when it's open
        <div className="md:hidden flex flex-col px-4 pb-4 space-y-2">
          <NavLink
            exact
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-700 font-medium border-b-2 border-indigo-700 p-2"
                : "text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
            }
            onClick={toggleMobileMenu} // Close menu on link click
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
            onClick={toggleMobileMenu} // Close menu on link click
          >
            Products
          </NavLink>
          {
              islogged && <NavLink
              to="/orders"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-700 font-medium border-b-2 border-indigo-700 p-2"
                  : "text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
              }
            >
              orders
            </NavLink>
            }
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-700 font-medium border-b-2 border-indigo-700 p-2"
                  : "text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
              }
            >
              Cart
            </NavLink>
            {!islogged && <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-700 font-medium border-b-2 border-indigo-700 p-2"
                  : "text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
              }
            >
              Login
            </NavLink>}
            {
              !islogged && <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-700 font-medium border-b-2 border-indigo-700 p-2"
                  : "text-white font-medium hover:text-indigo-700 transition duration-300 p-2"
              }
            >
              Signup
            </NavLink>           
            }
            {islogged && <button className="text-white font-medium hover:text-indigo-700 transition duration-300 p-2" onClick={handleLogout}>logout</button>}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
