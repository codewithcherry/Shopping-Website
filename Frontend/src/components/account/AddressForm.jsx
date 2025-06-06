import React, { useEffect, useState } from 'react';
import { ExclamationCircleIcon, PlusIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const baseURL=import.meta.env.VITE_API_BACKEND;

const AddressForm = ({ formdata, setAlert, handleRefresh, newAddress, editindex ,setNewAddress}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    doorNumber: '',
    streetArea: '',
    landmark: '',
    city: '',
    state: '',
    postalCode: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState({});
  const [showForm,setShowForm]=useState(false)

  const token = localStorage.getItem('jwtToken');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'phoneNumber') {
      if (!/^\d+$/.test(value)) {
        setErrors((prev) => ({ ...prev, phoneNumber: 'Phone number must contain only digits.' }));
      } else if (value.length < 10) {
        setErrors((prev) => ({ ...prev, phoneNumber: 'Phone number must be at least 10 digits.' }));
      } else {
        setErrors((prev) => ({ ...prev, phoneNumber: '' }));
      }
    } else {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const addNewAddress = async () => {
    try {
      const response = await axios.post(
        baseURL+'/products/user-createAddress',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      handleRefresh();
      setAlert({ type: 'success', message: 'Successfully added the address' });
      setTimeout(() => setAlert(null), 3000);
      resetForm();
    } catch (err) {
      console.error(err);
      setAlert({ type: 'error', message: 'Failed to add address. Please try again.' });
    }
  };

  const editAddress = async () => {
    try {
      const response = await axios.post(
        baseURL+`/user/user-edit-address?index=${editindex}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      handleRefresh();
      setAlert({ type: 'success', message: 'Successfully edited the address' });
      setTimeout(() => setAlert(null), 3000);
      setNewAddress(true);
      resetForm();
    } catch (err) {
      console.error(err);
      setAlert({ type: 'error', message: 'Failed to edit address. Please try again.' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newAddress) {
      await addNewAddress();
    } else {
      await editAddress();
    }
    setShowForm(false)
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      doorNumber: '',
      streetArea: '',
      landmark: '',
      city: '',
      state: '',
      postalCode: '',
      phoneNumber: '',
    });
  };

  const getInputStyle = (name) => {
    return errors[name]
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-blue-500 focus:ring-indigo-500';
  };

  useEffect(() => {
    if (formdata) {
      setFormData((prev) => ({ ...prev, ...formdata }));
    }
    if(!newAddress){
        setShowForm(true)
    }
  }, [formdata,newAddress]);

  return (
    <div className="max-w-2xl bg-white p-6 rounded-lg">
      <h2 className="text-xl font-semibold flex items-center mb-2 hover:cursor-pointer" onClick={()=>setShowForm(!showForm)}>
        <PlusIcon className="h-6 w-6 text-blue-500 mr-2" />
        {newAddress ? 'Add New Shipping Address' : 'Edit Shipping Address'}
      </h2>
      {
        showForm && <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Full Name', name: 'fullName' },
            { label: 'Street/House/Apt No', name: 'doorNumber' },
            { label: 'Street Area/Location', name: 'streetArea' },
            { label: 'Landmark (optional)', name: 'landmark' },
            { label: 'City', name: 'city' },
            { label: 'State', name: 'state' },
            { label: 'Postal Code', name: 'postalCode' },
            { label: 'Phone Number', name: 'phoneNumber' },
          ].map(({ label, name }) => (
            <div key={name} className="relative">
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required={name !== 'landmark'}
                className={`mt-1 block w-full rounded-md border-2 ${getInputStyle(name)} shadow-sm focus:ring-1 focus:ring-offset-0 focus:outline-none`}
                style={{ padding: '0.5rem 0.75rem' }}
              />
              {errors[name] && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>
              )}
              {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name]}</p>}
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-indigo-400 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors"
        >
          {newAddress ? 'Add' : 'Edit'} Address
        </button>
      </form>
      }
    </div>
  );
};

export default AddressForm;
