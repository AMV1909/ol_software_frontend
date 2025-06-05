// TP
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";

// BL
import { ContextProviders } from "./providers";
import { title } from "@/lib/constants";

// UI
import "@/ui/styles/globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title,
    description: "OL Software & Development",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ContextProviders>{children}</ContextProviders>
            </body>
        </html>
    );
}
