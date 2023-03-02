import produce from 'immer';
import { updateInputValue } from './utils/reducerUtils';
// import { EDIT_INPUT, MOVE_ELEMENT, EDIT_ICON, EDIT_TITLE, SET_STORED_STATE } from './actions/action-types.js';

export const initialState = {
  title: 'Insert a title here',
  elements: [
    { id: 1, inputs: [{ id: 1, value: 'Insert text here' }, { id: 2, value: 'Add here your additional text' }], icon: 'airline_seat_legroom_reduced' },
    { id: 2, inputs: [{ id: 1, value: 'Insert text here' }, { id: 2, value: 'Add here your additional text' }], icon: 'fluorescent' },
    { id: 3, inputs: [{ id: 1, value: 'Insert text here' }, { id: 2, value: 'Add here your additional text' }], icon: 'airline_seat_legroom_reduced' },
  ]
};
    
export function reducer(state, action) {
  switch (action.type) {
  case 'editInput': {
    const { elementId, inputId, value } = action;
    return produce(state, draft => {
      const index = draft.elements.findIndex(element => element.id === elementId);
      draft.elements[index] = updateInputValue(draft.elements[index], inputId, value);
    });
  }
  case 'moveElement': {
    const { sourceIndex, destinationIndex } = action.payload;
    const newState = { ...state, elements: [...state.elements] };
    const [removed] = newState.elements.splice(sourceIndex, 1);
    newState.elements.splice(destinationIndex, 0, removed);
    return newState;
  }
  case 'editIcon': {
    const { elementId: iconElementId, icon } = action;
    return {
      ...state,
      elements: state.elements.map((element) => {
        if (element.id === iconElementId) {
          return { ...element, icon };
        }
        return element;
      }),
    };
  }
  case 'editTitle': {
    const { title } = action;
    return { ...state, title };
  }
  case 'setStoredState': {
    if ( JSON.stringify(action.payload) !== JSON.stringify(initialState)) {
      return action.payload;
    }
    return state;
  }
  default:
    return state;
  }
}
