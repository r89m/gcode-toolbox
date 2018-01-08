import {GCodeFile} from "../../gcode/gcode-file";

export interface Analysis {
  analyse(incoming: GCodeFile): any;
}
