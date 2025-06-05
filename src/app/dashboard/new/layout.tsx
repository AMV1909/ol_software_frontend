// TP
import type { Metadata } from "next";
import type { ReactNode } from "react";

// BL
import { title } from "@/lib/constants";

export const metadata: Metadata = {
    title: title + " - Nuevo Formulario",
    description: "Nuevo Formulario",
};

interface Props {
    children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
    return children;
}
