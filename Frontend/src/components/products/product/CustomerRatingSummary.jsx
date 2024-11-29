import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";

const CustomerRatingSummary = ({ ratings }) => {
  const [isExplanationVisible, setIsExplanationVisible] = useState(false);

  const totalRatings = ratings.reduce((sum, { count }) => sum + count, 0);
  const averageRating =
    ratings.reduce((sum, { rating, count }) => sum + rating * count, 0) /
    totalRatings;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto w-full sm:w-96">
      <h2 className="text-lg font-semibold text-gray-800 text-center">
        Customer Reviews
      </h2>
      <div className="flex items-center justify-center mt-4">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`h-6 w-6 ${
              i < Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-gray-600 text-lg font-medium">
          {averageRating.toFixed(1)} out of 5
        </span>
      </div>
      <p className="text-center text-sm text-gray-500 mt-1">
        {totalRatings} customer ratings
      </p>
      <div className="mt-4 space-y-3">
        {ratings.map(({ rating, count }) => {
          const percentage = ((count / totalRatings) * 100).toFixed(0);
          return (
            <div key={rating} className="flex items-center">
              <span className="text-sm font-medium text-gray-600 w-12">
                {rating} Star
              </span>
              <div className="flex-1 h-3 bg-gray-200 rounded-lg mx-2 relative">
                <div
                  className="h-3 bg-yellow-400 rounded-lg"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">{percentage }%</span>
            </div>
          );
        })}
      </div>
      <div className="mt-4">
        <button
          className="text-center text-sm text-blue-500 cursor-pointer hover:underline focus:outline-none"
          onClick={() => setIsExplanationVisible(!isExplanationVisible)}
        >
          {isExplanationVisible
            ? "Hide explanation"
            : "How do we calculate ratings?"}
        </button>
        {isExplanationVisible && (
          <div className="mt-2 text-gray-600 text-sm">
            <p>
              Our ratings are calculated based on an average of all customer
              ratings. Each star level is weighted proportionally to the number
              of ratings it received. For example, if most customers rate 5
              stars, the average will lean closer to 5.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerRatingSummary;
