import React, { useContext, useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'; // Correct Heroicons import
import axios from 'axios';
import Alert from '../../Alert/Alert';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../../Navigation/UserAuthContext';

const baseURL=import.meta.env.VITE_API_BACKEND;

const LoginForm = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [alert, setAlert] = useState(location.state || '');
  const { setIsLogged, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login form submitted');
    const data = JSON.stringify({ email: email, password: password });
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    axios
      .post(baseURL+'/login', data, config)
      .then((res) => {
        setUser(res.data.user);
        setAlert({ type: res.data.type, message: res.data.message });
        if (res.data.type === 'success') {
          localStorage.setItem('jwtToken', res.data.token);
          setIsLogged(true);
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setAlert({
          type: err.response.data.type,
          message: err.response.data.message,
        });
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => { setAlert(null); }} />}
      <div className="flex items-center justify-center bg-gray-100 py-8">
        <div className="w-[80%] lg:w-full max-w-lg  bg-white shadow-2xl rounded-lg flex flex-col ">
          {/* Left Column */}
          <div className="w-full  bg-cover bg-center text-white p-6 rounded-t-lg lg:rounded-l-lg" 
               style={{ backgroundImage: 'url("https://w0.peakpx.com/wallpaper/142/463/HD-wallpaper-minimal-morning-landscape-8k-minimalism-minimalist-artist-artwork-digital-art-morning-sunrise-mountains.jpg")' }}>
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Login to your Account</h2>
              <p className='text-xl font-bold mb-6 '>Welcome Back!</p>
              <p className="text-sm">
              We're happy to see you again. Please log in to continue where you left off.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full  p-6">
            <h2 className="text-2xl font-bold text-gray-900 text-left mb-6">Hello!</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email 
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your password"
                />
                {/* Toggle Icon */}
                <div className="absolute inset-y-0 top-5 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link to={'/forgot-password'} className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Sign In
              </button>
              <div className='flex gap-2'>
                <p className='text-black font-medium'>New user?</p>
                <Link to={'/signup'} className='text-indigo-600 font-medium underline underline-offset-4'>Create your Account</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
