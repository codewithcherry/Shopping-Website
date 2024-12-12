import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import EditAdminProductForm from './EditAdminProductForm';
import Loading from '../../../../Alert/Loading'
import ProductDetail from './ProductDetail';

const ViewAdminProduct = () => {

    const [product,setProduct]=useState({});
    const [alert,setAlert]=useState();
    const [loading,setLoading]=useState(false);

    const {productId}=useParams()

    const adminToken=localStorage.getItem('adminToken')

    const fetchProductDetails=async (productId) => {
        try {
            setLoading(true)
            const response=await axios.get(`http://localhost:3000/admin/get-product/${productId}`,{
                headers:{
                    Authorization:`Bearer ${adminToken}`
                }
            })
            console.log(response.data);
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
      {loading?<Loading />:<ProductDetail product={product}/>}
    </div>
  )
}

export default ViewAdminProduct
