import {EnsureFirstRapidHasSensibleFeedrateTransform} from "./ensure-first-rapid-has-sensible-feedrate.transform";
import {DefaultParser} from "../../../../gcode/src/parser/default.parser";
import {Command} from "../../../../gcode/src/command/command";
import {Parser} from "../../../../gcode/src/parser/parser";
import {MoveFeed, MoveRapid} from "../../../../gcode/src/command/move-linear.command";
import {MovementMode, SetMovementModeCommand} from "../../../../gcode/src/command/set-movement-mode.command";

describe("Ensure first rapid has sensible feedrate Transform", () => {

    const parser:Parser = new DefaultParser();

    const transform = function(targetFeedrate:number, lines:Command[]):Command[] {

        return new EnsureFirstRapidHasSensibleFeedrateTransform(targetFeedrate).transform(lines).result;
    };

    it("should set the first rapid feedrate", () => {

        const lines = [
            new SetMovementModeCommand(MovementMode.ABSOLUTE),
            new MoveRapid(50, 30, 40)
        ];

        expect(transform(400, lines)).toEqual([
            new SetMovementModeCommand(MovementMode.ABSOLUTE),
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