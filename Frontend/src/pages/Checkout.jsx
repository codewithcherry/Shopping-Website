import React, { useState,useEffect, useContext } from 'react';
import Navbar from '../components/Navigation/Navbar';
import AddressList from '../components/Cart/AddressList';
import BreadCrumbs from '../components/Navigation/BreadCrumbs';
import CheckoutPayment from '../components/Cart/CheckoutPayment';
import { AuthContext } from '../components/Navigation/UserAuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '../components/Alert/Alert';

const Checkout = () => {

  const navigate=useNavigate()

  const [addresses,setAddresses]=useState([]);
  const [loading,setLoading]=useState(true);
  const [alert,setAlert]=useState(false);
  const [refresh,setRefresh]=useState(0)
  const [selectedAddress,setSelectedAddress]=useState();
  

  const {isLogged} =useContext(AuthContext);

  const fetchUserAddresses = async () => {
    const token=localStorage.getItem("jwtToken")
    try {
      const response = await axios.get("http://localhost:3000/products/user-address", {
        headers: { "Authorization": `Bearer ${token}` }, // Capitalize 'Bearer'
      });
      // console.log(response.data);
      setLoading(false)
      
      setAddresses(response.data.addresses)
     
    } catch (err) {
        setAlert({type:'info',message:"something went wrong couldn't load your cart"})
        setTimeout(()=>{
          setAlert(null)
          setLoading(false)
        },3000)
      
    }
  };

  const handleRefresh=()=>{
    setRefresh(prev=>prev+1)
  }

  useEffect(()=>{

    if(!isLogged){
      const data = {
        type: "error",
        message: "login to your account to checkout your cart"
        };
        // Navigate to the target route with state data
        navigate('/login', { state: data });
    }
    else{
      fetchUserAddresses();
    }

  },[isLogged,navigate,refresh])

  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Products', link: '/products' },
    { label: 'Cart', link: '/cart' },
    { label: 'Checkout', link: '/checkout' }
  ];

  return (
    <div className="bg-gray-100 w-full h-auto">
      {/* Navbar */}
      <Navbar />
      
      <div className="p-8">
        {/* Breadcrumbs */}
        <BreadCrumbs breadcrumbs={breadcrumbs} />
      </div>
      {alert && <div className='absolute top-0 w-full'> <Alert type={alert.type} message={alert.message} onClose={()=>{setAlert(null)}} /></div>}
      {/* Checkout Layout */}
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row lg:justify-between gap-8 px-6 ">
        {/* Left Section - Address List */}
        <div className="lg:w-3/5 ">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shipping Address</h2>
          <AddressList addresses={addresses} loading={loading} handleRefresh={handleRefresh} setAlert={setAlert} setSelectedAddress={setSelectedAddress}/>
          {/* Uncomment if Shipping Address Form is needed */}
          {/* <ShippingAddressForm /> */}
        </div>

        {/* Right Section - Payment */}
        <div className="lg:w-2/5 ">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Information</h2>
          <CheckoutPayment setAlert={{setAlert}} selectedAddress={selectedAddress}/>
          
        </div>

        
      </div>
    </div>
  );
};

export default Checkout;
