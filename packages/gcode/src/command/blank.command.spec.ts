import {BlankCommand} from './blank.command';

describe('Blank Command Test', () => {
  it('should be empty when output', () => {
    const command = new BlankCommand();
    expect(command.output()).toEqual('');
  });
});
