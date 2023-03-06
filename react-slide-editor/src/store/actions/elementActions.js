import {
  EDIT_INPUT,
  MOVE_ELEMENT,
  EDIT_ICON,
  EDIT_TITLE,
  SET_STORED_STATE
} from './actionTypes.js';

export function editInput(elementId, inputId, value) {
  return {
    type: EDIT_INPUT,
    elementId,
    inputId,
    value
  };
}

export function moveElement(sourceIndex, destinationIndex) {
  return {
    type: MOVE_ELEMENT,
    payload: {
      sourceIndex,
      destinationIndex
    }
  };
}

export function editIcon(iconId, icon) {
  return {
    type: EDIT_ICON,
    iconId,
    icon
  };
}

export function editTitle(title) {
  return {
    type: EDIT_TITLE,
    title
  };
}

export function setStoredState(payload) {
  return {
    type: SET_STORED_STATE,
    payload
  };
}
