import React from 'react'
import ProductCategory from './components/add/ProductCategory'
import { useState } from 'react';
import ProductSizeSelector from './components/add/ProductSizeSelector';
import ProductImageUploader from './components/add/ProductImageUploader';
import ProductData from './components/add/ProductData';
import ProductStockDetails from './components/add/ProductStockDetails';
import ProductPriceDetails from './components/add/ProductPriceDetails';

const AdminAddProduct = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [selectedClothingType, setSelectedClothingType] = useState('');
    const [selectedSizes, setSelectedSizes] = useState([]);
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
      
    const handleDataChange = (data) => {
            setProductData(data);
            console.log('Current Product Data:', data);
            };

    const handleImagesChange = (images) => {
        setProductImages(images);
    };

    const handleSizeSelectionChange = (clothingType, sizes) => {
        setSelectedClothingType(clothingType);
        setSelectedSizes(sizes);
    };
    
    const handleSelectionCategory = (category, subCategory) => {
      setSelectedCategory(category);
      setSelectedSubCategory(subCategory);
    };

    const handleStockChange = (data) => {
        setStockData(data);
        console.log('Current Stock Data:', data);
      };

    const handlePriceChange = (data) => {
        setPriceData(data);
        console.log('Current Price Data:', data);
      };
  return (
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
  )
}

export default AdminAddProduct
