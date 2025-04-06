"use client";

import React from 'react';
import Image from 'next/image';
import Button from '@/components/button';
import { useGoogleLogin } from '@react-oauth/google';
import { GetAuthUserData } from '@/services/GlobalApi';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

function page() {
    const CreateUser = useMutation(api.users.CreateUser);
    
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse);
            if(typeof window !== 'undefined') {
                localStorage.setItem('access_token', tokenResponse.access_token!);
            }
            const userData = await GetAuthUserData(tokenResponse.access_token!);
            console.log(userData);
            
            // Create user in database
            try {
                const newUser = await CreateUser({
                    name: userData.name,
                    email: userData.email,
                    picture: userData.picture
                });
                console.log("User created:", newUser);
            } catch (error) {
                console.error("Error creating user:", error);
            }
            
        },
        onError: (errorResponse) => console.log(errorResponse),
    });

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            <div className="gap-10 rounded-2xl p-10 shadow-md bg-gray-50 dark:bg-gray-800 flex flex-col items-center justify-center">
                <Image src="/logo.svg" alt="logo" width={50} height={50} />
                <h2 className="text-2xl">Start your AI journey by Signing In</h2>
                <Button sub="Sign-in" onClick={() => googleLogin()}></Button>
            </div>
        </div>
    );
}

export default page;