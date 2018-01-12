import {GCodeFile} from "../../../../../gcode/src/gcode-file";
import {SimpleGcodeFile} from "../../../../../gcode/src/simple.gcode-file";
import {Transform} from "../transform";
import {TransformResult} from "../transform";

export class RemoveCommentsTransform implements Transform {

    private readonly LINE_COMMENT_MARKERS = [
        "//",
        ";"
    ];

    private readonly BLOCK_COMMENT_BOUNDS = [
        new BlockCommentBounds("/*", "*/"),
        new BlockCommentBounds("(", ")")
    ];

    transform(incoming: GCodeFile): TransformResult {

        let blockCommentEndDetector: BlockCommentEndDetector;
        let outgoingLines: string[] = [];

        for(let line of incoming.getLines()) {
            const lineCommentStart = this.detectLineComment(line);
            if (lineCommentStart > -1) {
                outgoingLines.push(line.substr(0, lineCommentStart));
            } else if (blockCommentEndDetector) {
                const blockCommentEnd = blockCommentEndDetector.detect(line);
                if (blockCommentEnd > -1) {
                    outgoingLines.push(line.substring(blockCommentEnd));
                    blockCommentEndDetector = undefined;
                }
            } else {
                const blockCommentStart = this.detectBlockCommentStart(line);
                if (blockCommentStart !== undefined) {
                    let startOfLine = line.substr(0, blockCommentStart.index);
                    let restOfLine = line.substring(blockCommentStart.index);
                    let restOfLineToInclude = "";
                    let endOfCommentIndex = blockCommentStart.endDetector.detect(restOfLine);

                    // Handle the case where a block comment starts and ends on the same line
                    if (endOfCommentIndex > -1) {
                        restOfLineToInclude = restOfLine.substring(endOfCommentIndex);
                    } else {
                        blockCommentEndDetector = blockCommentStart.endDetector;
                    }
                    outgoingLines.push(startOfLine + restOfLineToInclude);
                } else {
                    outgoingLines.push(line);
                }
            }
        }

        return {
            result: new SimpleGcodeFile(outgoingLines)
        }
    }

    protected detectLineComment(line: string): number {
        for (let commentMarker of this.LINE_COMMENT_MARKERS) {
            const position = line.indexOf(commentMarker);
            if (position > -1) {
                return position;
            }
        }
        return -1;
    }

    protected detectBlockCommentStart(line: string): { index: number, endDetector: BlockCommentEndDetector } {

        for (let blockComment of this.BLOCK_COMMENT_BOUNDS) {
            const index = blockComment.detectStart(line);
            if (index > -1) {
                return {
                    index: index,
                    endDetector: blockComment.getEndDetector()
                };
            }
        }
        return undefined;
    }
}

class BlockCommentBounds {

    constructor(private start: string, private end: string) {
    }

    detectStart(line: string): number {
        return line.indexOf(this.start);
    }

    getEndDetector(): BlockCommentEndDetector {
        const endMarker = this.end;
        return {
            detect(line: string): number {
                const index = line.indexOf(endMarker);
                if (index > -1) {
                    return index + endMarker.length;
                } else {
                    return -1;
                }
            }
        }
    }
}

interface BlockCommentEndDetector {
    detect(line: string): number;
}
