import { updateInputValue } from '../utils.js';

describe('updateInputValue', () => {
  it('should update the value of an input with a given id', () => {
    const element = {
      id: 1,
      inputs: [
        { id: 1, value: 'foo' },
        { id: 2, value: 'bar' },
      ],
    };
    const inputId = 2;
    const value = 'baz';

    const updatedElement = updateInputValue(element, inputId, value);

    expect(updatedElement.inputs[0].value).toBe('foo');
    expect(updatedElement.inputs[1].value).toBe('baz');
  });
});
