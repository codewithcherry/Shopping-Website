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
              const response = await axios.get("http://localhost:3000/admin/dashboard", {
                headers: { "Authorization": `Bearer ${token}` },
              });
              console.log(response.data)
               // Assuming you have a state to track login
            } catch (error) {
              console.error("Token validation failed:", error);
              // Handle invalid token or server error
              navigate("/admin",{ 
                state: { 
                  type:"error",message:"Token validation failed/Expired login again" 
                } 
            })
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
    {alert&& <Alert type={alert.type } message={alert.message} onClose={()=>setAlert(null)}/>}
    <div className='bg-gray-100 w-full '>
       this is home page of dashboard
    </div>
    </>
    
  )
}

export default AdminHome
