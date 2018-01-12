import {Line} from "../line/line";

export interface Writer {

    write(line:Line):string;
}