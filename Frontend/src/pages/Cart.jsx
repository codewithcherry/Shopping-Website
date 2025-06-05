import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navigation/Navbar'
import CartItems from '../components/Cart/CartItems'
import CartSummary from '../components/Cart/CartSummary';
import axios from 'axios';
import Alert from '../components/Alert/Alert'
import { AuthContext } from '../components/Navigation/UserAuthContext';
import Footer from '../components/Footer/Footer';

const baseURL=import.meta.env.VITE_API_BACKEND;

const Cart = () => {

  const {isLogged} =useContext(AuthContext);
  
  const [loading,setLoading]=useState(true)
  const [cartItems ,setCartItems]= useState({})
  const [alert,setAlert]=useState();
  const [refresh,setRefresh]=useState(0);

  const token = localStorage.getItem('jwtToken');
  
    const fetchCartfromServer = async () => {
      try {
        const response = await axios.get(baseURL+"/products/cart", {
          headers: { "Authorization": `Bearer ${token}` }, // Capitalize 'Bearer'
        });
        // console.log(response.data);
        setLoading(false)
        
        setCartItems(response.data)
       
      } catch (err) {
          setAlert({type:'info',message:"something went wrong couldn't load your cart"})
          setTimeout(()=>{
            setAlert(null)
            setLoading(false)
          },3000)
        
      }
    };

    const fetchCartfromLocal=()=>{
      const cart=JSON.parse(localStorage.getItem("cart"));
          if(cart){
            setLoading(false)
            return setCartItems(cart)
          }
          setLoading(false)
          return setCartItems({products:[],subtotal:0,discount:0,deliveryFee:0,tax:0,total:0})
        }

    const refreshCart = (cart) => {
      if(!isLogged){
        const updatedCart = JSON.parse(localStorage.getItem('cart'));
        setCartItems(updatedCart || { products: [], subtotal: 0, total: 0 });
      }
      else{
          setRefresh(prev=>prev+1)
      }
    };

    const handleError=(error)=>{
      setAlert(error)
    }
  
    useEffect(() => {
      const fetchData = async () => {
        if (isLogged) {
          await fetchCartfromServer();
        } else {
          fetchCartfromLocal();
        }
      };
      
      fetchData();
    }, [cartItems,refresh]);
  

  return (
    <div className='bg-gray-100 h-screen'>
        <Navbar />
        {alert && <Alert type={alert.type} message={alert.message} onClose={()=>{setAlert(null)}}/> }
        <div className='w-full flex justify-center  items-start gap-4 my-auto p-4'>
          <CartItems products={cartItems.products} loading={loading} refreshCart={refreshCart} handleError={handleError}/>
          {CartItems && <CartSummary subtotal={cartItems.subtotal}
                      discount={cartItems.discount}
                      deliveryFee={cartItems.deliveryFee}
                      tax={cartItems.tax}
                      total={cartItems.total}
                      loading={loading} 
                      setAlert={setAlert}/>}
        </div>
        <Footer />
    </div>
  )
}

export default Cart
