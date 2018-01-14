import {Parser} from "../parser/parser";
import {Writer} from "../writer/writer";

export interface Profile {

    getParser(): Parser;

    getWriter():Writer;
}