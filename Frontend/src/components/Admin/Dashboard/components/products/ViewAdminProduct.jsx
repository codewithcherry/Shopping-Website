import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import EditAdminProductForm from './EditAdminProductForm';
import Loading from '../../../../Alert/Loading'
import ProductDetail from './ProductDetail';
import Alert from '../../../../Alert/Alert';

const baseURL=import.meta.env.VITE_API_BACKEND;

const ViewAdminProduct = () => {

    const [product,setProduct]=useState({});
    const [alert,setAlert]=useState();
    const [loading,setLoading]=useState(false);

    const {productId}=useParams()

    const adminToken=localStorage.getItem('adminToken')

    const fetchProductDetails=async (productId) => {
        try {
            setLoading(true)
            const response=await axios.get(baseURL+`/admin/get-product/${productId}`,{
                headers:{
                    Authorization:`Bearer ${adminToken}`
                }
            })
            // console.log(response.data);
            setProduct(response.data)
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchProductDetails(productId);
    },[])
  return (
    <div>
      {alert && <Alert type={alert.type } message={alert.message} onClose={()=>{setAlert(null)}}/>}
      {loading?<Loading />:<ProductDetail product={product} setLoading={setLoading} setAlert={setAlert}/>}
    </div>
  )
}

export default ViewAdminProduct
