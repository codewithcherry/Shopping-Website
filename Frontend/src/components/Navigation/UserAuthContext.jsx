import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const UserAuthContext = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem("jwtToken");
            if (token) {
                try {
                    await axios.get("http://localhost:3000/validate", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
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
        setIsLogged(false);
    };

    if (loading) return null; // Render nothing until loading completes

    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
