import type { ReactNode } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../atoms/Table";
import { Pagination } from "./Pagination";

export interface DataTableProps {
    info: { page: number; totalPages: number };
    goToPage: (page: number) => void;
    columns: string[];
    values: { values: (string | number | ReactNode)[] }[];
    limit: number;
    setLimit: (limit: number) => void;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    fetchNextPage: () => void;
    fetchPreviousPage: () => void;
}

export function DataTable({ columns, values, info, ...props }: DataTableProps) {
    return (
        <div className="flex flex-col gap-4">
            <Table>
                <TableHeader>
                    <TableRow className="bg-blue-400 text-white">
                        {columns.map((column) => (
                            <TableCell
                                key={column}
                                className="border border-gray-400 text-center"
                            >
                                {column}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {values.map((value, i) => (
                        <TableRow key={i} className="even:bg-gray-200">
                            {value.values.map((value, j) => (
                                <TableCell
                                    key={j}
                                    className="border border-gray-400 text-center"
                                >
                                    {value}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Pagination
                page={info.page}
                totalPages={info.totalPages}
                {...props}
            />
        </div>
    );
}
