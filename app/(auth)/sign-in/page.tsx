"use client";

import React from 'react';
import Image from 'next/image';
import Button from '@/components/button';
import { useGoogleLogin } from '@react-oauth/google';
import { GetAuthUserData } from '@/services/GlobalApi';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

function Page() {
    const router = useRouter();
    const CreateUser = useMutation(api.users.CreateUser);
    const { setUser } = useContext(AuthContext);
    
    const googleLogin = useGoogleLogin({
        flow: 'implicit',
        scope: 'openid email profile',
        onSuccess: async (tokenResponse) => {
            try {
                console.log("Token Response:", tokenResponse);
                
                if (!tokenResponse.access_token) {
                    console.error("No access token received");
                    return;
                }

                // Save token
                localStorage.setItem('access_token', tokenResponse.access_token);

                // Get user data from Google
                const userData = await GetAuthUserData(tokenResponse.access_token);
                console.log("Google user data:", userData);

                if (!userData) {
                    console.error("Failed to get user data from Google");
                    return;
                }

                // Create or get user in database
                const dbUser = await CreateUser({
                    name: userData.name,
                    email: userData.email,
                    picture: userData.picture
                });

                // Update context
                setUser(dbUser);
                
                // Redirect to main page
                router.push('/ai-assistants');
            } catch (error) {
                console.error("Error in sign-in process:", error);
            }
        },
        onError: (errorResponse) => {
            console.error("Google login error:", errorResponse);
        },
    });

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            <div className="gap-10 rounded-2xl p-10 shadow-md bg-gray-50 dark:bg-gray-800 flex flex-col items-center justify-center">
                <Image src="/logo.svg" alt="logo" width={50} height={50} />
                <h2 className="text-2xl">Start your AI journey by Signing In</h2>
                <Button sub="Sign-in" onClick={() => googleLogin()} />
            </div>
        </div>
    );
}

export default Page;