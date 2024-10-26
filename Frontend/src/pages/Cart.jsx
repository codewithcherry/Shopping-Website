import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import CartItems from '../components/Cart/CartItems'
import CartSummary from '../components/Cart/CartSummary';
import axios from 'axios';
import Alert from '../components/Alert/Alert'

const Cart = () => {
  
  const [loading,setLoading]=useState(true)
  const [cartItems ,setCartItems]= useState([])
  const [alert,setAlert]=useState();
  
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
  
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products/cart", {
          headers: { "Authorization": `Bearer ${token}` }, // Capitalize 'Bearer'
        });
        // console.log(response.data);
        setLoading(false)
        setCartItems(response.data.cart)
       
      } catch (err) {
        if(err.status==401){
          setAlert({type:'info',message:'Login into your account to view cart items'})
          setTimeout(()=>{
            setAlert(null)
            setLoading(false)
          },3000)
        }
        console.log(err)
      }
    };
  
    fetchCart();
  }, []);
  

  return (
    <div>
        <Navbar />
        {alert && <Alert type={alert.type} message={alert.message} onClose={()=>{setAlert(null)}}/> }
        <div className='w-full flex justify-center items-start gap-4 my-auto p-4'>
          <CartItems cartItems={cartItems} loading={loading} />
          {!CartItems && <CartSummary subtotal={dummyData.subtotal}
                      discount={dummyData.discount}
                      deliveryFee={dummyData.deliveryFee}
                      tax={dummyData.tax}
                      total={dummyData.total}
                      loading={loading} />}
        </div>
    </div>
  )
}

export default Cart
