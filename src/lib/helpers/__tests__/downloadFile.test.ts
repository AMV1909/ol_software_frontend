import { downloadFile } from "../downloadFile";

describe("downloadFile", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        if (!global.URL) {
            global.URL = {
                createObjectURL: jest.fn(() => "blob:url"),
                revokeObjectURL: jest.fn(),
            } as any;
        }
    });

    it("creates a link and triggers download", () => {
        const blob = new Blob(["test"], { type: "text/plain" });
        const click = jest.fn();
        document.createElement = jest.fn().mockReturnValue({
            href: "",
            download: "",
            click,
        });

        downloadFile(blob, "file.txt");
        expect(global.URL.createObjectURL).toHaveBeenCalledWith(blob);
        expect(click).toHaveBeenCalled();
        expect(global.URL.revokeObjectURL).toHaveBeenCalledWith("blob:url");
    });
});
