import React from 'react'
import { useLocation } from 'react-router-dom';
import Alert from "../../Alert/Alert"    
import { useState } from 'react';

const AdminProducts = () => {
  const location = useLocation();
    const dataReceived = location.state || null;
    const [alert,setAlert]=useState(dataReceived)
  return (
    <div>
        {alert && <Alert type={alert.type} message={alert.message} onClose={()=>setAlert(null)}/>}
    </div>
  )
}

export default AdminProducts
