import { number, object, string, enum as enum_, z } from "zod";

export const userRoles = ["ADMIN", "REGISTRATION_ASSISTANT"] as const;

export const userRolesMap = {
    ADMIN: "Administrador",
    REGISTRATION_ASSISTANT: "Asistente de registro",
} as const;

export const userSchema = object({
    id: number(),
    name: string(),
    email: string().email(),
    role: enum_(userRoles),
    createdAt: string().datetime(),
    updatedAt: string().datetime(),
});

export type User = z.infer<typeof userSchema>;
