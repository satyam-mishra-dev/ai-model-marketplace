"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { AuthContextProvider } from "@/context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import DarkMode from "./darkmode";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexProvider client={convex}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <AuthContextProvider>
          <DarkMode>{children}</DarkMode>
        </AuthContextProvider>
      </GoogleOAuthProvider>
    </ConvexProvider>
  );
}