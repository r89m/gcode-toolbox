import {BlankLine} from './blank.line';

describe('Blank Line Test', () => {
  it('should be empty when output', () => {
    const line = new BlankLine();
    expect(line.output()).toEqual('');
  });
});
