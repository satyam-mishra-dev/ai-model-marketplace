"use client";

import axios from "axios";

export const GetAuthUserData = async(token: string) => {
   try {
    const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { 
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            },
            validateStatus: (status) => status < 500 // Only reject if server error
        }
    );

    if (userInfo.status === 401) {
        console.error('Authorization failed - invalid token');
        return null;
    }

    return userInfo.data;
   } catch (error) {
       console.error("Error fetching user data:", error);
       return null;
   }
}