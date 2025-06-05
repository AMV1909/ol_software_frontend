import { number, object, string, enum as enum_, z } from "zod";
import { municipalitySchema } from "./municipality";

export const businessmanStatuses = ["ACTIVE", "INACTIVE"] as const;

export const businessmanStatusesMap = {
    ACTIVE: "Activo",
    INACTIVE: "Inactivo",
} as const;

export const businessmanSchema = object({
    id: number(),
    name: string(),
    phone: string().nullable(),
    email: string().email().nullable(),
    status: enum_(businessmanStatuses),
    municipality: municipalitySchema,
    establishmentsCount: number().int(),
    createdAt: string().datetime(),
    updatedAt: string().datetime(),
});

export const businessmanSingleSchema = businessmanSchema.extend({
    totalIncome: number(),
    totalEmployees: number().int(),
});

export const businessmanListSchema = object({
    businessmen: businessmanSchema.array(),
    info: object({
        page: number().int(),
        limit: number().int(),
        total: number().int(),
        totalPages: number().int(),
    }),
});

export type Businessman = z.infer<typeof businessmanSchema>;
export type BusinessmanSingle = z.infer<typeof businessmanSingleSchema>;
