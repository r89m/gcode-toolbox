import {RemoveCommentsTransform} from "./remove-comments.transform";

describe("Remove Comments Transform", () => {

    const transform = function(input:string[]):string[] {
        return new RemoveCommentsTransform().transform(input).result;
    };

    it("should handle cases where no comments are present", () => {

        let d = new RemoveCommentsTransform();

        const input = [
            "This is a command", "This is another command", "This is a third command"
        ];

        expect(transform(input)).toEqual(["This is a command", "This is another command", "This is a third command"]);
    });

    it("should handle cases where comments marked with a semi colon are present", () => {

        const input = [
            "This is the first command", "This command has; a comment", "This command does ; too", "This command doesn't"
        ];

        expect(transform(input)).toEqual(["This is the first command", "This command has", "This command does ", "This command doesn't"]);
    });

    it("should handle cases where comments marked with a double slash are present", () => {

        const input = [
            "This is the first command", "This command has// a comment", "This command does // too", "This command doesn't"
        ];

        expect(transform(input)).toEqual(["This is the first command", "This command has", "This command does ", "This command doesn't"]);
    });

    it("should handle cases where comments marked with semi colons and double slashes are present", () => {

        const input = [
            "This is the first command", "This command has// a comment", "This command does ; too", "This command doesn't"
        ];

        expect(transform(input)).toEqual(["This is the first command", "This command has", "This command does ", "This command doesn't"]);
    });

    it("should handle block comments surround by /* and */", () => {

        const input = [
            "This is the first command", "The comment /* starts here", "This command is entirely inside a comment", "This is */ the last command"
        ];

        expect(transform(input)).toEqual(["This is the first command", "The comment ", " the last command"]);
    });

    it("should handle block comments surround by ( and )", () => {

        const input = [
            "This is the first command", "The comment ( starts here", "This command is entirely inside a comment", "This is ) the last command"
        ];

        expect(transform(input)).toEqual(["This is the first command", "The comment ", " the last command"]);
    });

    it("should handle block comments on one command", () => {

        const input = [
            "This is the first command", "This command has /* a block */ comment", "As does ( this command ) as well", "This command doesn't"
        ];

        expect(transform(input)).toEqual(["This is the first command", "This command has  comment", "As does  as well", "This command doesn't"]);
    })
});