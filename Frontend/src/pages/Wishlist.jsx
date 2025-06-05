import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../components/Navigation/UserAuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navigation/Navbar';
import Footer from '../components/Footer/Footer';
import Breadcrumbs from '../components/Navigation/BreadCrumbs';
import Loading from '../components/Alert/Loading';
import ProductCard from '../components/products/ProductCard';
import {TrashIcon} from '@heroicons/react/24/outline'
import Alert from '../components/Alert/Alert';

const baseURL=import.meta.env.VITE_API_BACKEND;

const Wishlist = () => {
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(false);
    const [products, setProducts] = useState([]);
    const [refresh,setRefresh]=useState(0);

    const { isLogged } = useContext(AuthContext);
    const navigate = useNavigate();

    const breadcrumbs = [
        { label: 'Home', link: '/' },
        { label: 'Account', link: '/account' },
        { label: 'Wishlist', link: '/wishlist' },
    ];

    const fetchWishlistProductsFromServer = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.get(baseURL+'/user/get-wishlist', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProducts(response.data);
            setLoading(false);
        } catch (err) {
            // console.error(err.response.data);
            const error = err.response.data;
            setAlert({ type: error.type, message: error.message });
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.delete(`http://localhost:3000/user/remove-product-wishlist?productId=${productId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setAlert(response.data);
            setTimeout(()=>setAlert(null),3000);
            setRefresh(prev=>prev+1);
        } catch (err) {
            // console.error(err.response?.data || err.message);
            setAlert({type:err.response.data.type,message:error.response.data.message})
        }
    };
    

    useEffect(() => {
        if (!isLogged) {
            const data = {
                type: 'warning',
                message: 'Login to your account for wishlist',
            };
            navigate('/login', { state: data });
        } else {
            fetchWishlistProductsFromServer();
        }
    }, [refresh]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Navbar />
            {alert && <Alert type={alert.type} message={alert.message} onClose={()=>setAlert(null)}/>}
            <div className="mt-4 p-2">
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div className="flex-grow p-4">
                {loading ? (
                    <Loading />
                ) : (
                    <div>
                        {products.length === 0 ? (
                            <div className="text-center mt-8">
                                <h1 className="text-xl font-semibold text-gray-600">No Products added to your wishlist</h1>
                            </div>
                        ) : (
                            <div className="w-[80%] mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {products.map((product, index) => (
                                    <div className='relative'  key={index} >
                                        <TrashIcon className='w-6 h-6 text-red-400 absolute top-2 right-2 z-10 hover:cursor-pointer hover:text-red-600'  onClick={()=>removeFromWishlist(product._id)}/>
                                        <ProductCard product={product}/>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Wishlist;
