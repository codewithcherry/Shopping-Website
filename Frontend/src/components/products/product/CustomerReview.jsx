import React from 'react';
import CustomerRatingSummary from './CustomerRatingSummary';
import CustomerReviewForm from './CustomerReviewForm';
import ReviewCard from './ReviewCard';

const CustomerReview = () => {
  const ratingsData = [
    { rating: 5, count: 34 },
    { rating: 4, count: 20 },
    { rating: 3, count: 10 },
    { rating: 2, count: 4 },
    { rating: 1, count: 2 },
  ];

  const reviews = [
    {
      profileImage: 'https://example.com/user.jpg', // User's profile image URL
      username: 'John Doe', // User's name
      date: 'November 27, 2024', // Date of the review
      rating: 4, 
      description: 'This product is amazing! Highly recommend it.', // Review text
      images: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
      ], // Array of image URLs
      likes: 12, // Initial like count
      dislikes: 3, // Initial dislike count
    },
    {
        profileImage: 'https://example.com/user.jpg', // User's profile image URL
        username: 'John Doe', // User's name
        date: 'November 27, 2024', // Date of the review
        rating: 3, 
        description: 'This product is amazing! Highly recommend it.', // Review text
        images: [
          'https://example.com/image1.jpg',
          'https://example.com/image2.jpg',
        ], // Array of image URLs
        likes: 12, // Initial like count
        dislikes: 3, // Initial dislike count
      },
  ];

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
          <CustomerReviewForm />

          {/* Reviews */}
          <div className="space-y-4">
            {reviews.map((review, index) => (
              
                <ReviewCard review={review} key={index} />
              
            ))}
          </div>
          <div className='flex justify-center'>
            <button className='w-32 text-lg font-semibold text-blue-600 mx-auto p-4 underline underline-offset-4'>
                load more
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomerReview;
