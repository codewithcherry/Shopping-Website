import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Alert from "../../../../Alert/Alert";    
import AdminProductCard from '../products/AdminProductCard';
import axios from 'axios';
import ProductPagination from "../../../../pagination/ProductPagination";
import ProductFilter from "./ProductFilter";

const AdminAllProducts = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dataReceived = location.state || null;
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(dataReceived);
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();

    const handleAlert = () => {
        setAlert(null);
    };

    const handlePagination = useCallback((page) => {
        setPage(page);
        setSearchParams((prevParams) => {
            const params = new URLSearchParams(prevParams);
            params.set('page', page);
            return params;
        });
    }, [setSearchParams]);

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams(searchParams);
                const response = await axios.get(
                    `http://localhost:3000/admin/products?page=${params.get('page') || 1}&${params.toString()}`,
                    config
                );

                setProducts(response.data.products);
                setPagination(response.data.pagination);
            } catch (err) {
                setAlert({ type: "error", message: err.response?.data?.message || "Failed to fetch products" });
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchParams]); // Refetch whenever searchParams change

    const handleApplyFilters = (filters) => {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (Array.isArray(value) && value.length > 0) {
                params.set(key, value.join(',')); // Handle arrays
            } else if (key === 'price') {
                params.set(key, value.join('-')); // Handle price range
            } else if (value) {
                params.set(key, value);
            }
        });

        setSearchParams(params); // Update URL with new filters
        setPage(1); // Reset to first page
    };

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
            <div className="p-2">
                <h1 className="text-2xl font-semibold text-gray-700 mx-10 mt-4 px-2">All Products</h1>
            </div>
            <div className="flex">
                <div className="mx-2">
                    <ProductFilter onApplyFilters={handleApplyFilters} />
                </div>
                <div className="w-full flex justify-center">
                    {loading ? (
                        <div>Loading...</div>
                    ) : products.length > 0 ? (
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-10">
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
            </div>
            <div className="flex justify-center w-full mx-auto">
                <ProductPagination
                    paginationData={pagination}
                    onPageChange={handlePagination}
                />
            </div>
        </div>
    );
};

export default AdminAllProducts;
