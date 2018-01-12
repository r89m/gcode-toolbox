import {Line} from "./line/line";
import {Parser} from "./parser/parser";

export interface GCodeFile {

    getLines():string[];

    getParsedLines(parser:Parser):Line[];
}
