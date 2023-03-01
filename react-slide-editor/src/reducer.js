export const initialState = [
    { id: 1, name: "Element 1", inputs: [{ id: 1, value: "" }, { id: 2, value: "" }] },
    { id: 2, name: "Element 2", inputs: [{ id: 1, value: "" }, { id: 2, value: "" }] },
    { id: 3, name: "Element 3", inputs: [{ id: 1, value: "" }, { id: 2, value: "" }] },
  ];
  
  export function reducer(state, action) {
    switch (action.type) {
      case "editInput":
        const { elementId, inputId, value } = action;
        return state.map((element) => {
          if (element.id === elementId) {
            return {
              ...element,
              inputs: element.inputs.map((input) => {
                if (input.id === inputId) {
                  return { ...input, value };
                }
                return input;
              }),
            };
          }
          return element;
        });
      case "moveElement":
        const { sourceIndex, destinationIndex } = action.payload;
        const newState = [...state];
        const [removed] = newState.splice(sourceIndex, 1);
        newState.splice(destinationIndex, 0, removed);
        return newState;
      default:
        return state;
    }
  }
  