import {Parser} from "./parser";
import {Command} from "../command/command";
import {UnknownCommand} from "../command/unknown.command";
import {MoveFeed, MoveRapid} from "../command/move-linear.command";
import {MovementMode, SetMovementModeCommand} from "../command/set-movement-mode.command";
import {Plane, PlaneSelectionCommand} from "../command/plane-selection.command";
import {DwellCommand} from "../command/dwell.command";
import {SpindleDirection, SpindleOffCommand, SpindleOnCommand} from "../command/spindle.command";
import {FanOffCommand, FanOnCommand} from "../command/fan-control.command";

const flatMap = require("array.prototype.flatmap");

export class DefaultParser implements Parser {

    private static readonly LINE_PARSER_PATTERN = new RegExp("^(N ?([0-9]{1,10}) ?)?([GMT])([0-9.]{1,5}) ?((.*?)([GMT].*)|(.*))", "i");
    private static readonly X_PARSER_PATTERN = new RegExp(".*(X ?([0-9\.]+))", "i");
    private static readonly Y_PARSER_PATTERN = new RegExp(".*(Y ?([0-9\.]+))", "i");
    private static readonly Z_PARSER_PATTERN = new RegExp(".*(Z ?([0-9\.]+))", "i");
    private static readonly E_PARSER_PATTERN = new RegExp(".*(E ?([0-9\.]+))", "i");
    private static readonly F_PARSER_PATTERN = new RegExp(".*(F ?([0-9\.]+))", "i");
    private static readonly S_PARSER_PATTERN = new RegExp(".*(S ?([0-9\.]+))", "i");
    private static readonly P_PARSER_PATTERN = new RegExp(".*(P ?([0-9\.]+))", "i");

    parse(lines:string[]): Command[] {
        return flatMap(lines, line => this.parseLine(line));
    }

    protected parseLine(line: string): Command[] {

        const commands: Command[] = [];

        let lineElements;
        while(lineElements = DefaultParser.LINE_PARSER_PATTERN.exec(line), lineElements !== null) {
            const lineNumber = parseInt(lineElements[2]);
            const command:CommandElements = {
                letter: lineElements[3].toUpperCase(),
                number: parseFloat(lineElements[4]),
                args: lineElements[5],
                rawLine: line
            };
            commands.push(this.parseCommand(command));

            line = lineElements[7];
        }

        return commands;
    }

    protected parseCommand(command: CommandElements): Command {

        const commandLetter = command.letter;
        const commandNumber = command.number;
        const commandArgs = command.args;

        if (commandLetter == "G") {

            switch (commandNumber) {
                // Linear Movement
                case 0:
                case 1:
                    const commandConstructor = commandNumber == 0 ? MoveRapid : MoveFeed;
                    return new commandConstructor(
                        this.getXValue(commandArgs),
                        this.getYValue(commandArgs),
                        this.getZValue(commandArgs),
                        this.getFValue(commandArgs));

                case 4:
                    const seconds = this.getSValue(commandArgs);
                    let millis;
                    if (seconds !== undefined) {
                        millis = seconds * 1000;
                    } else {
                        millis = this.getPValue(commandArgs);
                    }
                    return new DwellCommand(millis);

                // Plane Selection
                case 17:
                    return new PlaneSelectionCommand(Plane.XY);
                case 18:
                    return new PlaneSelectionCommand(Plane.ZX);
                case 19:
                    return new PlaneSelectionCommand(Plane.YZ);

                // Movement mode
                case 90:
                    return new SetMovementModeCommand(MovementMode.ABSOLUTE);
                case 91:
                    return new SetMovementModeCommand(MovementMode.RELATIVE);

            }

        } else if (commandLetter == "M") {

            switch (commandNumber) {
                // Spindle control
                case 3:
                    return new SpindleOnCommand(SpindleDirection.Clockwise, this.getSValue(commandArgs));
                case 4:
                    return new SpindleOnCommand(SpindleDirection.AntiClockwise, this.getSValue(commandArgs));
                case 5:
                    return new SpindleOffCommand();

                // Fan control
                case 106:
                    return new FanOnCommand(this.getSValue(commandArgs));
                case 107:
                    return new FanOffCommand();
            }

        } else if (commandLetter == "T") {

        }
        return new UnknownCommand(command.rawLine);
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