import {MinimiseRapidsTransform} from '../process/transform/minimise-rapids/minimise-rapids.transform';
import {Generator} from "../process/generator/generator";
import {Transform} from "../process/transform/transform";

export class Pipeline<I> {

  constructor(private generator:Generator<I>, private transforms:Transform[]){}

  do():void {

    new MinimiseRapidsTransform()

  }
}
