import {Line} from "../line/line";
import {DefaultParser} from "./default.parser";
import {MoveFeed, MoveRapid} from "../line/move-linear.line";
import {MovementMode, SetMovementModeLine} from "../line/set-movement-mode.line";
import {Plane, PlaneSelectionLine} from "../line/plane-selection.line";
import {FanOnLine} from "../line/fan-control.line";

describe("Default parser", () => {

    const parser = new DefaultParser();

    const flatMap = (f, xs) =>
        xs.reduce((acc, x) =>
            acc.concat(f(x)), []);

    const parse = function(lines:string[]):Line[] {
        return flatMap(line => parser.parse(line), lines);
    };

    it("should be able to parse a simple file", () => {

        const lines = [
            "G0 X0 Y0 F400",
            "G1 Y50 Z20 F800",
            "G0 y30 x20 f1200",
            "n404 G91",
            "g1 z50 x10",
            "N143 G01 x23 Y504234.432432432532 Z64 F340",
            "N400 G90"
        ];

        expect(parse(lines)).toEqual([
            new MoveRapid(0, 0, undefined, 400),
            new MoveFeed(undefined, 50, 20, 800),
            new MoveRapid(20, 30, undefined, 1200),
            new SetMovementModeLine(MovementMode.RELATIVE),
            new MoveFeed(10, undefined, 50),
            new MoveFeed(23, 504234.432432432532, 64, 340),
            new SetMovementModeLine(MovementMode.ABSOLUTE)
        ]);
    });

    it("should be able to handle multiple codes in one line", () => {

        const lines = [
            "G90 g17 g00 x40 y55",
            "g0001 x40 y98 f400",
            "M106 S123 G01 Z12 Y30 x23 F230"
        ];

        expect(parse(lines)).toEqual([
            new SetMovementModeLine(MovementMode.ABSOLUTE),
            new PlaneSelectionLine(Plane.XY),
            new MoveRapid(40, 55),
            new MoveFeed(40, 98, undefined, 400),
            new FanOnLine(123),
            new MoveFeed(23, 30, 12, 230)
        ])
    });

});