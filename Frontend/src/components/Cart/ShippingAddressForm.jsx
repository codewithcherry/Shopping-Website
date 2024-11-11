import { PlusIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import axios from 'axios'

const ShippingAddressForm = ({handleRefresh,setAlert}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    doorNumber: '',
    streetArea: '',
    landmark: '',
    city: '',
    state: '',
    postalCode: '',
    phoneNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Basic validation example for phone number format
    if (name === 'phoneNumber' && /[^0-9]/.test(value)) {
      setErrors((prev) => ({ ...prev, phoneNumber: 'Invalid characters.' }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData)
    const token=localStorage.getItem("jwtToken")
        try {
          
          const response = await axios.post(
              'http://localhost:3000/products/user-createAddress', // Replace with your actual API endpoint
              formData,
              {
                  headers: {
                      Authorization: `Bearer ${token}`, // Add authorization token in header
                      'Content-Type': 'application/json',
                  },                 
              }
          );

          // console.log('address added successfully:', response.data);   
          handleRefresh()
          setAlert({type:"success",message:"successfully added the address"});
          setFormData({
            fullName: '',
            doorNumber: '',
            streetArea: '',
            landmark: '',
            city: '',
            state: '',
            postalCode: '',
            phoneNumber: ''
          })
          setShowForm(false)
      }
      catch(err){
          console.log(err)
      }
  };

  const getInputStyle = (name) => {
    if (errors[name]) {
      return 'border-red-500 focus:border-red-500 focus:ring-red-500';
    }
    return 'border-gray-300 focus:border-blue-500 focus:ring-indigo-500';
  };

  return (
    <div className="max-w-2xl  bg-white p-6 ">
      <h2 
        className="text-xl font-semibold flex items-center cursor-pointer mb-2"
        onClick={() => setShowForm(!showForm)} // Toggle form visibility
      >
        <PlusIcon className="h-6 w-6 text-blue-500 mr-2 hover:scale-110 hover:cursor-pointer hover:text-indigo-600" />
        Add New Shipping Address
      </h2>
      {showForm && ( // Conditionally render form based on `showForm` state
        <form onSubmit={handleSubmit}>
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
                <label className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
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
                {errors[name] && (
                  <p className="mt-1 text-sm text-red-600">{errors[name]}</p>
                )}
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-indigo-400 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors"
          >
            Add Address
          </button>
        </form>
      )}
    </div>
  );
};

export default ShippingAddressForm;
