import React, { useState } from 'react';
import Alert from '../components/Alert/Alert';
import Loading from '../components/Alert/Loading';
import axios from 'axios';
import { Link } from 'react-router-dom';

const baseURL=import.meta.env.VITE_API_BACKEND;

const ForgotPassword = () => {

    const [email,setEmail]=useState('');
    const [alert,setAlert]=useState();
    const [message,setMessage]=useState();
    const [loading,setLoading]=useState(false);

    const handleSubmit=async (e) => {
        // console.log(email)
        e.preventDefault();
        setLoading(true)
        try {
            const response=await axios.post(baseURL+'/forgot-password',{email},
                {
                    headers:{
                        'Content-Type':'Application/json'
                    }
                }
            )
            setMessage(response.data.message)
            setLoading(false)           
            // console.log(response.data)
        } catch (err) {
            setAlert(err.response.data)
            setLoading(false)
            console.log(err)
        }
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        {alert && <Alert type={alert.type} message={alert.message} onClose={()=>setAlert(null)}  />}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Forgot Password</h2>
        <p className="text-gray-600 text-center mt-2">
          Enter your email address below, and we’ll send you instructions to reset your password.
        </p>
        {
            message?<div>
                <p className='text-green-400 font-medium text-center text-md p-2'>{message}</p>
            </div>:<form className="mt-6" onSubmit={handleSubmit}>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="you@example.com"
              required
            />
            {
                loading?<Loading />:<button
                type="submit"
                className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Send Reset Instructions
              </button>
            }
          </form>
        }
        <p className="text-center text-sm text-gray-600 mt-4">
          Remembered your password?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
