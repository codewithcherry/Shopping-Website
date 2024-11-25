import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Alert from '../../Alert/Alert';
import Loading from '../../Alert/Loading'
import OrderFilter from './components/orders/OrderFilter';
import DataTable from './components/orders/DataTable';

const AdminOrderlist = () => {
  const [loading,setLoading]=useState(true);
  const [alert,setAlert]=useState(false);
  const [orders,setOrders]=useState();
  const [page,setPage]=useState(1);
  const [pagination,setPagination]=useState()
  const [refresh,setRefresh]=useState(0);

  const token=localStorage.getItem('adminToken');

  const fetchOrderlistServer=async()=>{
    try{
      
      const response=await axios.get(`http://localhost:3000/admin/order-list?pageno=${page}`,
        {
          headers:{
            "Authorization":`Bearer ${token}`
          }      
        }
      )
      // console.log(response.data)
      setLoading(false);
      setOrders(response.data.orders)
      setPagination(response.data.pagination)
    }
    catch(err){
      // console.log(err)
      const error=err.response.data;
      setAlert(error);
     
    }
  }

  useEffect(()=>{
    fetchOrderlistServer()
  },[refresh,page])

  return (
    <div className='w-full mx-auto bg-gray-100 '>
     {alert &&  <Alert type={alert.type} message={alert.message} onClose={()=>setAlert(null)}  />}
      {loading? <Loading /> : <div>
          <h1 className='text-2xl px-4 mt-4 font-semibold mx-1'>Order List</h1>
          <OrderFilter />
          <DataTable data={orders} pagination={pagination} setPage={setPage}/>
        </div>}
    </div>
  )
}

export default AdminOrderlist;
