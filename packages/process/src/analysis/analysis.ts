import {Command} from "../../../gcode/src/command/command";

export interface Analysis {
  analyse(incoming: Command[]): any;
}
