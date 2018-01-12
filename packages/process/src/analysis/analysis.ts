import {GCodeFile} from "../../../gcode/src/gcode-file";

export interface Analysis {
  analyse(incoming: GCodeFile): any;
}
