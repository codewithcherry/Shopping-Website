import React, { useState, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert/Alert';

const ResetPassword = () => {
  const { resetToken } = useParams(); // Get the reset token from the URL
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [message,setMessage] =useState();

  // Validation states
  const [isValidLength, setIsValidLength] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);

  const validatePassword = (password) => {
    setIsValidLength(password.length >= 8);
    setHasLowercase(/[a-z]/.test(password));
    setHasUppercase(/[A-Z]/.test(password));
    setHasNumber(/\d/.test(password));
    setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(password));
  };

  const resetPassword = async (newPassword) => {
    const data = { newPassword, resetToken };

    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:3000/update-password', data, {
        headers: { 'Content-Type': 'application/json' },
      });

      setAlert({ type: 'success', message: response.data.message });
      setTimeout(() => {
        navigate('/login'); // Redirect to login page after success
      }, 3000);
    setMessage(response.data.message)
    } catch (error) {
      setAlert({ type: 'error', message: error.response?.data?.message || 'Something went wrong' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setAlert({ type: 'warn', message: "Passwords don't match!" });
    } else {
      resetPassword(newPassword);
    }
  };

  const isFormValid =
    isValidLength &&
    hasLowercase &&
    hasUppercase &&
    hasNumber &&
    hasSpecialChar &&
    newPassword === confirmPassword;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      {alert && <Alert type={alert.type} message={alert.message} onClose={()=>setAlert(null)} />}
      {
        message? <div>
            <p className='text-green-500 text-lg font-semibold p-2 text-center my-4'>
                Your Password updated successfully
            </p>
        </div>:<form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

        <div className="mb-4 relative">
          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
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
            {showNewPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
          </div>
        </div>

        <div className="mb-6 relative">
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <div
            className="absolute right-3 top-[65%] transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
          <p className={isValidLength ? 'text-green-500' : 'text-red-500'}>
            {isValidLength ? '✓ At least 8 characters' : '✘ At least 8 characters'}
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

        <button
          type="submit"
          className={`w-full py-2 rounded-md text-white ${
            isFormValid ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
      }
    </div>
  );
};

export default ResetPassword;
