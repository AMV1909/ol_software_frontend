"use client";

import { use } from "react";
import { useQueryBusinessman } from "@/lib/hooks/queries/useQueryBusinessmen";
import { BusinessmanForm } from "@/ui/organisms/forms/BusinessmanForm";

interface Props {
    params: Promise<{ businessmanId: string }>;
}

export default function NewFormPage({ params }: Props) {
    const { businessmanId } = use(params);
    const { businessman } = useQueryBusinessman(Number(businessmanId));

    if (!businessman) return null;

    return (
        <main className="flex min-h-[90vh] flex-col">
            <header className="border-b border-gray-200 bg-blue-50 px-10 py-4 shadow-md">
                <h1 className="text-2xl font-bold text-blue-900">Empresa 1</h1>
            </header>

            <section className="flex-1 bg-blue-200 px-20 py-10">
                <BusinessmanForm mode="edit" businessman={businessman} />
            </section>
        </main>
    );
}
