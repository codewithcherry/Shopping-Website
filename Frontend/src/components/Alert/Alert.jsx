import React, { useState, useEffect } from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const Alert = ({ type, message, onClose, duration = 3000 }) => {
  const [alert, setAlert] = useState(true);

  // Icon and styling based on alert type
  const alertTypes = {
    success: {
      icon: <CheckCircleIcon className="text-green-600 w-6 h-6" />,
      bgColor: "bg-green-100",
      borderColor: "border-green-500",
      textColor: "text-green-600",
    },
    error: {
      icon: <ExclamationCircleIcon className="text-red-600 w-6 h-6" />,
      bgColor: "bg-red-100",
      borderColor: "border-red-500",
      textColor: "text-red-600",
    },
    warning: {
      icon: <ExclamationTriangleIcon className="text-yellow-600 w-6 h-6" />,
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-500",
      textColor: "text-yellow-600",
    },
    info: {
      icon: <InformationCircleIcon className="text-blue-600 w-6 h-6" />,
      bgColor: "bg-blue-100",
      borderColor: "border-blue-500",
      textColor: "text-blue-600",
    },
  };

  const { icon, bgColor, borderColor, textColor } = alertTypes[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false);
      onClose && onClose();
    }, duration);

    return () => clearTimeout(timer); // Cleanup timer
  }, [duration, onClose]);

  const handleClose = () => {
    setAlert(false);
    setTimeout(() => onClose && onClose(), 300); // Match animation duration
  };

  return (
    alert && (
      <div
        className={`fixed top-20 right-10 flex items-start z-20 p-4 text-sm ${bgColor} ${borderColor} ${textColor} border-l-4 rounded-lg shadow-lg 
        transform transition-opacity duration-300 ease-in-out ${
          alert ? "opacity-100" : "opacity-0"
        } animate-grow`}
        style={{
          maxWidth: "400px", // Ensure it doesn't exceed max width
          width: "80%", // Lock width after animation
        }}
        role="alert"
      >
        <div className="flex-shrink-0 overflow-hidden">{icon}</div>
        <div className="ml-3">
          <span className="font-medium">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
          <p className="">{message}</p>
        </div>
        <button
          onClick={handleClose}
          className="ml-auto text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>
    )
  );
};

export default Alert;
