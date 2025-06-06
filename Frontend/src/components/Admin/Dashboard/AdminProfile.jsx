import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from '../../Alert/Loading';
import { PencilIcon } from '@heroicons/react/24/outline';
import { MapPinIcon } from '@heroicons/react/24/solid';
import Alert from '../../Alert/Alert';

const baseURL=import.meta.env.VITE_API_BACKEND;

const AdminProfile = () => {

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState();
  const [admin, setAdmin] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...admin });
  const [refresh,setRefrsh]=useState(0);

  const token = localStorage.getItem('adminToken');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    setFormData({ ...admin }); // Reset form data on toggle
  };

  const handleSubmit = async () => {
    console.log("Updated Data: ", formData);
    

    // Add API call to submit changes here
    try {
      const response = await axios.post(baseURL+'/admin/update-admin', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Updated Admin:', response.data);
      setAlert(response.data);
      setRefrsh(prev=>prev+1);
      setIsEditing(false); // Close the edit mode
    } catch (error) {
      console.log(error);
      setAlert(error.response.data);
    }
  };

  

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(baseURL+'/admin/get-admin', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmin(response.data.admin);
      setFormData(response.data.admin); // Update formData with fetched data
      // console.log(response.data.admin)
    } catch (error) {
      console.log(error);
      setAlert(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (event) => {
    
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const response = await axios.post(
          baseURL+"/upload/add-user-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const newImageUrl = response.data.imageUrl;

        // Update local images state
       
        setFormData((prev) => ({ ...prev, imageUrl: newImageUrl }));
       
        setAlert({ type: "success", message: "Profile image updated successfully!" });
      } catch (err) {
        setAlert({ type: "error", message: "Failed to upload image!" });
      }
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [refresh]);

  return (
    <div className='w-full bg-gray-100'>
      {alert && <Alert type={alert.type} message={alert.message} onClose={()=>{setAlert(null)}} />}
      {loading ? <Loading /> :
        <div className="flex justify-center items-center min-h-screen">
          {/* Profile Card */}
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 md:p-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-center mb-6">
              <div className="relative w-28 h-28 mb-4 md:mb-0 md:mr-8">
                <img
                  src={formData.imageUrl || admin.imageUrl}
                  alt="Profile"
                  className="w-28 h-28 object-cover rounded-full border-4 border-gray-200 shadow-md"
                />
                {isEditing && (
                  <label htmlFor="image-upload" className="absolute w-6 h-6 bottom-2 right-1 bg-indigo-500 text-white p-1 rounded-full shadow-md cursor-pointer">
                    <PencilIcon />
                  </label>
                )}
                {isEditing && (
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                )}
              </div>
              <div className="text-center md:text-left">
                <div className="flex items-end gap-2">
                <h2 className="text-2xl font-bold text-gray-800">
                  {admin.firstname} {admin.lastname}
                </h2>
                <h3 className='text-gray-500 flex gap-1 font-medium text-sm mb-1'>
                  ( {admin.role} )
                </h3>
                </div>
                <p className="text-gray-500 flex gap-1 text-sm">
                  <MapPinIcon className='w-5 h-5 text-green-400' />
                  {admin.location || 'NA'}
                </p>
              </div>
            </div>

            {/* Form Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Name */}
              <div>
                <label className="block text-gray-600 mb-2">User Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    disabled={true}
                    className="w-full border border-gray-300 bg-gray-100 rounded-md p-2 focus:outline-none focus:border-indigo-500"
                  />
                ) : (
                  <p className="text-gray-800 border rounded-md p-2 border-gray-300">{admin.username}</p>
                )}
              </div>
              {/* First Name */}
              <div>
                <label className="block text-gray-600 mb-2">First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
                  />
                ) : (
                  <p className="text-gray-800 border rounded-md p-2 border-gray-300">{admin.firstname}</p>
                )}
              </div>
              {/* Last Name */}
              <div>
                <label className="block text-gray-600 mb-2">Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
                  />
                ) : (
                  <p className="text-gray-800 border rounded-md p-2 border-gray-300">{admin.lastname}</p>
                )}
              </div>
              {/* Email */}
              <div>
                <label className="block text-gray-600 mb-2">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
                  />
                ) : (
                  <p className="text-gray-800 border rounded-md p-2 border-gray-300">{admin.email}</p>
                )}
              </div>
              {/* Phone */}
              <div>
                <label className="block text-gray-600 mb-2">Phone Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
                  />
                ) : (
                  <p className="text-gray-800 border rounded-md p-2 border-gray-300">{admin.phone}</p>
                )}
              </div>
              {/* Location */}
              <div>
                <label className="block text-gray-600 mb-2">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={formData.location || ''}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
                  />
                ) : (
                  <p className="text-gray-800 border rounded-md p-2 border-gray-300">{admin.location || "NA"}</p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 text-center">
              {isEditing ? (
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleSubmit}
                    className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-all shadow-md">
                    Save Changes
                  </button>
                  <button
                    onClick={handleEditToggle}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-all shadow-md">
                    Discard
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEditToggle}
                  className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-all shadow-md">
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>}
    </div>
  )
}

export default AdminProfile
