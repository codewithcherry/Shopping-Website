import React from "react";
import Navbar from "../components/Navigation/Navbar";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../components/products/ProductCard";
import axios from "axios";
import Breadcrumbs from '../components/Navigation/BreadCrumbs';
import ProductPagination from "../components/pagination/ProductPagination";
import Footer from "../components/Footer/Footer";
import Loading from "../components/Alert/Loading";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);


  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery().get("query");

  const breadcrumbs = [
    { label: 'Home', link: '/' },
    
    { label: "products", link: `/products?query=${query}` },
   ]

  const handlePagination = (page) => {
    console.log("page updated");
    setPage(page);
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/products?query=${query}&page=` + page
      );
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
  }, [page, query]);
  return (
    <div className="bg-gray-100">
      <Navbar />
      <div>
        <div>
        <div className='flex gap-8 items-center mt-6 mx-6'>
                <Breadcrumbs breadcrumbs={breadcrumbs}/>
                <p className="text-sm">Search results for <span className="text-blue-600 font-medium">{`${query}`}</span></p>
        </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="flex justify-center w-full">
            <div className={`${products.length == 0?"flex":"grid"} grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:w-[80%] lg:grid-cols-4 gap-8 p-4`}>
              {products.length == 0 ? (
                <div className="mx-auto">
                  <h1 className="text-lg font-medium text-gray-600 ">No products to display</h1>
                </div>
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
};

export default Products;
