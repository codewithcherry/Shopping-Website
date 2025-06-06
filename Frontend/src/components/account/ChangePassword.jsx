import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon ,LockClosedIcon} from '@heroicons/react/24/solid';
import axios from 'axios';

const baseURL=import.meta.env.VITE_API_BACKEND;

const ChangePassword = ({setAlert}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showForm,setShowForm]=useState(false);

  const token=localStorage.getItem('jwtToken');

  // Validation states
  const [isValidLength, setIsValidLength] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);

  const validatePassword = (password) => {
    // Check for password length
    setIsValidLength(password.length >= 8);

    // Check for at least one lowercase letter
    setHasLowercase(/[a-z]/.test(password));

    // Check for at least one uppercase letter
    setHasUppercase(/[A-Z]/.test(password));

    // Check for at least one number
    setHasNumber(/\d/.test(password));

    // Check for at least one special character
    setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(password));
  };

  const resetPassword = async (oldpass, newpass) => {
    const data = {
      oldPassword: oldpass,
      newPassword: newpass,
    };
  
    try {
      const response = await axios.post(baseURL+'/user/change-password', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Handle success response
      setAlert({ type: 'success', message: response.data.message });
  
      // Reset form fields and validation states
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsValidLength(false);
      setHasLowercase(false);
      setHasUppercase(false);
      setHasNumber(false);
      setHasSpecialChar(false);
      setShowForm(false);
    } catch (error) {
      // Handle error response
      setAlert({ type: 'error', message: error.response?.data?.message || 'Something went wrong' });
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setAlert({type:"warn",message:"Passwords don't match!"});
    } else {   
      resetPassword(oldPassword,newPassword)
    }
  };

  const isFormValid =isValidLength && hasLowercase && hasUppercase && hasNumber && hasSpecialChar && newPassword === confirmPassword;

  return (
    <div className="max-w-4xl mt-6 mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className='flex gap-1 items-center hover:cursor-pointer' onClick={()=>setShowForm(!showForm)}>
        <LockClosedIcon className='w-6 h-6 text-gray-700'/>
      <h2 className="text-xl font-semibold ">Change Password</h2>
      </div>
      
      {showForm && <form onSubmit={handleSubmit}>
      <p className='text-left  text-sm text-red-500 mb-4'>Enter old password and reset it with the new password below</p>
        {/* Old Password */}
        <div className="max-w-md mb-4 relative">
          <label htmlFor="old-password" className="block text-sm font-medium text-gray-700">Old Password</label>
          <input
            type={showOldPassword ? 'text' : 'password'}
            id="old-password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <div
            className="absolute right-3 top-[65%] transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowOldPassword(!showOldPassword)}
          >
            {showOldPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </div>

        {/* New Password */}
        <div className="max-w-md mb-4 relative">
          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type={showNewPassword ? 'text' : 'password'}
            id="new-password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <div
            className="absolute right-3 top-[65%] transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </div>

        

        {/* Confirm Password */}
        <div className="max-w-md mb-6 relative">
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <div
            className="absolute right-3 top-[65%] transform -translate-y-1/2 cursor-pointer "
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </div>

        {/* Password Validation */}
        <div className="max-w-xl grid grid-cols-2  md:grid-cols-3 text-sm text-gray-600 my-4 space-y-1">
          <p className={isValidLength ? 'text-green-500' : 'text-red-500'}>
            {isValidLength ? '✓ At least 8 characters' : '✘ Minimum 8 characters'}
          </p>
          <p className={hasLowercase ? 'text-green-500' : 'text-red-500'}>
            {hasLowercase ? '✓ Contains a lowercase letter' : '✘ Contains a lowercase letter'}
          </p>
          <p className={hasUppercase ? 'text-green-500' : 'text-red-500'}>
            {hasUppercase ? '✓ Contains an uppercase letter' : '✘ Contains an uppercase letter'}
          </p>
          <p className={hasNumber ? 'text-green-500' : 'text-red-500'}>
            {hasNumber ? '✓ Contains a number' : '✘ Contains a number'}
          </p>
          <p className={hasSpecialChar ? 'text-green-500' : 'text-red-500'}>
            {hasSpecialChar ? '✓ Contains a special character' : '✘ Contains a special character'}
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`max-w-md py-2 px-4 rounded-md text-white ${isFormValid ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'}`}
          disabled={!isFormValid}
        >
          Change Password
        </button>
      </form>}
    </div>
  );
};

export default ChangePassword;
