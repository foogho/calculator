import { AnyAction, legacy_createStore } from 'redux';

// action types
const ADD_TO_EXPRESSION = 'ADD_TO_EXPRESSION';
const UPDATE_EXPRESSION = 'UPDATE_EXPRESSION';
const REMOVE_EXPRESSION = 'REMOVE_EXPRESSION';
const DELETE_LAST_PHRASE = 'DELETE_LAST_PHRASE';

// action creators
export const addToExpression = (phrase: string | number) => {
  return {
    type: ADD_TO_EXPRESSION,
    phrase,
  };
};

export const updateExpression = (newPhrase: string) => {
  return {
    type: UPDATE_EXPRESSION,
    phrase: newPhrase,
  };
};

export const clearExpression = () => {
  return {
    type: REMOVE_EXPRESSION,
  };
};

export const deleteLastPhrase = () => {
  return {
    type: DELETE_LAST_PHRASE,
  };
};

export interface state {
  expression: string[];
}

const initialState: state = {
  expression: [],
};

const reducer = (state = initialState, action: AnyAction): state => {
  switch (action.type) {
    case ADD_TO_EXPRESSION:
      return Object.assign({}, state, {
        expression: [...state.expression, action.phrase],
      });
    case UPDATE_EXPRESSION:
      return Object.assign({}, state, {
        expression: [
          ...state.expression.slice(0, state.expression.length - 1),
          action.phrase,
        ],
      });
    case REMOVE_EXPRESSION:
      return initialState;
    case DELETE_LAST_PHRASE:
      return Object.assign({}, state, {
        expression: state.expression.slice(0, state.expression.length - 1),
      });
    default:
      return state;
  }
};

export const store = legacy_createStore(reducer);
