"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConvexReactClient } from "convex/react"
import { ConvexProvider } from "convex/react"
import { AuthContext } from "@/context/AuthContext";
export default function DarkMode({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const [user, setUser] = React.useState();
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  
  return (
    <div>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <ConvexProvider client={convex}>
            <AuthContext.Provider value={{user, setUser}}>
        <NextThemesProvider
         attribute="class"
         defaultTheme="dark"
         enableSystem
         disableTransitionOnChange
       >
        {children}
        </NextThemesProvider>
            </AuthContext.Provider>
        </ConvexProvider>
        </GoogleOAuthProvider>
    </div>
  );
}
