// TP
import type { Metadata } from "next";
import type { ReactNode } from "react";

// BL
import { title } from "@/lib/constants";
import { DashboardNavbar } from "@/ui/molecules/DashboardNavbar";

export const metadata: Metadata = {
    title: title + " - Dashboard",
    description: "Dashboard",
};

interface Props {
    children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
    return (
        <>
            <DashboardNavbar />
            {children}
        </>
    );
}
