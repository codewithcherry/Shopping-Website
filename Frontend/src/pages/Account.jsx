import React, { useState } from "react";
import Navbar from "../components/Navigation/Navbar";
import Footer from "../components/Footer/Footer";
import { PencilIcon } from "@heroicons/react/24/solid";

const Account = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    profileImage:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  });
  const [editedUser, setEditedUser] = useState(user);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleDiscard = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser({ ...editedUser, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Profile Image */}
            <div className="relative group">
              <img
                src={isEditing ? editedUser.profileImage : user.profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-gray-200 object-cover shadow-md group-hover:shadow-lg transition"
              />
              {isEditing && (
                <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full text-white opacity-0 group-hover:opacity-100 cursor-pointer transition">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  Change
                </label>
              )}
            </div>

            {/* User Information */}
            <div className="flex-1 text-center md:text-left relative group">
              <h2 className="text-2xl font-bold text-gray-800">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-gray-500">{user.phone}</p>

              {/* Edit Icon with Tooltip */}
              <div className="mt-4 relative inline-block group">
                <PencilIcon
                  onClick={handleEditToggle}
                  className="w-5 h-5 text-gray-600 hover:text-gray-700 cursor-pointer"
                />
                <span className="absolute top-full left-1/2  transform -translate-x-1/2 mt-2 px-2 py-1 text-xs bg-gray-800 text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Edit Profile
                </span>
              </div>
            </div>
          </div>

          {/* Editable Form */}
          {isEditing && (
            <div className="mt-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {["firstName", "lastName", "email", "phone"].map((field) => (
                  <div key={field}>
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {field.replace(/^\w/, (c) => c.toUpperCase())}
                    </label>
                    <input
                      type="text"
                      id={field}
                      name={field}
                      value={editedUser[field]}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-2  rounded-lg shadow-sm border bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleDiscard}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 transition"
                >
                  Discard Changes
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
