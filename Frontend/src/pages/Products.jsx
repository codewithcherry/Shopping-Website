import React from "react";
import Navbar from "../components/Navigation/Navbar";
import { useLocation, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../components/products/ProductCard";
import axios from "axios";
import Breadcrumbs from '../components/Navigation/BreadCrumbs';
import ProductPagination from "../components/pagination/ProductPagination";
import Footer from "../components/Footer/Footer";
import Loading from "../components/Alert/Loading";
import ProductFilter from "../components/products/product/ProductFilter";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);

  // React Router hooks to manage URL search parameters
  const [searchParams] = useSearchParams();

  // Extracting search parameters
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";
  const subCategory = searchParams.get("subCategory") || "";
  const priceRange = searchParams.get("priceRange") || "";
  const sort = searchParams.get("sort") || "";
  const flashSale = searchParams.get("flashSale") || false;
  const bestSelling=searchParams.get('bestSelling') || false;

  // Breadcrumbs array
  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Products', link: `/products` },
  ];

  // Handle pagination change
  const handlePagination = (newPage) => {
    console.log(newPage)
    setPage(newPage);
  };

  // Fetch products based on URL parameters
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/products?page=${page}`, {
        params: {
          query,
          category,
          subCategory,
          priceRange,
          sort,
          flashSale,
          bestSelling
        },
      });
      setProducts(response.data.products);
      // console.log(response.data.pagination);
      setPagination(response.data.pagination);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetchProducts when dependencies change
  useEffect(() => {
    fetchProducts();
  }, [query,page, searchParams]);
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
        <div className="flex mx-2">
          <div className="p-4">
            <ProductFilter setPage={setPage} />
          </div>
          <div>
          {loading ? (
              <Loading />
            ) : (
              <div className="flex justify-center w-full">
                <div className={`${products.length == 0?"flex":"grid"} grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-8 p-4`}>
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
        </div>
        
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
