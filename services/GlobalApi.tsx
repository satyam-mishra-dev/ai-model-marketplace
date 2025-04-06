"use client";

import axios from "axios";

export const GetAuthUserData = async(token: string) => {
   try {
    if (!token) {
        throw new Error('No token provided');
    }

    console.log('Attempting to fetch user data with token:', token.substring(0, 10) + '...');

    const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { 
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        }
    );

    console.log('Google API Response:', {
        status: userInfo.status,
        headers: userInfo.headers,
        data: userInfo.data
    });

    return userInfo.data;
   } catch (error: any) {
       if (axios.isAxiosError(error)) {
           const errorDetails = {
               status: error.response?.status,
               statusText: error.response?.statusText,
               message: error.response?.data?.error?.message || error.message,
               config: {
                   url: error.config?.url,
                   method: error.config?.method,
                   headers: error.config?.headers
               }
           };
           console.error("Google API Error Details:", errorDetails);
       } else {
           console.error("Non-Axios error:", error);
       }
       throw error; // Re-throw to handle in the component
   }
}