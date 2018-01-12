import {Line} from "../line/line";

export interface Parser {

    parse(line: string): Line[];
}