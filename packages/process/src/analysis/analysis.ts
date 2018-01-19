import {Command} from "gcode-toolbox-gcode";

export interface Analysis {
  analyse(incoming: Command[]): any;
}
