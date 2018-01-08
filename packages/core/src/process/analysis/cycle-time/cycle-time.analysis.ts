import {Analysis} from '../analysis';
import {GCodeFile} from "../../../gcode/gcode-file";

export class CycleTimeAnalysis implements Analysis {

  analyse(incoming: GCodeFile): CycleTimeAnalysisResults {
    return {
      rapidDuration: 300,
      feedDuration: 400,
      totalDuration: 700
    };
  }
}

export interface CycleTimeAnalysisResults {
  rapidDuration?: number;
  feedDuration?: number;
  totalDuration?: number;
}
