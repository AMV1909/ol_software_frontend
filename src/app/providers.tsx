"use client";

// TP
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AxiosError } from "axios";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";
import { resetAppStore } from "@/lib/store";

interface Props {
    children: ReactNode;
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: (_, error) => {
                if (error instanceof AxiosError) {
                    if (error.response?.status === 401) {
                        localStorage.removeItem("token");
                        resetAppStore();
                        window.location.href = "/login";
                    }

                    return error.response?.status !== 404;
                }

                return true;
            },
            staleTime: 60000, // 1 minute
        },
        mutations: {
            onError: (error) => {
                if (
                    error instanceof AxiosError &&
                    error.response?.status === 401
                ) {
                    localStorage.removeItem("token");
                    resetAppStore();
                    window.location.href = "/login";
                }
            },
        },
    },
});

export function ContextProviders({ children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Toaster />
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}
