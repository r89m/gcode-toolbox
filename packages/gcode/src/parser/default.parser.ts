import {Parser} from "./parser";
import {Line} from "../line/line";
import {UnknownLine} from "../line/unknown.line";
import {MoveFeed, MoveRapid} from "../line/move-linear.line";
import {MovementMode, SetMovementModeLine} from "../line/set-movement-mode.line";
import {Plane, PlaneSelectionLine} from "../line/plane-selection.line";
import {DwellLine} from "../line/dwell.line";
import {SpindleDirection, SpindleOffLine, SpindleOnLine} from "../line/spindle.line";
import {FanOffLine, FanOnLine} from "../line/fan-control.line";

export class DefaultParser implements Parser {

    private static readonly LINE_PARSER_PATTERN = new RegExp("^(N ?([0-9]{1,10}) ?)?([GMT])([0-9.]{1,5}) ?((.*?)([GMT].*)|(.*))", "i");
    private static readonly X_PARSER_PATTERN = new RegExp(".*(X ?([0-9\.]+))", "i");
    private static readonly Y_PARSER_PATTERN = new RegExp(".*(Y ?([0-9\.]+))", "i");
    private static readonly Z_PARSER_PATTERN = new RegExp(".*(Z ?([0-9\.]+))", "i");
    private static readonly E_PARSER_PATTERN = new RegExp(".*(E ?([0-9\.]+))", "i");
    private static readonly F_PARSER_PATTERN = new RegExp(".*(F ?([0-9\.]+))", "i");
    private static readonly S_PARSER_PATTERN = new RegExp(".*(S ?([0-9\.]+))", "i");
    private static readonly P_PARSER_PATTERN = new RegExp(".*(P ?([0-9\.]+))", "i");

    parse(line: string): Line[] {

        const lines: Line[] = [];

        let lineElements;
        while(lineElements = DefaultParser.LINE_PARSER_PATTERN.exec(line), lineElements !== null) {
            const lineNumber = parseInt(lineElements[2]);
            const command:CommandElements = {
                letter: lineElements[3].toUpperCase(),
                number: parseFloat(lineElements[4]),
                args: lineElements[5],
                rawLine: line
            };
            lines.push(this.parseLine(command));

            line = lineElements[7];
        }

        return lines;
    }

    parseLine(command: CommandElements): Line {

        const actionLetter = command.letter;
        const actionNumber = command.number;
        const actionArgs = command.args;

        if (actionLetter == "G") {

            switch (actionNumber) {
                // Linear Movement
                case 0:
                case 1:
                    const lineConstructor = actionNumber == 0 ? MoveRapid : MoveFeed;
                    return new lineConstructor(
                        this.getXValue(actionArgs),
                        this.getYValue(actionArgs),
                        this.getZValue(actionArgs),
                        this.getFValue(actionArgs));

                case 4:
                    const seconds = this.getSValue(actionArgs);
                    let millis;
                    if (seconds !== undefined) {
                        millis = seconds * 1000;
                    } else {
                        millis = this.getPValue(actionArgs);
                    }
                    return new DwellLine(millis);

                // Plane Selection
                case 17:
                    return new PlaneSelectionLine(Plane.XY);
                case 18:
                    return new PlaneSelectionLine(Plane.ZX);
                case 19:
                    return new PlaneSelectionLine(Plane.YZ);

                // Movement mode
                case 90:
                    return new SetMovementModeLine(MovementMode.ABSOLUTE);
                case 91:
                    return new SetMovementModeLine(MovementMode.RELATIVE);

            }

        } else if (actionLetter == "M") {

            switch (actionNumber) {
                // Spindle control
                case 3:
                    return new SpindleOnLine(SpindleDirection.Clockwise, this.getSValue(actionArgs));
                case 4:
                    return new SpindleOnLine(SpindleDirection.AntiClockwise, this.getSValue(actionArgs));
                case 5:
                    return new SpindleOffLine();

                // Fan control
                case 106:
                    return new FanOnLine(this.getSValue(actionArgs));
                case 107:
                    return new FanOffLine();
            }

        } else if (actionLetter == "T") {

        }
        return new UnknownLine(command.rawLine);
    }

    getXValue(args: string): number {
        return this.getNumberFromRegex(DefaultParser.X_PARSER_PATTERN, args);
    }

    getYValue(args: string): number {
        return this.getNumberFromRegex(DefaultParser.Y_PARSER_PATTERN, args);
    }

    getZValue(args: string): number {
        return this.getNumberFromRegex(DefaultParser.Z_PARSER_PATTERN, args);
    }

    getEValue(args: string): number {
        return this.getNumberFromRegex(DefaultParser.E_PARSER_PATTERN, args);
    }

    getFValue(args: string): number {
        return this.getNumberFromRegex(DefaultParser.F_PARSER_PATTERN, args);
    }

    getSValue(args: string): number {
        return this.getNumberFromRegex(DefaultParser.S_PARSER_PATTERN, args);
    }

    getPValue(args: string): number {
        return this.getNumberFromRegex(DefaultParser.P_PARSER_PATTERN, args);
    }

    getNumberFromRegex(regex: RegExp, str: string): number {

        const result = regex.exec(str);
        const index = 2;
        if (result !== null && result.length > index) {
            const val = parseFloat(result[index]);
            if (!isNaN(val)) {
                return val;
            }
        }
        return undefined;
    }
}

interface CommandElements {
    letter?: string;
    number?: number;
    args?: string;
    rawLine?:string;
}