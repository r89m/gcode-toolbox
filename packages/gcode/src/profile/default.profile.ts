import {Profile} from "./profile";
import {DefaultWriter} from "@writer/default.writer";
import {DefaultParser} from "@parser/default.parser";
import {Parser} from "@parser/parser";
import {Writer} from "@writer/writer";

export class DefaultProfile implements Profile {

    getParser(): Parser {
        return new DefaultParser();
    }

    getWriter(): Writer {
        return new DefaultWriter();
    }
}