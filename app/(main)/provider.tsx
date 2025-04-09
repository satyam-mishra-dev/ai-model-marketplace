"use client"

import React, { useEffect } from 'react'
import Header from './components/Header'
import { GetAuthUserData } from '@/services/GlobalApi'
import { useRouter } from 'next/navigation'
import { AuthContextProvider } from '@/context/AuthContext'

function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();

    useEffect(() => {
        checkUserAuth();
    }, []);

    const checkUserAuth = async () => {
        try {
            const token = localStorage.getItem("user_token");
            if (!token) {
                router.replace('/sign-in');
                return;
            }
            
            const user = await GetAuthUserData(token);
            if (!user?.email) {
                router.replace('/sign-in');
                return;
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            router.replace('/sign-in');
        }
    };

    return (
        <AuthContextProvider>
            <div>
                <Header />
                {children}
            </div>
        </AuthContextProvider>
    );
}

export default Provider