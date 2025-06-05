"use client";

import { useState } from "react";

import {
    useQueryBusinessmen,
    useQueryReport,
} from "@/lib/hooks/queries/useQueryBusinessmen";

import { Button, buttonVariants } from "@/ui/atoms/Button";
import { DashboardDataTable } from "@/ui/organisms/DataTables/DashboardDataTable";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export default function Dashboard() {
    const [limit, setLimit] = useState(5);

    const {
        businessmen,
        info,
        goToPage,
        hasNextPage,
        hasPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
    } = useQueryBusinessmen({
        limit,
    });

    const { downloadReport, isDownloadingReport } = useQueryReport();

    return (
        <main className="flex min-h-[90vh] flex-col">
            <header className="border-b border-gray-200 px-10 py-4 shadow-md">
                <h1 className="text-2xl font-bold text-blue-900">
                    Lista Formularios Creados
                </h1>
            </header>

            <section className="mt-4 flex flex-1 flex-col gap-4 px-20">
                <div className="flex items-center justify-end gap-2">
                    <Link
                        href="/dashboard/new"
                        className={cn(buttonVariants({ variant: "default" }))}
                    >
                        Crear Formulario Nuevo
                    </Link>

                    <Button
                        variant="outline"
                        onClick={() => downloadReport()}
                        disabled={isDownloadingReport}
                    >
                        Descargar reporte CSV
                    </Button>
                </div>

                <DashboardDataTable
                    data={businessmen}
                    info={info}
                    goToPage={goToPage}
                    limit={limit}
                    setLimit={setLimit}
                    hasNextPage={hasNextPage}
                    hasPreviousPage={hasPreviousPage}
                    fetchNextPage={fetchNextPage}
                    fetchPreviousPage={fetchPreviousPage}
                />
            </section>

            <footer className="flex h-[15vh] w-full items-center justify-center bg-blue-900">
                <p className="text-white">
                    Prueba Técnica De Uso Exclusivo de OL Software S.A.
                </p>
            </footer>
        </main>
    );
}
