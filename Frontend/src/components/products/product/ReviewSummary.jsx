import React from 'react';

const ReviewSummary = () => {
  // Review data
  const reviews = {
    averageRating: 4.2,  // Average rating out of 5
    totalReviews: 120,   // Total number of reviews
  };

  return (
    <div className="flex items-center space-x-2 max-w-sm mb-2">
      {/* Golden Star Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="w-5 h-5 text-yellow-500"
        viewBox="0 0 24 24"
      >
        <path d="M12 .587l3.668 7.431 8.2 1.179-5.917 5.771 1.398 8.143L12 18.897l-7.349 3.875 1.398-8.143L.832 9.197l8.2-1.179L12 .587z" />
      </svg>

      {/* Rating and Review Count */}
      
        <p className="text-md font-semibold text-gray-800">{reviews.averageRating.toFixed(1)} rating |</p>
        <p className="text-sm text-blue-500">{reviews.totalReviews} reviews</p>
      
    </div>
  );
};

export default ReviewSummary;
