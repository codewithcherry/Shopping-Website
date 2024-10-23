// NotFound.js
import React from 'react';
import { useNavigate} from 'react-router-dom'; // Make sure you have react-router-dom installed

const NotFound = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const goHome = () => {
        navigate('/'); // Navigate to the home page
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-red-600">404</h1>
                <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
                <p className="mt-2 text-gray-600">
                    Sorry, the page you are looking for does not exist.
                </p>
                <button
                    onClick={goHome}
                    className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default NotFound;
