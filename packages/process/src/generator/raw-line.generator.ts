import {Generator} from "./generator";

export class RawLineGenerator implements Generator<string> {

    supportedExtensions(): string[] {
        return ["nc", "gcode", "gc", "tap", "txt"];
    }

    generate(filename: string, input: Buffer): string[] {

        const fileContent = input.toString("utf8");
        return fileContent.split(new RegExp("\r?\n"));
    }


}