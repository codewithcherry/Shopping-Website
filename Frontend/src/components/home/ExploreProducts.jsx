import React from 'react'
import { useState,useEffect } from 'react';
import ProductCard from '../products/ProductCard';
import Loading from '../Alert/Loading';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ExploreProducts = () => {
    const [loading,setLoading] = useState(true);
    const [products,setProducts]=useState([]);
    const [page,setPage]=useState(1);

    const navigate=useNavigate()

    const handleViewAll=()=>{
        navigate('/products')
    }


    useEffect(() => {
        axios.get(`http://localhost:3000/products?page=`+page)
        .then(result => {
            // Use result.data instead of result.json() since Axios automatically parses JSON
            // console.log(result.data.products);
            // console.log(result.data.pagination);
            setProducts(result.data.products); 
            setLoading(false)
            
        })
        .catch(err => {
            console.log(err);
        });
    }, []);
  return (
    
      <div  className='mb-4'>
        <div className='flex justify-center w-full'>         
          {loading?<Loading />: 
          <div className='w-[80%] mx-auto'>
            <div className="flex gap-12 items-center mb-6">
                <h2 className="flex px-4 gap-2 items-center text-2xl font-bold text-indigo-500">
                Explore All Products
                </h2>
            </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-8 p-4">
            {products.length==0? <h1>no products</h1>:
            products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          </div>}
        </div>
        <div className="flex justify-center mt-6">
        <button className="text-white font-medium bg-indigo-500 hover:bg-indigo-600 p-2 rounded-lg" onClick={handleViewAll}>
          View All Products
        </button>
      </div>
      </div>
  )
}

export default ExploreProducts
