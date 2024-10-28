import React from 'react'
import SideNavigation from '../../components/Admin/SideNavigation'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='flex '>
      <SideNavigation />
      <Outlet />
    </div>
  )
}

export default Dashboard
