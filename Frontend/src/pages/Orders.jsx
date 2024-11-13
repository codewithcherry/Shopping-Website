import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import axios from 'axios';
import { AuthContext } from '../components/Navigation/UserAuthContext';
import Loading from '../components/Alert/Loading';
import OrderCard from '../components/orders/OrderCard';
import { useNavigate } from 'react-router-dom';

const Orders = () => {

  const navigate=useNavigate()

  const { isLogged } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserOrders = async () => {
    const token = localStorage.getItem('jwtToken');
    try {
      const response = await axios.get('http://localhost:3000/orders/get-user-orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setLoading(false);
      setOrders(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isLogged) {
      fetchUserOrders();
    } else {
      const data={
        type:"warning",
        message:'login to your account see your order history'
      }
      navigate("/login",{state:data})
    }
  }, [isLogged]);

  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <Navbar />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      ) : (
        <div className="w-full max-w-7xl mx-auto py-8 px-4">
          {orders.length === 0 ? (
            <div className="flex justify-center items-center text-center py-8">
              <h1 className="text-xl font-semibold text-gray-600">No orders to display</h1>
            </div>
          ) : (
            <div className="w-full space-y-6">
              {orders.map((order, index) => (
                <OrderCard order={order} key={index} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
