import {Profile} from "./profile";
import {Parser} from "../parser/parser";
import {Writer} from "../writer/writer";
import {DefaultParser} from "../parser/default.parser";
import {DefaultWriter} from "../writer/default.writer";

export class DefaultProfile implements Profile {

    getParser(): Parser {
        return new DefaultParser();
    }

    getWriter(): Writer {
        return new DefaultWriter();
    }


}