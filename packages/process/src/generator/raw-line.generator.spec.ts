import {RawLineGenerator} from "./raw-line.generator";

const fs = require("fs");

describe("Raw Line Generator", () => {

    const readFile = function (filename: string): string[] {
        return new RawLineGenerator().generate(filename, fs.readFileSync(filename, {encoding: 'utf8'}));
    };

    const read = function (input: string): string[] {
        return new RawLineGenerator().generate("no-filename", Buffer.from(input));
    };

    it("should read a simple file line-by-line", () => {

        expect(readFile("test-resources/generator/simple-3-line-file.txt")).toEqual(["Line 1", "Line 2", "Line 3"]);
    });

    it("should be able to parse an in-memory string", () => {

        expect(read("Line 1\nLine 2")).toEqual(["Line 1", "Line 2"]);
    });
});