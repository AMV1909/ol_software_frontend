import { clearFalsyData } from "../clearFalsyData";

describe("clearFalsyData", () => {
    it("removes falsy values from an object", () => {
        const input = {
            a: 1,
            b: false,
            c: 0,
            d: "",
            e: null,
            f: undefined,
            g: "ok",
        };
        const result = clearFalsyData(input);
        expect(result).toEqual({ a: 1, g: "ok" });
    });

    it("returns an empty object if all values are falsy", () => {
        const input = { a: 0, b: false, c: "", d: null, e: undefined };
        expect(clearFalsyData(input)).toEqual({});
    });

    it("returns the same object if all values are truthy", () => {
        const input = { a: 1, b: "hi", c: true };
        expect(clearFalsyData(input)).toEqual(input);
    });
});
