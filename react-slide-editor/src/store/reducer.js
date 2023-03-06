import produce from 'immer';
import { 
  EDIT_INPUT, 
  MOVE_ELEMENT, 
  EDIT_ICON, 
  EDIT_TITLE, 
  SET_STORED_STATE 
} from './actions/actionTypes.js';

import { 
  INPUT_TYPE_TITLE, 
  INPUT_TYPE_TEXT, 
  INPUT_TYPE_ADDITIONAL_TEXT, 
  DEFAULT_TITLE, 
  DEFAULT_TEXT, 
  DEFAULT_ADDITIONAL_TEXT 
} from '../constants';

import {
  ICON_HEART,
  ICON_THUMB_UP,
  ICON_PIE_CHART
} from '../constants';

export const initialState = {
  title: { inputType: INPUT_TYPE_TITLE, value: DEFAULT_TITLE},
  elements: [
    {
      id: 1,
      inputs: [
        { id: 1, inputType: INPUT_TYPE_TEXT, value: DEFAULT_TEXT },
        { id: 2, inputType: INPUT_TYPE_ADDITIONAL_TEXT, value: DEFAULT_ADDITIONAL_TEXT }
      ],
      icon: ICON_HEART
    },
    {
      id: 2,
      inputs: [
        { id: 1, inputType: INPUT_TYPE_TEXT, value: DEFAULT_TEXT },
        { id: 2, inputType: INPUT_TYPE_ADDITIONAL_TEXT, value: DEFAULT_ADDITIONAL_TEXT }
      ],
      icon: ICON_PIE_CHART
    },
    {
      id: 3,
      inputs: [
        { id: 1, inputType: INPUT_TYPE_TEXT, value: DEFAULT_TEXT },
        { id: 2, inputType: INPUT_TYPE_ADDITIONAL_TEXT, value: DEFAULT_ADDITIONAL_TEXT }
      ],
      icon: ICON_THUMB_UP
    }
  ]
};

export function reducer(state, action) {
  switch (action.type) {
  case EDIT_INPUT: {
    const { elementId, inputId, value } = action;
    return produce(state, draft => {
      const element = draft.elements.find(element => element.id === elementId);
      if (element) {
        const input = element.inputs.find(input => input.id === inputId);
        if (input) {
          input.value = value;
        }
      }
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
    const { iconId, icon } = action;
    return produce(state, draft => {
      const index = draft.elements.findIndex(element => element.id === iconId);
      draft.elements[index].icon = icon;
    });
  }
  case EDIT_TITLE: {
    const { title } = action;
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
