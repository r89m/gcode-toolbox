import {SimpleGcodeFile} from "../../../gcode/simple.gcode-file";
import {GCodeFile} from "../../../gcode/gcode-file";
import {RemoveCommentsTransform} from "./remove-comments.transform";

describe("Remove Comments Transform", () => {

    const transform = function(input:string[]):string[] {
        return new RemoveCommentsTransform().transform(new SimpleGcodeFile(input)).result.getLines();
    };

    it("should handle cases where no comments are present", () => {

        let d = new RemoveCommentsTransform();

        const input = [
            "This is a line", "This is another line", "This is a third line"
        ];

        expect(transform(input)).toEqual(["This is a line", "This is another line", "This is a third line"]);
    });

    it("should handle cases where comments marked with a semi colon are present", () => {

        const input = [
            "This is the first line", "This line has; a comment", "This line does ; too", "This line doesn't"
        ];

        expect(transform(input)).toEqual(["This is the first line", "This line has", "This line does ", "This line doesn't"]);
    });

    it("should handle cases where comments marked with a double slash are present", () => {

        const input = [
            "This is the first line", "This line has// a comment", "This line does // too", "This line doesn't"
        ];

        expect(transform(input)).toEqual(["This is the first line", "This line has", "This line does ", "This line doesn't"]);
    });

    it("should handle cases where comments marked with semi colons and double slashes are present", () => {

        const input = [
            "This is the first line", "This line has// a comment", "This line does ; too", "This line doesn't"
        ];

        expect(transform(input)).toEqual(["This is the first line", "This line has", "This line does ", "This line doesn't"]);
    });

    it("should handle block comments surround by /* and */", () => {

        const input = [
            "This is the first line", "The comment /* starts here", "This line is entirely inside a comment", "This is */ the last line"
        ];

        expect(transform(input)).toEqual(["This is the first line", "The comment ", " the last line"]);
    });

    it("should handle block comments surround by ( and )", () => {

        const input = [
            "This is the first line", "The comment ( starts here", "This line is entirely inside a comment", "This is ) the last line"
        ];

        expect(transform(input)).toEqual(["This is the first line", "The comment ", " the last line"]);
    });

    it("should handle block comments on one line", () => {

        const input = [
            "This is the first line", "This line has /* a block */ comment", "As does ( this line ) as well", "This line doesn't"
        ];

        expect(transform(input)).toEqual(["This is the first line", "This line has  comment", "As does  as well", "This line doesn't"]);
    })
});