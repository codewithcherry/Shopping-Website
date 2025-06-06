import React, { useState } from 'react';
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import Loading from '../../../../Alert/Loading';
import axios from 'axios';

const baseURL=import.meta.env.VITE_API_BACKEND;

const AddTeamForm = ({ closeModal ,setAlert}) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    role: 'admin', // Default role
    phone: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false); // State for password visibility toggle
  const [loading,setLoading]=useState(false)
  const [message,setMessage]=useState('')
  const adminToken = localStorage.getItem('adminToken');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log('Submitting form:', formData);
  
    try {
      setLoading(true); // Indicate loading state
      const response = await axios.post(
        baseURL+'/admin/add-team',
        formData, // Send formData directly without wrapping in another object
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
  
    //   console.log('Response:', response.data);
  
      // Provide feedback for success
      setAlert({
        type: 'success',
        message: 'Team member added successfully!',
      })
  
      closeModal(); // Close the modal after successful submission
    } catch (error) {
    //   console.error('Error submitting form:', error);
  
      // Provide feedback for error
      setMessage({
        type: 'error',
        message: error.response?.data?.message || 'An unexpected error occurred.',
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white w-full max-w-lg mx-4 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Team Member</h2>
          <button onClick={closeModal}>
            <XMarkIcon className="h-6 w-6 text-gray-600 hover:text-gray-800" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block text-gray-700 font-medium mb-1">First Name</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter first name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Last Name</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter last name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-600 hover:text-gray-800" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-600 hover:text-gray-800" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
                <option value="moderator">Moderator</option>
              </select>
            </div>
          </div>
          
          {
            loading?<Loading />:
            <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg mr-2 hover:bg-gray-400"
            >
              Discard
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Member
            </button>
          </div>
          }
          <div className='mx-auto'>
            {message && <p className='text-sm text-red-500 text-center'>{message.message}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeamForm;
