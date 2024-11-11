import React, { useContext, useEffect, useState } from 'react';
import PaymentForm from '../components/payments/PaymentForm';
import PaymentSummary from '../components/payments/PaymentSummary';
import Navbar from '../components/Navigation/Navbar';
import Breadcrumbs from '../components/Navigation/BreadCrumbs';
import { AuthContext } from '../components/Navigation/UserAuthContext';
import { useNavigate ,useLocation} from 'react-router-dom';
import axios from 'axios';

const Payment = () => {

    const navigate=useNavigate()
    const location=useLocation()

    const [cartItems,setCartItems]=useState([])
    const [address,setAddress]=useState(location.state || {})
    const [alert,setAlert]=useState()
    const [loading,setLoading]=useState(true)
    const {isLogged} =useContext(AuthContext)

    const breadcrumbs = [
        { label: 'Home', link: '/' },
        { label: 'Products', link: '/products' },
        { label: 'Cart', link: '/cart' },
        { label: 'Checkout', link: '/checkout' },
        { label: 'Payment', link: '/payment' }
      ];

  

      const fetchCartfromServer = async () => {
        const token=localStorage.getItem('jwtToken')
        try {
          const response = await axios.get("http://localhost:3000/products/cart", {
            headers: { "Authorization": `Bearer ${token}` }, // Capitalize 'Bearer'
          });
        //   console.log(response.data);
          setLoading(false)
          
          setCartItems(response.data.products)
         
        } catch (err) {
            setAlert({type:'info',message:"something went wrong couldn't load your cart"})
            setTimeout(()=>{
              setAlert(null)
              setLoading(false)
            },3000)
          
        }
      };

      useEffect(()=>{
        if(!isLogged){
                navigate("/login")
        }
        else{
            fetchCartfromServer()
        }
      },[])
  
  return (
    <>
    <Navbar />
    <div className='bg-gray-100 p-6'>
        <Breadcrumbs breadcrumbs={breadcrumbs}/>
    </div>
    <div className="flex flex-col md:flex-row md:space-x-6 px-4 md:px-8 lg:px-16 py-4 bg-gray-100 min-h-screen">
      {/* Payment Form */}
      <div className="md:w-2/3 mb-6 md:mb-0">
        <PaymentSummary cartItems={cartItems} address={address} />
      </div>

      {/* Payment Summary */}
      <div className="md:w-1/3">
        <PaymentForm />
      </div>
    </div>
    </>
  );
};

export default Payment;
