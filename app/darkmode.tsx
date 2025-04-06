"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function DarkMode({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <NextThemesProvider
         attribute="class"
         defaultTheme="dark"
         enableSystem
         disableTransitionOnChange
       >
        {children}
        </NextThemesProvider>
        </GoogleOAuthProvider>
    </div>
  );
}
