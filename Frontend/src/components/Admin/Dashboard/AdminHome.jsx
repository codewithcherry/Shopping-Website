import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../../Alert/Alert';
import axios from 'axios';

const AdminHome = () => {
  
  const navigate=useNavigate()

    const [alert,setAlert]= useState(false);

    useEffect(() => {
      console.log("dashboard home rendered")
        const validateToken = async () => {
          const token = localStorage.getItem('adminToken');
          if (token) {
            try {
              const config={headers: { "Authorization": `Bearer ${token}` }}
              const response = await axios.get("http://localhost:3000/admin/dashboard", config);
              console.log(response.data)
               // Assuming you have a state to track login
            } catch (error) {
              // Handle invalid token or server error
              console.error("Token validation failed:", error);
              setAlert({type:"error",message:"Internal Server error try again later"});
            }
          } else {           
            navigate("/admin",{ 
              state: { 
                type:"info",message:"login to your acoount/session experied" 
              } 
          })
            // No token found
          }
        };
      
        validateToken();
        
      }, []);
  return (
    <>
    <div className=' absolute top-0 right-0 w-full '>
    {alert&& <Alert type={alert.type } message={alert.message} onClose={()=>setAlert(null)}/>}
    </div>
    <div className='bg-gray-100 w-full '>
       this is home page of dashboard
    </div>
    </>
    
  )
}

export default AdminHome
