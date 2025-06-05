// TP
import { format } from "date-fns";

// BL
import { cn } from "@/lib/utils/cn";
import {
    businessmanStatusesMap,
    type Businessman,
} from "@/lib/schemas/entities/businessman";

// UI
import { DataTable, type DataTableProps } from "@/ui/molecules/DataTable";
import {
    useDeleteBusinessman,
    usePatchBusinessmanStatus,
} from "@/lib/hooks/queries/useQueryBusinessmen";
import Link from "next/link";
import {
    CheckCircle,
    SquarePen,
    Trash2,
    XCircle,
    XCircleIcon,
} from "lucide-react";
import { Button } from "@/ui/atoms/Button";

interface Props extends Omit<DataTableProps, "columns" | "values"> {
    data: Businessman[];
}

export function DashboardDataTable({ data, ...props }: Props) {
    const columns: DataTableProps["columns"] = [
        "Razón Social",
        "Teléfono",
        "Correo Electrónico",
        "Fecha de Registro",
        "No. Establecimientos",
        "Estado",
        "Acciones",
    ];

    const values: DataTableProps["values"] = data.map((businessman) => ({
        values: [
            businessman.name,
            businessman.phone,
            businessman.email,
            format(businessman.createdAt, "dd-MM-yyyy"),
            businessman.establishmentsCount,
            <Status status={businessman.status} />,
            <Actions
                businessmanId={businessman.id}
                status={businessman.status}
            />,
        ],
    }));

    return <DataTable columns={columns} values={values} {...props} />;
}

function Status({ status }: { status: Businessman["status"] }) {
    const className = {
        ACTIVE: "border border-green-500 text-green-500",
        INACTIVE: "border border-red-500 text-red-500",
    } as const;

    return (
        <p className={cn("rounded-md px-2 py-1 text-sm", className[status])}>
            {businessmanStatusesMap[status]}
        </p>
    );
}

function Actions({
    businessmanId,
    status,
}: {
    businessmanId: number;
    status: Businessman["status"];
}) {
    const { updateBusinessmanStatus, isUpdatingBusinessmanStatus } =
        usePatchBusinessmanStatus(businessmanId);
    const { deleteBusinessman, isDeletingBusinessman } =
        useDeleteBusinessman(businessmanId);

    return (
        <div className="flex items-center justify-center gap-2">
            <Link href={`/dashboard/${businessmanId}/edit`}>
                <SquarePen />
            </Link>

            <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                    updateBusinessmanStatus(
                        status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
                    )
                }
                className="w-fit"
                disabled={isUpdatingBusinessmanStatus}
            >
                {status === "ACTIVE" ? (
                    <XCircleIcon className="size-5 text-red-500" />
                ) : (
                    <CheckCircle className="size-5 text-green-500" />
                )}
            </Button>

            <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteBusinessman(businessmanId)}
                className="w-fit"
                disabled={isDeletingBusinessman}
            >
                <Trash2 className="size-5 text-red-500" />
            </Button>
        </div>
    );
}
