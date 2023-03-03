import produce from 'immer';
import { updateInputValue } from './utils/reducer-helpers';
import { EDIT_INPUT, MOVE_ELEMENT, EDIT_ICON, EDIT_TITLE, SET_STORED_STATE } from './actions/action-types.js';

export const initialState = {
  title: { inputType: 'title', value: 'Insert a title here'},
  elements: [
    {
      id: 1,
      inputs: [
        { id: 1, inputType: 'text', value: 'Insert text here' },
        { id: 2, inputType: 'additionalText', value: 'Add here your additional text' }
      ],
      icon: 'favorite'
    },
    {
      id: 2,
      inputs: [
        { id: 1, inputType: 'text', value: 'Insert text here' },
        { id: 2, inputType: 'additionalText', value: 'Add here your additional text' }
      ],
      icon: 'pie_chart'
    },
    {
      id: 3,
      inputs: [
        { id: 1, inputType: 'text', value: 'Insert text here' },
        { id: 2, inputType: 'additionalText', value: 'Add here your additional text' }
      ],
      icon: 'thumb_up'
    }
  ]
};

export function reducer(state, action) {
  switch (action.type) {
  case EDIT_INPUT: {
    const { elementId, inputId, value } = action;
    return produce(state, draft => {
      const index = draft.elements.findIndex(element => element.id === elementId);
      draft.elements[index] = updateInputValue(draft.elements[index], inputId, value);
    });
  }
  case MOVE_ELEMENT: {
    const { sourceIndex, destinationIndex } = action.payload;
    return produce(state, draft => {
      const [removed] = draft.elements.splice(sourceIndex, 1);
      draft.elements.splice(destinationIndex, 0, removed);
    });
  }
  case EDIT_ICON: {
    const { elementId: iconElementId, icon } = action;
    return produce(state, draft => {
      const index = draft.elements.findIndex(element => element.id === iconElementId);
      draft.elements[index].icon = icon;
    });
  }
  case EDIT_TITLE: {
    const { title } = action;
    console.log(title);
    return produce(state, draft => {
      draft.title = title;
    });
  }
  case SET_STORED_STATE: {
    const { payload } = action;
    return produce(state, draft => {
      if (JSON.stringify(payload) !== JSON.stringify(initialState)) {
        Object.assign(draft, payload);
      }
    });
  }
  default:
    return state;
  }
}
