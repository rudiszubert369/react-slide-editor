export const updateInputValue = (element, inputId, value) => {
  return {
    ...element,
    inputs: element.inputs.map((input) => {
      if (input.id === inputId) {
        return { ...input, value };
      }
      return input;
    }),
  };
};
