import React, { useCallback, useEffect } from 'react'
import { Outlet } from 'react-router-dom'


const AdminProducts = () => {

    
  return (
    <div className='w-full mx-auto bg-gray-100'>
        <Outlet />
    </div>
  )
}

export default AdminProducts
