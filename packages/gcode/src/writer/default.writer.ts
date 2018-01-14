import {Writer} from "./writer";
import {Line} from "../line/line";

export class DefaultWriter implements Writer {

    write(line: Line): string {
        return "TODO";
    }

}