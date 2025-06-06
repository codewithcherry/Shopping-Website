import React from 'react'
import ProductCategory from './components/add/ProductCategory'
import { useState } from 'react';
import ProductSizeSelector from './components/add/ProductSizeSelector';
import ProductImageUploader from './components/add/ProductImageUploader';
import ProductData from './components/add/ProductData';
import ProductStockDetails from './components/add/ProductStockDetails';
import ProductPriceDetails from './components/add/ProductPriceDetails';
import { useCallback } from 'react';
import Alert from "../../Alert/Alert"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const baseURL=import.meta.env.VITE_API_BACKEND;


const AdminAddProduct = () => {
  const [alert,setAlert]=useState('');
  const [loading,setLoading]=useState(false)
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [selectedClothingType, setSelectedClothingType] = useState('');
    const [selectedSizes, setSelectedSizes] = useState(['os']);
    const [productImages, setProductImages] = useState([]);
    const [productData, setProductData] = useState({
          title: '',
          shortDescription: '',
          description: '',
          brand: '',
        });
    const [stockData, setStockData] = useState({
            stockQuantity: 0,
            sku: '',
            restockDate: '',
          });
    const [priceData, setPriceData] = useState({
            basePrice: 0,
            discount: 0,
            finalPrice: 0,
          });
      
    const handleDataChange = useCallback((data) => {
      setProductData(data);  
      },[])

    const handleImagesChange = useCallback((images) => {
      setProductImages(images);
  },[]);

    const handleSizeSelectionChange = useCallback((clothingType, sizes) => {
      setSelectedClothingType(clothingType);
      setSelectedSizes(sizes);
  },[])
    
    const handleSelectionCategory = useCallback((category, subCategory) => {
      setSelectedCategory(category);
      setSelectedSubCategory(subCategory);
    },[]);

    const handleStockChange = useCallback((data) => {
      setStockData(data);
      
    },[])

    const handlePriceChange = useCallback((data) => {
      setPriceData(data);
      
    },[])

    const navigate=useNavigate()

    const handleDiscard=()=>{
       // Resetting all the states to their default values
    setSelectedCategory('');
    setSelectedSubCategory('');
    setSelectedClothingType('');
    setSelectedSizes(['os']);
    setProductImages([]);
    setProductData({
        title: '',
        shortDescription: '',
        description: '',
        brand: '',
    });
    setStockData({
        stockQuantity: 0,
        sku: '',
        restockDate: '',
    });
    setPriceData({
        basePrice: 0,
        discount: 0,
        finalPrice: 0,
    });
  
    
    }

    const handleAdd=async()=>{
      setLoading(true)
      const product={
          title: productData.title,
          shortDescription:productData.shortDescription,
          description: productData.description,
          brand: productData.brand,
          category:selectedCategory,
          subCategory:selectedSubCategory,
          images:productImages,
          stockQuantity: stockData.stockQuantity,
          sku: stockData.sku,
          restockDate: stockData.restockDate,
          basePrice: priceData.basePrice,
          discount: priceData.discount,
          finalPrice: priceData.finalPrice,
          sizes:selectedSizes
      }
      const token=localStorage.getItem("adminToken");
      
      try {
        const response = await axios.post(
          baseURL+'/admin/add-product',
          JSON.stringify(product), // Convert data to JSON format
          {
            headers: {
              'Content-Type': 'application/json', // Specify JSON content type
              Authorization: `Bearer ${token}`
            }
          }
        );
       
        setLoading(false)
        const dataToSend ={type:response.data.type, message:response.data.message};
        navigate('/admin/dashboard/products', { state: dataToSend });
    

      } catch (error) {
        
        setLoading(false)
        setAlert({type:error.response.data.type,message:error.response.data.message})
      }
    }
  return (
    <>
    <div className=' relative w-full bg-gray-100 '>
      {loading && <div className='absolute flex justify-center items-center opacity-80 w-full h-full bg-gray-50 z-10'>
      <span className=''>
        <svg width="32px" height="32px" viewBox="-2.24 -2.24 20.48 20.48" xmlns="http://www.w3.org/2000/svg" fill="none" className="animate-spin hds-flight-icon--animation-loading"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="#000000" fillRule="evenodd" clipRule="evenodd"> <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" opacity=".2"></path> <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"></path> </g> </g></svg>
      </span>
      </div>
      }
      <div className='relative'>
          <h2 className='text-2xl text-gray-700 font-semibold p-4 mx-4 my-4'>Add new product</h2>
          <div className='absolute top-2 right-10 flex gap-2'>
          
          <button className=' text-md text-white font-medium bg-green-500 hover:bg-green-600 p-2 m-2 rounded-2xl' onClick={handleAdd}>Add Product</button>
      </div>
      </div>
      {alert && <Alert type={alert.type} message={alert.message} onClose={()=>setAlert(null)}/>}
    <div className='flex justify-center bg-gray-100 w-full'>
        <div className='w-[60%]'>
            <ProductCategory onSelectionChange={handleSelectionCategory}/>
            <ProductData onDataChange={handleDataChange}/>
            <ProductPriceDetails onPriceChange={handlePriceChange} />
        </div>
        <div className='w-[30%] '>
            <ProductImageUploader onImagesChange={handleImagesChange} />
            <ProductSizeSelector onSizeSelectionChange={handleSizeSelectionChange}/>
            <ProductStockDetails onStockChange={handleStockChange}/>
        </div>
    </div>
    </div>
    </>
  )
}

export default AdminAddProduct
