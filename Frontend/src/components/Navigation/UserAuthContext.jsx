import React, { createContext } from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';

export const AuthContext=createContext();

export const UserAuthContext = ({children}) => {
    const [isLogged, setIsLogged] = useState(false);

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
            };
            validateToken();
        }, []);

        const logout = () => {
            localStorage.removeItem("jwtToken");
            setIsLogged(false);
        };
        
  return (
    <AuthContext.Provider value={{isLogged,setIsLogged,logout}}>
        {children}
    </AuthContext.Provider>
  )
}


