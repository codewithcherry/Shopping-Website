import React from 'react';
import Navbar from '../components/Navigation/Navbar';
import { useParams,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import ImageGallery from '../components/products/product/ImageGallery';
import ProductSummary from '../components/products/product/ProductSummary';
import axios from 'axios';
import RecentlyViewedProducts from '../components/products/product/RecentlyViewedProducts';
import Footer from '../components/Footer/Footer';

const ProductDetails = () => {
    const { productId } = useParams(); // Extract the ID from the URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate =useNavigate()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/products/product/${productId}`);
                setProduct(response.data);
            } catch (err) {
                setError(err.message);
                navigate("/products")
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);
    return (
        <div className='bg-gray-100  flex flex-col'>
            <Navbar />
            {
                loading?" ":<div className='flex-grow flex justify-center py-10'>
                <div className='container mx-auto flex flex-col lg:flex-row justify-center gap-8'>       
                        <ImageGallery images={product.images}/>              
                        <ProductSummary product={product}/>          
                </div>
            </div>
            }
            <RecentlyViewedProducts />
            <Footer />
        </div>
    );
};

export default ProductDetails;
