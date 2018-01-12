import {EnsureFirstRapidHasSensibleFeedrateTransform} from "./ensure-first-rapid-has-sensible-feedrate.transform";
import {DefaultParser} from "../../../../gcode/src/parser/default.parser";
import {Line} from "../../../../gcode/src/line/line";
import {Parser} from "../../../../gcode/src/parser/parser";
import {MoveFeed, MoveRapid} from "../../../../gcode/src/line/move-linear.line";
import {MovementMode, SetMovementModeLine} from "../../../../gcode/src/line/set-movement-mode.line";

describe("Ensure first rapid has sensible feedrate Transform", () => {

    const parser:Parser = new DefaultParser();

    const transform = function(targetFeedrate:number, lines:Line[]):Line[] {

        return new EnsureFirstRapidHasSensibleFeedrateTransform(targetFeedrate).transform(lines).result;
    };

    it("should set the first rapid feedrate", () => {

        const lines = [
            new SetMovementModeLine(MovementMode.ABSOLUTE),
            new MoveRapid(50, 30, 40)
        ];

        expect(transform(400, lines)).toEqual([
            new SetMovementModeLine(MovementMode.ABSOLUTE),
            new MoveRapid(50, 30, 40, 400)
        ]);
    });

    it("shouldn't override the first rapid feedrate if it is already set", () => {

        const lines = [
            new MoveRapid(50, 30, 40, 200)
        ];

        expect(transform(400, lines)).toEqual([
            new MoveRapid(50, 30, 40, 200)
        ]);
    });

    it("should only work on rapids", () => {

        const lines = [
            new MoveFeed(50, 30, 40),
            new MoveFeed(80, 30)
        ];

        expect(transform(400, lines)).toEqual([
            new MoveFeed(50, 30, 40),
            new MoveFeed(80, 30)
        ]);
    });

    it("should only work on the first rapid", () => {

        const lines = [
            new MoveRapid(50, 30, 40),
            new MoveRapid(80, 30)
        ];

        expect(transform(400, lines)).toEqual([
            new MoveRapid(50, 30, 40, 400),
            new MoveRapid(80, 30)
        ]);
    });
});