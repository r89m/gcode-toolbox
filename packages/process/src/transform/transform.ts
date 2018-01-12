export interface Transform<L> {

    transform(incoming: L[]): TransformResult<L>
}

export class TransformResult<L> {

    readonly result: L[];
    readonly status?: any;
}