import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Alert from '../../Alert/Alert';
import Loading from '../../Alert/Loading';
import OrderFilter from './components/orders/OrderFilter';
import StockDataTable from './components/Stock/StockDataTable';

const AdminProductStock = () => {

  const [loading,setLoading]=useState(false);
  const [alert,setALert]=useState();
  const [products,setProducts]=useState([])
  const [pagination,setPagination]=useState();
  const [page,setPage]=useState(1)

  const token=localStorage.getItem('adminToken');

  const fetchProductStock=async (page) => {
    try {
      setLoading(true)
      const response=await axios.get(`http://localhost:3000/admin/product-stock?pageno=${page}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )
      // console.log(response.data.products)
      // console.log(response.data.pagination)
      setProducts(response.data.products)
      setPagination(response.data.pagination)
    } catch (err) {
      console.log(err)
      setALert(err.response.data)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
      fetchProductStock(page)
  },[page])
  return (
    <div className='w-full mx-auto bg-gray-100 '>
     {alert &&  <Alert type={alert.type} message={alert.message} onClose={()=>setAlert(null)}  />}
      {loading? <Loading /> : <div>
          <h1 className='text-2xl px-4 mt-4 font-semibold mx-1'>Order List</h1>
          <OrderFilter />
          <StockDataTable data={products} pagination={pagination} setPage={setPage}/>
        </div>}
    </div>
  )
}

export default AdminProductStock
