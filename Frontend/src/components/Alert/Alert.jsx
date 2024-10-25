import React from 'react';
import { CheckCircleIcon, ExclamationCircleIcon,ExclamationTriangleIcon,InformationCircleIcon} from '@heroicons/react/24/outline';

const Alert = ({ type , message, onClose }) => {
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

  // Get the selected style
  const { icon, bgColor, borderColor, textColor } = alertTypes[type];

  return (
    <div className='flex justify-center'>
    <div className={`flex items-start w-1/2 absolute  p-4  text-sm ${bgColor} ${borderColor} ${textColor} border-l-4 rounded-lg`} role="alert">
      <div className="flex-shrink-0">{icon}</div>
      <div className="ml-3">
        <span className="font-medium">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
        <p>{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="ml-auto text-gray-500 hover:text-gray-700">
          &times;
        </button>
      )}
    </div>
    </div>
  );
};

export default Alert;
