"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export default function DarkMode({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div>
        <NextThemesProvider
         attribute="class"
         defaultTheme="dark"
         enableSystem
         disableTransitionOnChange
       >
        {children}
        </NextThemesProvider>
    </div>
  );
}
