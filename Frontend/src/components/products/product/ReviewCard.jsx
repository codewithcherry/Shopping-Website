import React, { useState } from "react";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  FlagIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as SolidStarIcon } from "@heroicons/react/24/solid"; // Solid (filled) star
import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline"; // Outline star

const ReviewCard = ({ review }) => {
  const [likes, setLikes] = useState(review.likes || 0); // Like count state
  const [dislikes, setDislikes] = useState(review.dislikes || 0); // Dislike count state

  const handleLike = () => setLikes((prev) => prev + 1);
  const handleDislike = () => setDislikes((prev) => prev + 1);
  const handleReport = () => alert("Review has been reported!");

  // Generate stars based on rating
  const renderStars = (rating) => {
    const totalStars = 5;
    return Array.from({ length: totalStars }, (_, index) =>
      index < rating ? (
        <SolidStarIcon key={index} className="h-5 w-5 text-yellow-400" />
      ) : (
        <OutlineStarIcon key={index} className="h-5 w-5 text-gray-300" />
      )
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto w-full mb-6">
      {/* User Info */}
      <div className="flex items-center space-x-4">
        <img
          src={`https://www.shutterstock.com/image-photo/positive-handsome-young-latin-entrepreneur-260nw-2500823337.jpg`}
          alt={review.username}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <h3 className="text-gray-800 font-semibold text-lg">
            {"Jhone doe"}
          </h3>
          <p className="text-sm text-gray-500">{new Date(review.date).toLocaleString()}</p>
        </div>
      </div>

      {/* Star Rating */}
      <div className="flex items-center mt-2">{renderStars(review.rating)}</div>

      {/* Review Description */}
      <p className="text-gray-700 mt-4">{review.reviewText}</p>

      {/* Review Images */}
      {review.images?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {review.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Review Image ${index + 1}`}
              className="h-32 w-32 object-cover rounded-lg shadow-md"
            />
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center space-x-6 mt-6">
        {/* Like */}
        <button
          aria-label="Like this review"
          className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 focus:outline-none"
          onClick={handleLike}
        >
          <HandThumbUpIcon className="h-5 w-5" />
          <span>{likes}</span>
        </button>

        {/* Dislike */}
        <button
          aria-label="Dislike this review"
          className="flex items-center space-x-1 text-gray-600 hover:text-red-500 focus:outline-none"
          onClick={handleDislike}
        >
          <HandThumbDownIcon className="h-5 w-5" />
          <span>{dislikes}</span>
        </button>

        {/* Report */}
        <button
          aria-label="Report this review"
          className="flex items-center space-x-1 text-gray-600 hover:text-yellow-500 focus:outline-none"
          onClick={handleReport}
        >
          <FlagIcon className="h-5 w-5" />
          <span>Report</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
