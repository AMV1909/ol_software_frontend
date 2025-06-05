import type { z, ZodTypeAny } from "zod";

export const validateZodSchema = <T extends ZodTypeAny>(
    schema: T,
    data: unknown,
):
    | { success: true; data: z.infer<T> }
    | { success: false; error: z.ZodError } => {
    return schema.safeParse(data);
};
