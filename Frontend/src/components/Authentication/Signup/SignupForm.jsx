import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'; // Correct import
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../../Alert/Alert';
import axios from 'axios';

const baseURL=import.meta.env.VITE_API_BACKEND;

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [alert, setAlert] = useState();
  const navigate = useNavigate(); // useNavigate at the component top level

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert({
        type: 'error',
        message: 'Passwords do not match',
      });
    } else {
      const data = JSON.stringify({ email, password });
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };

      axios
        .post(baseURL+'/register', data, config)
        .then((res) => {
          setAlert({ type: res.data.type, message: res.data.message });

          if (res.data.type === 'success') {
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setTimeout(() => {
              navigate('/login');
            }, 3000); // Navigate to login after successful signup
          }
        })
        .catch((err) => {
          setAlert({
            type: 'error',
            message: 'Error in posting',
          });
        });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {alert && (
        <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
      )}
      <div className="flex items-center justify-center bg-gray-100 py-8">
        <div className="w-[80%] lg:w-full max-w-lg bg-white shadow-2xl rounded-lg flex flex-col">
          {/* Left Column */}
          <div
            className="w-full bg-cover bg-center text-white p-6 rounded-t-lg lg:rounded-l-lg"
            style={{
              backgroundImage:
                'url("https://w0.peakpx.com/wallpaper/142/463/HD-wallpaper-minimal-morning-landscape-8k-minimalism-minimalist-artist-artwork-digital-art-morning-sunrise-mountains.jpg")',
            }}
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Create Your Account</h2>
              <p className="text-xl font-bold mb-6">Welcome!</p>
              <p className="text-sm">
                We're excited to have you join us. Please fill out the form to create your account.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 text-left mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
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
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirm-password"
                  name="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Confirm your password"
                />
                {/* Toggle Icon */}
                <div className="absolute inset-y-0 top-5 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Existing User */}
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
                  <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Already have an account? Log in
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
