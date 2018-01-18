import {ParsedLineGenerator} from "./parsed-line.generator";
import {Command} from "../../../gcode/src/command/command";
import {DefaultParser} from "../../../gcode/src/parser/default.parser";
import {MovementMode, SetMovementModeCommand} from "../../../gcode/src/command/set-movement-mode.command";
import {Plane, PlaneSelectionCommand} from "../../../gcode/src/command/plane-selection.command";
import {MoveFeed} from "../../../gcode/src/command/move-linear.command";

const fs = require("fs");

describe("Parsed Line Generator", () => {

    const parser = new DefaultParser();

    const readFile = function (filename: string): Command[] {
        return new ParsedLineGenerator(parser).generate(filename, fs.readFileSync(filename, {encoding: 'utf8'}));
    };

    const read = function (input: string): Command[] {
        return new ParsedLineGenerator(parser).generate("no-filename", Buffer.from(input));
    };

    it("should read a simple file line-by-line", () => {

        expect(readFile("test-resources/generator/simple-gcode-file.txt")).toEqual([
            new SetMovementModeCommand(MovementMode.ABSOLUTE),
            new PlaneSelectionCommand(Plane.XY),
            new MoveFeed(50, 40, 120, 300),
            new MoveFeed(80, undefined, 300)
        ]);
    });

    it("should be able to parse an in-memory string", () => {

        expect(read("G01 Y30 z10 X80 1\nG91")).toEqual([
            new MoveFeed(80, 30, 10),
            new SetMovementModeCommand(MovementMode.RELATIVE)
        ]);
    });
});