import { number, object, string, z } from "zod";

export const businessmanFormSchema = object({
    name: string().min(1, { message: "Nombre inválido" }),
    municipalityId: number().min(1, { message: "Municipio inválido" }),
    phone: string(),
    email: string().email({ message: "Correo electrónico inválido" }),
    status: string().min(1, { message: "Estado inválido" }).optional(),
});

export type BusinessmanFormData = z.infer<typeof businessmanFormSchema>;
