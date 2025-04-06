"use client";
import React, { createContext, useState, useEffect } from "react";
import { GetAuthUserData } from "@/services/GlobalApi";

interface AuthContextType {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
});

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("user_token");
        if (token) {
            GetAuthUserData(token).then(userData => {
                setUser(userData);
            }).catch(error => {
                console.error("Error fetching user data:", error);
            });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}