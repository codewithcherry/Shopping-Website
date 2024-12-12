import React from "react";
import { useLocation ,useNavigate} from 'react-router-dom';
import Alert from "../../../../Alert/Alert"    
import { useState,useCallback,useEffect } from 'react';
import AdminProductCard from '../products/AdminProductCard';
import axios from 'axios'
import ProductPagination from "../../../../pagination/ProductPagination"

const AdminAllProducts = () => {
    const navigate=useNavigate()
    const location = useLocation();
    const dataReceived = location.state || null;
    const [loading,setLoading]=useState(true)
    const [alert,setAlert]=useState(dataReceived)
    const [products,setProducts]=useState([])
    const [pagination,setPagination]=useState({});
    const [page,setPage]=useState(1);

    const handleAlert=()=>{
      setAlert(null)
      navigate('/admin/dashboard')
    }
  
    const handlePagination=useCallback((page)=>{
      
      setPage(page);
     },[])

    

    useEffect(()=>{
      const token=localStorage.getItem("adminToken")
      const config={
        headers: { "Authorization": `Bearer ${token}` } 
      }
      const fetchProducts= async()=>{
        try{
          const response=await axios.get(`http://localhost:3000/admin/products?page=${page}`,config)
          
          setProducts(response.data.products)
          setPagination(response.data.pagination)
        }
        catch(err){
          setAlert({type:err.response.data.type,message:err.response.data.message})
        }
        finally{
          setLoading(false)
        }
      }
      fetchProducts()
    },[page])

  return (
    <div>
      <div className="absolute top-0 w-full">
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={handleAlert}
          />
        )}
      </div>
      <div className="p-8 w-full flex justify-center">
        {products.length > 0 ? (
          <div className="w-[80%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={product.sku}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AdminProductCard
                  product={product}
                  onEdit={() => console.log("Edit product", product.sku)}
                  onDelete={() => console.log("Delete product", product.sku)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64 text-gray-500 text-lg">
            No products to show
          </div>
        )}
      </div>
      <div>
        <ProductPagination
          paginationData={pagination}
          onPageChange={handlePagination}
        />
      </div>
    </div>
  );
};

export default AdminAllProducts;
