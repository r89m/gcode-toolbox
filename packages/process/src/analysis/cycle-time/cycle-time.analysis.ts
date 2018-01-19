import {Analysis} from '../analysis';
import {Command, MoveFeed, MoveRapid} from "gcode-toolbox-gcode";

const DEFAULT_SETTINGS:MachineSpeedSettings = {
    maxFeedRateX: Infinity,
    maxFeedRateY: Infinity,
    maxFeedRateZ: Infinity,
};

export class CycleTimeAnalysis implements Analysis {

  constructor(private readonly machineSpeedSettings:MachineSpeedSettings = DEFAULT_SETTINGS){}

  analyse(incoming: Command[]): CycleTimeAnalysisResults {

      const durations: CycleTimeAnalysisResults = {
          totalDuration: 0,
          feedDuration: 0,
          rapidDuration: 0
      };
      let position: Position = undefined;
      let currentFeedRate = 1;

      for (let command of incoming) {
          if (command instanceof MoveFeed || command instanceof MoveRapid) {

              currentFeedRate = (command.feedRate / 60) || currentFeedRate;

              // If this is the first move, record the starting position
              if (position === undefined) {
                  position = {
                      x: command.x || 0,
                      y: command.y || 0,
                      z: command.z || 0
                  };
              } else {
                  const newPosition = {
                      x: command.x !== undefined ? command.x : position.x,
                      y: command.y !== undefined ? command.y : position.y,
                      z: command.z !== undefined ? command.z : position.z,
                  };

                  const delta = {
                      x: newPosition.x - position.x,
                      y: newPosition.y - position.y,
                      z: newPosition.z - position.z,
                  };

                  const duration = {
                      x: Math.abs(delta.x / (Math.min(currentFeedRate, this.machineSpeedSettings.maxFeedRateX))),
                      y: Math.abs(delta.y / (Math.min(currentFeedRate, this.machineSpeedSettings.maxFeedRateY))),
                      z: Math.abs(delta.z / (Math.min(currentFeedRate, this.machineSpeedSettings.maxFeedRateZ)))
                  };

                  const maxDuration = Math.max(duration.x, duration.y, duration.z);

                  durations.totalDuration += maxDuration;
                  if (command instanceof MoveFeed) {
                      durations.feedDuration += maxDuration;
                  } else {
                      durations.rapidDuration += maxDuration;
                  }

                  position = newPosition;
              }
          }
      }

    return durations;
  }
}

interface Position {
    x?: number,
    y?: number,
    z?: number
}

export interface CycleTimeAnalysisResults {
  rapidDuration?: number;
  feedDuration?: number;
  totalDuration?: number;
}

export interface MachineSpeedSettings {
    maxFeedRateX?:number;
    maxFeedRateY?:number;
    maxFeedRateZ?:number;

    // TODO: Not yet supported
    rapidFeedRate?: number;
    accelerationX?:number;
    accelerationY?:number;
    accelerationZ?:number;
}