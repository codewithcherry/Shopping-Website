import React from 'react'
import Navbar from '../components/Navigation/Navbar'
import { useState, useEffect } from 'react';
import ProductCard from '../components/products/ProductCard';
import axios from 'axios';
import ProductPagination from '../components/pagination/ProductPagination';

const Products = () => {
  
  const [loading,setLoading] = useState(true);
  const [products,setProducts]=useState([]);
  const [pagination,setPagination]=useState({});
  const [page,setPage]=useState(1);

  const handlePagination=(page)=>{
      console.log("page updated");
      setPage(page);
  }

  useEffect(() => {
    axios.get(`http://localhost:3000/products?page=`+page)
      .then(result => {
        // Use result.data instead of result.json() since Axios automatically parses JSON
        // console.log(result.data.products);
        // console.log(result.data.pagination);
        setProducts(result.data.products); 
        setPagination(result.data.pagination);
      })
      .catch(err => {
        console.log(err);
      });
  }, [page]);
  return (
    <div>
      <Navbar />
      <div className="">
        <div> 
            <h1 className='text-3xl font-semibold text-center text-indigo-700 m-4 '>Products</h1>
        </div>
        <div className='flex justify-center w-full'>         
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:w-[80%] lg:grid-cols-4 gap-8 p-4">
            {products.length==0? <h1>no products</h1>:
            products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <ProductPagination paginationData={pagination} onPageChange={handlePagination} />
    </div>
  )
}

export default Products
