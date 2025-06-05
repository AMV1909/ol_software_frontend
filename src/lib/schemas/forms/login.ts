import { boolean, object, string, z } from "zod";

export const loginFormSchema = object({
    email: string().email({ message: "Correo electrónico inválido" }),
    password: string().min(1, { message: "Contraseña inválida" }),
    terms: boolean().refine((data) => data, {
        message: "Debes aceptar los términos y condiciones",
    }),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
