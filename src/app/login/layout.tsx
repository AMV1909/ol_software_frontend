// TP
import type { Metadata } from "next";
import type { ReactNode } from "react";

// BL
import { title } from "@/lib/constants";

export const metadata: Metadata = {
    title: title + " - Login",
    description: "Login to your account",
};

interface Props {
    children: ReactNode;
}

export default function LoginLayout({ children }: Props) {
    return children;
}
