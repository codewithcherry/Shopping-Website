import React ,{useEffect, useState}from 'react';
import CustomerRatingSummary from './CustomerRatingSummary';
import CustomerReviewForm from './CustomerReviewForm';
import ReviewCard from './ReviewCard';
import axios from 'axios';

const baseURL=import.meta.env.VITE_API_BACKEND;

const CustomerReview = ({productId,setAlert}) => {

  const [reviews,setReviews]=useState([])
  const [page,setPage]=useState(1);
  const [refresh,setRefresh]=useState(0);
  const [hasNext,setHasNext]=useState(true);
  const [ratingsData,setRatingsData]=useState([])
  // const ratingsData = [
  //   { rating: 5, count: 34 },
  //   { rating: 4, count: 20 },
  //   { rating: 3, count: 10 },
  //   { rating: 2, count: 4 },
  //   { rating: 1, count: 2 },
  // ];

  const handlePage=()=>{
    setPage(prev=>prev+1)
  }
  

  const fetchReviewsFromServer=async(productId)=>{
    try{
      const response=await axios.get(baseURL+`/products/get-reviews/productId=${productId}?page=${page}&limit=5`)
      // console.log(response.data)
      setReviews(response.data.reviews)
      setHasNext(response.data.hasNextPage)
      setRatingsData(response.data.ratingsData)
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchReviewsFromServer(productId)
  },[refresh,page])

  return (
    <div className="w-full mx-auto p-6 bg-gray-100">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Ratings Summary */}
        <section className="flex-1 md:w-1/3 p-6">
          <CustomerRatingSummary ratings={ratingsData} />
        </section>

        {/* Form and Reviews */}
        <section className="flex-[2] md:w-2/3  p-6 space-y-6">
          {/* Review Form */}
          <CustomerReviewForm productId={productId} setRefresh={setRefresh} setAlert={setAlert}/>

          {/* Reviews */}
          <div className="space-y-4">
            {reviews.map((review, index) => (
              
                <ReviewCard review={review} key={index} />
              
            ))}      
            <div className='flex justify-center '>
              {hasNext && <button className='w-32 text-lg font-semibold text-blue-600 mx-auto p-4 underline underline-offset-4' onClick={handlePage}>
                  load more
              </button>}
           </div>     
          </div>
          
          
        </section>
      </div>
    </div>
  );
};

export default CustomerReview;
