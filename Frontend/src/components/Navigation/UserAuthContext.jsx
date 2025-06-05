import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const baseURL=import.meta.env.VITE_API_BACKEND;

export const AuthContext = createContext();

export const UserAuthContext = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [user,setUser]=useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem("jwtToken");
            if (token) {
                try {
                    const response=await axios.get(baseURL+"/validate", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    // console.log(response.data);
                    setUser(response.data);
                    setIsLogged(true);
                } catch {
                    setIsLogged(false);
                }
            }
            setLoading(false); // Set loading to false after validation
        };
        validateToken();
    }, []);

    const logout = () => {
        localStorage.removeItem("jwtToken");
        setUser({})
        setIsLogged(false);
    };

    if (loading) return null; // Render nothing until loading completes

    return (
        <AuthContext.Provider value={{ isLogged, user, setIsLogged,setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
