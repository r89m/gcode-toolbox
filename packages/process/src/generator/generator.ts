export interface Generator<T> {

    supportedExtensions():string[];

    generate(filename: string, input: Buffer):T[];
}