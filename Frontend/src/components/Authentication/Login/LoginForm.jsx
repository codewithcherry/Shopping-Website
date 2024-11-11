import React, { useContext } from 'react'
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'; // Correct Heroicons import
import axios from 'axios' ;
import Alert from '../../Alert/Alert';
import { useNavigate,useLocation } from 'react-router-dom';
import { AuthContext } from '../../Navigation/UserAuthContext';

const LoginForm = () => {

    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
    const [alert,setAlert]=useState(location.state || '')
    const {setIsLogged }=useContext(AuthContext)

    const navigate=useNavigate()

    const handleSubmit = async(e) => {
      e.preventDefault();
      console.log('Login form submitted');
      // Add your form handling logic here
      const data=JSON.stringify({email:email,password:password});
      const config={
        headers: { 'Content-Type': 'application/json' }
      }
      axios.post("http://localhost:3000/login", data, config)
        .then(res => {
          setAlert({ type: res.data.type, message: res.data.message });
          if (res.data.type === "success") {
            localStorage.setItem('jwtToken', res.data.token);
            setIsLogged(true);
            navigate("/")     
          }
        })
        .catch(err => {
          // console.log(err.response.data)
          setAlert({
            type: err.response.data.type,
            message: err.response.data.message,
          });
        })
    };
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    return (
      <>
      {alert&& <Alert type={alert.type} message={alert.message} onclose={()=>{setAlert(null)}}/>}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
            Login to Your Account
          </h2>
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
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>
  
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
      </>
    );
}

export default LoginForm
