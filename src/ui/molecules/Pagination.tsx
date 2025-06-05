import { Select } from "../atoms/Inputs/Select";
import { Button } from "../atoms/Button";
import type { DataTableProps } from "./DataTable";
import { cn } from "@/lib/utils/cn";

interface Props extends Omit<DataTableProps, "columns" | "values" | "info"> {
    page: number;
    totalPages: number;
}

function getPages(current: number, total: number) {
    const pages = [];
    if (total <= 7) {
        for (let i = 1; i <= total; i++) pages.push(i);
    } else {
        pages.push(1);
        if (current > 4) pages.push("...");
        let start = Math.max(2, current - 2);
        let end = Math.min(total - 1, current + 2);

        if (current <= 4) {
            end = 6;
            start = 2;
        } else if (current >= total - 3) {
            start = total - 5;
            end = total - 1;
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        if (end < total - 1) pages.push("...");
        pages.push(total);
    }
    return pages;
}

export function Pagination({
    page,
    goToPage,
    totalPages,
    limit,
    setLimit,
}: Props) {
    const options = [5, 10, 15];
    const pages = getPages(page, totalPages);

    return (
        <div className="mt-4 flex items-center">
            <span>Items:</span>

            <Select
                options={options.map((option) => ({
                    label: option.toString(),
                    value: option,
                }))}
                value={limit}
                onChange={(value) => setLimit(Number(value))}
                className="ml-4"
            />

            <nav className="ml-4 flex items-center [&>*]:rounded-none [&>*]:border [&>*]:border-gray-500">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="border-none bg-blue-500 text-white hover:bg-blue-500/90"
                >
                    {"<"}
                </Button>

                {pages.map((p, idx) =>
                    p === "..." ? (
                        <span key={"ellipsis-" + idx} className="h-8 px-2">
                            ...
                        </span>
                    ) : (
                        <Button
                            key={p}
                            variant={p === page ? undefined : "outline"}
                            size="sm"
                            className={cn(
                                p === page
                                    ? "bg-blue-500 text-white hover:bg-blue-500/90"
                                    : "bg-white text-black hover:bg-blue-400 hover:text-white",
                            )}
                            onClick={() => p !== page && goToPage(Number(p))}
                        >
                            {p}
                        </Button>
                    ),
                )}

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="border-none bg-blue-500 text-white hover:bg-blue-500/90"
                >
                    {">"}
                </Button>
            </nav>
        </div>
    );
}
