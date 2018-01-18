import {FileElement, RawLine, Transform} from "../transform/transform";
import {Command} from "../../../gcode/src/command/command";
import {Profile} from "../../../gcode/src/profile/profile";

export class Pipeline {

    constructor(private readonly machineProfile: Profile,
                private readonly transforms: Transform<FileElement>[],
                private readonly statusReporter: StatusReporter = new DefaultStatusReporter()) {
    }

    run(input: FileElement[]): FileElement[] {

        let value = input;

        for (let transform of this.transforms) {

            // Match value types to transform type
            // Only do some conversion if the types don't already match
            if (!(value[0] instanceof transform.getType())) {
                if (Pipeline.isRawLineArray(value) && transform.getType() == Command) {
                    // If the value is currently raw strings and the transform requires Commands, parse the strings
                    value = this.machineProfile.getParser().parse(value);
                } else if (Pipeline.isCommandArray(value) && transform.getType() == RawLine) {
                    // If the value is currently Commands and the transform requires strings, write out the Commands
                    value = this.machineProfile.getWriter().write(value);
                } else {
                    throw new Error("Unsupported value combination - value type = " +
                        (typeof value[0]) + ", transform typ = " + transform.getType())
                }
            }

            // Perform the transform
            const result = transform.transform(value);
            value = result.result;
            if (result.status) {
                this.statusReporter.report(result.status);
            }
        }

        return value;
    }

    private static isRawLineArray(arr: FileElement[]): arr is string[] {
        return arr.length > 0 && typeof arr[0] === "string";
    }

    private static isCommandArray(arr: FileElement[]): arr is Command[] {
        return arr.length > 0 && arr[0] instanceof Command;
    }
}

export interface StatusReporter {

    report(status: any): void;
}

export class DefaultStatusReporter implements StatusReporter {

    report(status: any): void {
        console.log("Status");
        console.log(status);
    }

}