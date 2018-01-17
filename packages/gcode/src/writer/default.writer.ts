import {Writer} from "./writer";
import {Command} from "../command/command";

export class DefaultWriter implements Writer {

    write(command: Command): string {
        return "TODO";
    }

}