import {Line} from "../../../gcode/src/line/line";

export interface Analysis {
  analyse(incoming: Line[]): any;
}
