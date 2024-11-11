import React, { useContext, useEffect, useState } from 'react'
import CheckoutCartSummary from './CheckoutCartSummary'
import {AuthContext} from '../Navigation/UserAuthContext'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const CheckoutPayment = ({setAlert,selectedAddress}) => {

  const [loading,setLoading]=useState(true);
  const [cartItems,setCartItems]=useState([])
  const {isLogged}=useContext(AuthContext);


  const navigate=useNavigate()

  const token=localStorage.getItem("jwtToken");

  const fetchCartfromServer = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products/cart", {
        headers: { "Authorization": `Bearer ${token}` }, // Capitalize 'Bearer'
      });
      // console.log(response.data);
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
    // console.log(isLogged)
      if(!isLogged){
         // Data to pass to the other page
         const data = {
          type: "error",
          message: "login to your account to checkout your cart"
          };

      // Navigate to the target route with state data
      navigate('/login', { state: data });
      
      }
      else{
        fetchCartfromServer()
      }
  },[isLogged,navigate])

  return (
    <div>
     
      <CheckoutCartSummary cartItems={cartItems} loading={loading} selectedAddress={selectedAddress}/>
    </div>
  )
}

export default CheckoutPayment
