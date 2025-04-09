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
        console.log("Token found in localStorage:", token);
        if (!token) {
            console.warn("No token found in localStorage. Redirecting to sign-in page.");
            window.location.href = "/auth/sign-in";
            return;
        }
        if (token) {
            GetAuthUserData(token).then(userData => {
                console.log("Fetched user data:", userData);
                setUser(userData);
            }).catch(error => {
                console.error("Error fetching user data:", error);
            });
        } else {
            console.warn("No token found in localStorage.");
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}