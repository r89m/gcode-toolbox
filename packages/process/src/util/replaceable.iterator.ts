export class ReplaceableIterator<T> implements Iterator<T> {

    private currentIndex = -1;

    constructor(private items:T[]){}

    next(): IteratorResult<T> {
        this.currentIndex++;
        if (this.currentIndex < this.items.length) {
            return {value: this.items[this.currentIndex], done: false};
        } else {
            return {done: true, value: undefined};
        }
    }

    replace(newValue:T):void {
        this.items[this.currentIndex] = newValue;
    }
}