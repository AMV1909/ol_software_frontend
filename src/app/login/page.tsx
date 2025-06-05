"use client";

// TP
import { redirect } from "next/navigation";
import { ThumbsUp } from "lucide-react";
import Image from "next/image";

// BL
import { useAppStore } from "@/lib/store";

// UI
import { LoginForm } from "@/ui/organisms/forms/LoginForm";
import logo from "@/ui/assets/logo.png";
import backgroundImageLogin from "@/ui/assets/background-image-login.jpg";

export default function Login() {
    const { user } = useAppStore();

    if (user) return redirect("/dashboard");

    return (
        <main className="flex min-h-screen flex-col">
            <header className="flex h-[10vh] items-center justify-between px-10 py-2">
                <Image
                    src={logo}
                    alt="logo"
                    width={100}
                    height={100}
                    className="h-full object-contain"
                    priority
                />

                <div className="flex items-center gap-2">
                    <ThumbsUp className="size-8 rounded-full bg-orange-950 p-2 text-amber-400" />
                    <h3 className="font-bold">Beneficios por renovar</h3>
                </div>
            </header>

            <section className="relative flex h-[90vh] flex-col items-center justify-center gap-4">
                <Image
                    src={backgroundImageLogin}
                    alt="background-image-login"
                    className="absolute -z-10 h-full w-full object-cover"
                    priority
                />

                <h1 className="font-bold text-white">
                    Debes iniciar sesión para acceder a la plataforma
                </h1>

                <LoginForm />
            </section>
        </main>
    );
}
