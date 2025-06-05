import React from 'react'
import Navbar from "../components/Navigation/Navbar";
import { useState, useEffect } from "react";
import ProductCard from "../components/products/ProductCard";
import axios from "axios";
import ProductPagination from "../components/pagination/ProductPagination";
import Footer from "../components/Footer/Footer";
import Loading from "../components/Alert/Loading";
import Breadcrumbs from '../components/Navigation/BreadCrumbs';
import { useParams } from 'react-router-dom';

const baseURL=import.meta.env.VITE_API_BACKEND;

const Shop = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(1);

    const { category, subCategory } = useParams();
    let api

    if(category && subCategory){
        api=baseURL+`/products/shop/${category}/${subCategory}?page=${page}`
    }
    else{
        api=baseURL+`/products/shop/${category}?page=${page}`
    }

    const breadcrumbs = subCategory?[
        { label: 'Home', link: '/' },
        { label: 'shop', link: '/' },
        { label: category, link: '/shop/'+category },
        { label: subCategory, link: `/shop/${category}/${subCategory}`},
      ]:[
        { label: 'Home', link: '/' },
        { label: 'shop', link: '/' },
        { label: category, link: '/shop/'+category },
        
      ];
  
    
    const handlePagination = (page) => {
      console.log("page updated");
      setPage(page);
    };
  
    const fetchProducts = async () => {
      try {
        const response = await axios.get(api);
        // Use result.data instead of result.json() since Axios automatically parses JSON
        // console.log(result.data.products);
        // console.log(result.data.pagination);
        setProducts(response.data.products);
        setPagination(response.data.pagination);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchProducts();
    }, [page,category,subCategory]);
    return (
      <div className="bg-gray-100">
        <Navbar />
        <div>
          <div>
            <div className='mt-6 mx-6'>
                <Breadcrumbs breadcrumbs={breadcrumbs}/>
            </div>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div className="flex justify-center w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:w-[80%] lg:grid-cols-4 gap-8 p-4">
                {products.length == 0 ? (
                  <h1 className='mx-auto text-center text-lg text-gray-700 font-medium'>No products to display</h1>
                ) : (
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        <ProductPagination
          paginationData={pagination}
          onPageChange={handlePagination}
        />
        <Footer />
      </div>
    );
}

export default Shop
