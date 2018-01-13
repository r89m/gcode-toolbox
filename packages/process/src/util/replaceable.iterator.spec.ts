import {ReplaceableIterator} from "./replaceable.iterator";


describe("Replaceable Iterator", () => {

    it("should iterate over all items", () => {

        const list = ["one", "two", "three"];
        const iterator = new ReplaceableIterator(list);

        expect(iterator.next()).toEqual({value: "one", done:false});
        expect(iterator.next()).toEqual({value: "two", done:false});
        expect(iterator.next()).toEqual({value: "three", done:false});
        expect(iterator.next()  ).toEqual({value: undefined, done:true});
    });

    it("should replace the correct item", () => {

        const list = ["one", "two", "three"];
        const iterator = new ReplaceableIterator(list);

        let item:IteratorResult<string>;
        let index = 0;
        while (item = iterator.next(), !item.done) {
            iterator.replace(index + "-" + item.value);
            index++;
        }

        expect(list[0]).toEqual("0-one");
        expect(list[1]).toEqual("1-two");
        expect(list[2]).toEqual("2-three");
    });
});