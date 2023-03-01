export const initialState = [
    { id: 1, name: "Element 1", inputs: [{ id: 1, value: "" }, { id: 2, value: "" }], icon: 'airline_seat_legroom_reduced' },
    { id: 2, name: "Element 2", inputs: [{ id: 1, value: "" }, { id: 2, value: "" }], icon: 'airline_seat_legroom_reduced' },
    { id: 3, name: "Element 3", inputs: [{ id: 1, value: "" }, { id: 2, value: "" }], icon: 'airline_seat_legroom_reduced' },
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
      case "editIcon":
        const { elementId: iconElementId, icon } = action;
        console.log(icon)
        return state.map((element) => {
          if (element.id === iconElementId) {
            return { ...element, icon };
          }
          return element;
        });
      default:
        return state;
    }
  }
  