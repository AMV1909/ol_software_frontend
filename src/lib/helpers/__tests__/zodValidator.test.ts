import { z } from "zod";
import { validateZodSchema } from "../zodValidator";

describe("validateZodSchema", () => {
    const schema = z.object({ a: z.string(), b: z.number() });

    it("returns success true and data if valid", () => {
        const result = validateZodSchema(schema, { a: "hi", b: 2 });
        expect(result).toEqual({ success: true, data: { a: "hi", b: 2 } });
    });

    it("returns success false and error if invalid", () => {
        const result = validateZodSchema(schema, { a: 1, b: "bad" });
        expect(result.success).toBe(false);
        expect(result).toHaveProperty("error");
    });
});
