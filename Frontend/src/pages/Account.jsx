import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navigation/Navbar";
import Footer from "../components/Footer/Footer";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Alert from "../components/Alert/Alert";
import { AuthContext } from "../components/Navigation/UserAuthContext";
import { useNavigate } from "react-router-dom";
import AddressForm from "../components/account/AddressForm";
import { removeUserAddress } from "../components/Cart/checkout";

const Account = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({});
  const [editedUser, setEditedUser] = useState(user);
  const [alert, setAlert] = useState();
  const [userImage, setUserImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [userAddress, setUserAddress] = useState([]);
  const [editAddress, setEditAddress] = useState({});
  const [newAddress, setNewAddress] = useState(true);
  const [editIndex, setEditIndex] = useState();
  const [refresh, setRefresh] = useState(1);

  const { isLogged } = useContext(AuthContext);

  const token = localStorage.getItem("jwtToken");

  const navigate = useNavigate();

  const handleImageChange = async (event) => {
    setUploading(true);
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const response = await axios.post(
          "http://localhost:3000/upload/add-user-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const newImageUrl = response.data.imageUrl;

        // Update local images state
        setUserImage(newImageUrl);
        setEditedUser({ ...editedUser, imageUrl: newImageUrl });
        setUploading(false);
        setAlert({ type: "success", message: "Profile image updated successfully!" });
      } catch (err) {
        setUploading(false);
        setAlert({ type: "error", message: "Failed to upload image!" });
      }
    }
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/update-user-info",
        editedUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(editedUser);
      setIsEditing(false);
      setAlert({ type: "success", message: "Profile updated successfully!" });
    } catch (error) {
      setAlert({ type: "error", message: "Failed to update profile!" });
    }
  };

  const handleDiscard = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const getUserInfo = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/get-user-info", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setUserAddress(response.data.address);
      setEditedUser(response.data);
    } catch (err) {
      setAlert({ type: "error", message: "Failed to fetch user info!" });
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await removeUserAddress(id);
      setAlert({ type: "success", message: "Address deleted successfully!" });
      handleRefresh();
    } catch (err) {
      setAlert({ type: "error", message: "Failed to delete address!" });
    }
  };

  const handleEditAddress = (index) => {
    setNewAddress(false);
    setEditAddress(userAddress[index]);
    setEditIndex(index);
  };

  const handleRefresh = () => setRefresh((prev) => prev + 1);

  useEffect(() => {
    if (!isLogged) {
      navigate("/login", { state: { type: "info", message: "Login to see your profile" } });
    } else {
      getUserInfo();
    }
  }, [refresh]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
      <div className="max-w-4xl mx-auto p-6">
        <div className="relative bg-white shadow-xl rounded-lg p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Profile Image */}
            <div className="relative group">
              <img
                src={isEditing ? editedUser.imageUrl : user.imageUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover shadow-md"
              />
              {isEditing && (
                <label
                  className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full text-white opacity-0 group-hover:opacity-100 cursor-pointer transition ${
                    uploading ? "animate-ping" : ""
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  Change
                </label>
              )}
              {/* Edit Profile Icon */}
              <div className="absolute bottom-4 right-0  z-10">
                <div className="relative group">
                  <PencilIcon
                    onClick={handleEditToggle}
                    className="w-6 h-6 text-black bg-gray-100 bg-opacity-90 shadow-md rounded-full p-1 hover:text-indigo-700 cursor-pointer"
                  />
                  <span className="absolute -bottom-4 left-0 hidden text-xs rounded-lg bg-indigo-400 px-1 text-white group-hover:block whitespace-nowrap">
                    Edit Profile
                  </span>
                </div>
                </div>

             </div>

            {/* User Information */}
            <div className=" flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-800">{user.firstname} {user.lastname}</h2>
              <p className="text-gray-600">{user.useremail}</p>
              <p className="text-gray-600">{user.phone}</p>

             
            </div>
          </div>

          {/* Editable Form */}
          {isEditing && (
            <div className="mt-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {["firstname", "lastname", "useremail", "phone"].map((field) => (
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
                      className="mt-1 block w-full px-4 py-2 rounded-lg shadow-sm border bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleDiscard}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Discard
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Address Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Shipping Addresses</h3>
          {userAddress.length === 0 ? (
            <p className="text-gray-500">No addresses available.</p>
          ) : (
            userAddress.map((address, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow mb-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-800 font-semibold">{address.fullName}</p>
                    <p>{address.streetArea}, {address.doorNumber}</p>
                    <p>{address.city}, {address.state} - {address.postalCode}</p>
                    <p>Phone: {address.phoneNumber}</p>
                  </div>
                  <div className="flex space-x-4">
                    <PencilIcon
                      onClick={() => handleEditAddress(index)}
                      className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700"
                    />
                    <TrashIcon
                      onClick={() => handleDeleteAddress(address._id)}
                      className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <AddressForm
          formdata={editAddress}
          setAlert={setAlert}
          handleRefresh={handleRefresh}
          newAddress={newAddress}
          editindex={editIndex}
          setNewAddress={setNewAddress}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Account;
