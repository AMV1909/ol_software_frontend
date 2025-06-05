import { array, number, object, string, z } from "zod";

export const municipalitySchema = object({
    id: number(),
    name: string(),
    createdAt: string().datetime(),
    updatedAt: string().datetime(),
});

export const municipalitiesSchema = array(municipalitySchema);

export type Municipality = z.infer<typeof municipalitySchema>;
