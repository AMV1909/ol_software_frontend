"use client";

// TP
import { usePathname } from "next/navigation";
import { ThumbsUp, User2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// BL
import { useAppStore } from "@/lib/store";
import { userRolesMap } from "@/lib/schemas/entities/user";

// UI
import logo from "@/ui/assets/logo.png";
import { cn } from "@/lib/utils/cn";

export function DashboardNavbar() {
    const { user } = useAppStore();
    const path = usePathname();

    const links = [
        { label: "Lista Formulario", href: "/dashboard" },
        { label: "Crear Formulario", href: "/dashboard/new" },
    ];

    if (!user) return null;

    return (
        <nav className="flex h-[10vh] items-center justify-between border-b border-gray-200 px-10 py-2 shadow-md">
            <Image
                src={logo}
                alt="logo"
                width={100}
                height={100}
                className="h-full object-contain"
                priority
            />

            {links.map((link, index) => (
                <div key={link.href} className="flex items-center gap-2">
                    <span
                        className={cn(
                            "flex size-4 items-center justify-center rounded-full bg-gray-500 p-1 text-sm text-white",
                            path === link.href && "bg-blue-600",
                        )}
                    >
                        {index + 1}
                    </span>
                    <Link href={link.href}>{link.label}</Link>
                </div>
            ))}

            <div className="flex items-center gap-2">
                <ThumbsUp className="size-8 rounded-full bg-orange-950 p-2 text-amber-400" />
                <h3 className="font-bold">Beneficios por renovar</h3>
            </div>

            <div className="flex items-center gap-1">
                <User2 className="size-full rounded-full border-2 border-gray-200 p-2" />

                <div className="flex flex-col [&>p]:text-nowrap">
                    <p className="font-bold text-blue-900">Bienvenido!</p>
                    <p className="text-sm text-gray-500">{user.name}</p>

                    <p className="text-sm text-gray-500">
                        {userRolesMap[user.role]}
                    </p>
                </div>
            </div>
        </nav>
    );
}
