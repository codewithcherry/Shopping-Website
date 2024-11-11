import { useState } from 'react';
import { PencilIcon, TrashIcon, CheckCircleIcon,HomeIcon } from '@heroicons/react/24/solid';
import ShippingAddressForm from './ShippingAddressForm';
import Loading from '../Alert/Loading';
import { removeUserAddress } from './checkout';

const AddressList = ({ addresses ,loading,handleRefresh,setAlert}) => {
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  

  const handleSelectAddress = (index) => {
    setSelectedAddressIndex(index);
  };

  const handleEditAddress = (index) => {
    console.log('Edit address at index:', index);
    // Implement the logic for editing address
  };

  const handleDeleteAddress = async(id) => {
    // console.log('Delete address at index:', id);
    try{
        const response=await removeUserAddress(id)
        setAlert(response)
        handleRefresh()
      }
      catch(err){
        console.log(err)
        setAlert({type:err.response.data.type,message:err.response.data.message})
      }
  };

  return (
    <div className=" w-full lg:max-w-3xl md:max-w-xl sm:max-w-lg h-auto bg-white shadow-xl p-6 rounded-lg mt-6">
      {
        addresses.length===0?
            <div className="text-center p-6 bg-gray-100 text-gray-500">
                <h2 className="text-xl font-semibold flex items-center cursor-pointer mb-6">
                        <HomeIcon className="h-6 w-6 text-blue-500 mr-2 hover:scale-110 hover:cursor-pointer hover:text-indigo-600" />
                          Select Shipping Address
                </h2>
                {loading?<Loading />:<p>No address to select </p>}
            </div>:    
            <div>
                <h2 className="text-lg font-semibold flex items-center cursor-pointer mb-6">
                    <HomeIcon className="h-5 w-5 text-gray-500  mr-2 hover:scale-110 hover:cursor-pointer hover:text-indigo-600" />
                      Select Shipping Address
                </h2>
                {loading?<Loading />:<p></p>}
                      {addresses.map((address, index) => (
                        <div
                          key={index}
                          onClick={() => handleSelectAddress(index)}
                          className={`p-4 mb-4 rounded-lg shadow-sm border-2 cursor-pointer 
                            ${selectedAddressIndex === index ? 'border-green-500 bg-green-50' : 'border-gray-300'}
                          `}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                                  <h3 className=" flex items-center text-lg font-semibold">
                                    {index === selectedAddressIndex && (
                                      <CheckCircleIcon className="h-5 w-5 text-green-500 inline mr-2" />
                                    )}
                                    {address.fullName}
                                  </h3>
                                  <p className="text-gray-600">{address.streetArea}, {address.doorNumber}</p>
                                  <p className="text-gray-600">{address.city}, {address.state} - {address.postalCode}</p>
                                  <p className="text-gray-600">Phone: {address.phoneNumber}</p>
                            </div>
                            <div className="flex space-x-2">
                                  {/* <PencilIcon
                                    onClick={(e) => { e.stopPropagation(); handleEditAddress(index); }}
                                    className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer"
                                  /> */}
                                  <TrashIcon
                                    onClick={(e) => { e.stopPropagation(); handleDeleteAddress(address._id); }}
                                    className="h-5 w-5 text-red-400 hover:text-red-600 cursor-pointer"
                                  />
                            </div>
                          </div>
                        </div>
                        ))}
          </div>
      }
      <div>
        <ShippingAddressForm  handleRefresh={handleRefresh} setAlert={setAlert}/>
      </div>
    </div>
  );
};

export default AddressList;
