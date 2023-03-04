import produce from 'immer';
import { initialState, reducer } from '../reducer';
import { EDIT_INPUT, MOVE_ELEMENT, EDIT_ICON, EDIT_TITLE, SET_STORED_STATE } from '../../actions/action-types';

describe('reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  it('should handle EDIT_INPUT', () => {
    const elementId = 1;
    const inputId = 2;
    const value = 'new value';
    const action = {
      type: EDIT_INPUT,
      elementId,
      inputId,
      value,
    };
    const newState = reducer(initialState, action);
    const expectedState = produce(initialState, draftState => {
      const element = draftState.elements.find(e => e.id === elementId);
      if (element) {
        element.inputs = element.inputs.map(input => {
          if (input.id === inputId) {
            return { ...input, value };
          }
          return input;
        });
      }
    });
    expect(newState).toEqual(expectedState);
  });

  it('should handle MOVE_ELEMENT', () => {
    const sourceIndex = 0;
    const destinationIndex = 2;
    const action = {
      type: MOVE_ELEMENT,
      payload: {
        sourceIndex,
        destinationIndex,
      },
    };
    const newState = reducer(initialState, action);
    const expectedState = produce(initialState, draftState => {
      const [removed] = draftState.elements.splice(sourceIndex, 1);
      draftState.elements.splice(destinationIndex, 0, removed);
    });
    expect(newState).toEqual(expectedState);
  });

  it('should handle EDIT_ICON', () => {
    const elementId = 1;
    const icon = 'new icon';
    const action = {
      type: EDIT_ICON,
      elementId,
      icon,
    };
    const newState = reducer(initialState, action);
    const expectedState = produce(initialState, draftState => {
      const element = draftState.elements.find(e => e.id === elementId);
      if (element) {
        element.icon = icon;
      }
    });
    expect(newState).toEqual(expectedState);
  });

  it('should handle EDIT_TITLE', () => {
    const title = {
      inputType: 'text',
      value: 'New Title',
    };
    const action = {
      type: EDIT_TITLE,
      title,
    };
    const newState = reducer(initialState, action);
    const expectedState = produce(initialState, draftState => {
      draftState.title = title;
    });
    expect(newState).toEqual(expectedState);
  });

  it('should handle SET_STORED_STATE', () => {
    const storedState = {
      title: { inputType: 'title', value: 'New Stored Title' },
      elements: [
        {
          id: 1,
          inputs: [
            { id: 1, inputType: 'text', value: 'New Stored Text' },
            { id: 2, inputType: 'additionalText', value: 'New Stored Additional Text' },
          ],
          icon: 'star',
        },
      ],
    };
    const action = {
      type: SET_STORED_STATE,
      payload: storedState,
    };
    const newState = reducer(initialState, action);
    expect(newState).toEqual(storedState);
  });
  
  it('should return the current state for unknown action types', () => {
    const state = { someProp: 'someValue' };
    const action = { type: 'UNKNOWN_ACTION_TYPE' };
    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });
});
