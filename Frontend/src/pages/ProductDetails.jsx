import React from 'react';
import Navbar from '../components/Navigation/Navbar';
import { useParams,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import ImageGallery from '../components/products/product/ImageGallery';
import ProductSummary from '../components/products/product/ProductSummary';
import axios from 'axios';
import RecentlyViewedProducts from '../components/products/product/RecentlyViewedProducts';
import Footer from '../components/Footer/Footer';
import Breadcrumbs from '../components/Navigation/BreadCrumbs';
import Alert from '../components/Alert/Alert';

const ProductDetails = () => {
    const { productId } = useParams(); // Extract the ID from the URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alert,setAlert]=useState()

    const navigate =useNavigate()

    const breadcrumbs = [
        { label: 'Home', link: '/' },
        { label: 'Products', link: '/products' },
        { 
          label: product?.category || '', 
          link: `/products/${product?.category || ''}` 
        },
        { 
          label: product?.subCategory || '', 
          link: `/products/${product?.subCategory || ''}` 
        },
        { 
            label: product?.title || '', 
            link: `/products/${product?.title || ''}` 
          }
      ];
      

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
            {alert && <Alert type={alert.type} message={alert.message} onClose={()=>setAlert(null)} />}
            <div className='mt-6 mx-6'>
                <Breadcrumbs breadcrumbs={breadcrumbs}/>
            </div>
            {
                loading?" ":<div className='flex-grow flex justify-center py-10'>
                <div className='container mx-auto flex flex-col lg:flex-row justify-center gap-8'>       
                        <ImageGallery images={product.images}/>              
                        <ProductSummary product={product}setAlert={setAlert}/>          
                </div>
            </div>
            }
            <RecentlyViewedProducts />
            <Footer />
        </div>
    );
};

export default ProductDetails;
