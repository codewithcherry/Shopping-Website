import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../../Alert/Alert';
import axios from 'axios';
import DashboardHomeHeader from './components/home/DashboardHomeHeader';
import Loading from '../../Alert/Loading';
import SalesChart from './components/home/SalesChart';

const AdminHome = () => {
  
    const navigate=useNavigate()
    const [headerData,setHeaderData]=useState();
    const [alert,setAlert]= useState(false);
    const token = localStorage.getItem('adminToken');

    const fetchDashboardHeader=async()=>{
     
        try {
          const config={headers: { "Authorization": `Bearer ${token}` }}
          const response = await axios.get("http://localhost:3000/admin/dashboard", config);
          console.log(response.data)
          setHeaderData(response.data.data)
        } catch (error) {
          // Handle invalid token or server error
          console.error("Token validation failed:", error);
          setAlert({type:"error",message:"Internal Server error try again later"});
        }
      }

    useEffect(() => {
      console.log("dashboard home rendered")
      fetchDashboardHeader();      
      }, []);
  return (
    <div className='bg-gray-100 w-full'>
    {alert&& <Alert type={alert.type } message={alert.message} onClose={()=>setAlert(null)}/>}
   <div>
    <h1 className='text-4xl font-semibold text-gray-700 mt-6 mx-10 p-2'>
      Dashboard   
    </h1>
    <div className='mx-10'>
       {
        headerData?<DashboardHomeHeader headerData={headerData}/>:<Loading />
       }
    </div>
    <div className='mt-10 mx-10 p-2'>
      <SalesChart setAlert={setAlert}/>
    </div>
   </div>
    </div>
    
  )
}

export default AdminHome
