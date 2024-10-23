import React from 'react'
import Navbar from '../components/navbar'
import { useState, useEffect } from 'react';
import ProductCard from '../components/products/ProductCard';
import axios from 'axios';

const Products = () => {
  
  const [loading,setLoading] = useState(true);
  const [products,setProducts]=useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then(result => {
        // Use result.data instead of result.json() since Axios automatically parses JSON
        console.log(result.data.products);
        setProducts(result.data.products); 
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Navbar />
      <div className='flex justify-center'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:w-[80%] lg:grid-cols-4 gap-8 p-4">
          {products.length==0? <h1>no products</h1>:
          products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products
