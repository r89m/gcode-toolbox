import {Analysis} from '../analysis';
import {Line} from "../../../../gcode/src/line/line";

export class CycleTimeAnalysis implements Analysis {

  analyse(incoming: Line[]): CycleTimeAnalysisResults {
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
