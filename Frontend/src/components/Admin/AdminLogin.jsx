import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon} from '@heroicons/react/24/outline';
import Alert from '../Alert/Alert'
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';

const baseURL=import.meta.env.VITE_API_BACKEND;

const AdminLogin = () => {
    const navigate=useNavigate()
    const location=useLocation()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [alert,setAlert]=useState(location.state || '');

    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Username:", username);
        // console.log("Password:", password);
    
        try {    
            const data = JSON.stringify({ username: username, password: password });
            const config = { 
                headers: {
                    "Content-Type": "application/json"
                }
            };
            // Await axios.post to get the response after the request completes
            const response = await axios.post(baseURL+"/admin/login", data, config);
            
            setAlert({type:response.data.type,message:response.data.message})            
            const token=response.data.token
            await localStorage.setItem('adminToken',token)
            if(response.data.type=="success"){
                navigate("/admin/dashboard");
            }           
        }
        catch (err) {
            setAlert({type:err.response.data.type,message:err.response.data.message})
        }
    };

    

    return (
        <>
        {alert && <Alert type={alert.type} message={alert.message} onClose={()=>{setAlert(null)}}/>}
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Admin Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="w-5 h-5" />
                                ) : (
                                    <EyeIcon className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
        </>
    );
};

export default AdminLogin;
