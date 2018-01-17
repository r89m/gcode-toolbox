import {Analysis} from '../analysis';
import {Command} from "../../../../gcode/src/command/command";

export class CycleTimeAnalysis implements Analysis {

  analyse(incoming: Command[]): CycleTimeAnalysisResults {
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
