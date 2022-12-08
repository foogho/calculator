import { AnyAction, legacy_createStore } from 'redux';

type OPERATOR = 'OPERATOR';
type OPERAND = 'OPERAND';

export type expression = Array<{ type: OPERATOR | OPERAND; value: string }>;

const ADD_TO_EXPRESSION = 'ADD_TO_EXPRESSION';
const REMOVE_EXPRESSION = 'REMOVE_EXPRESSION';
const EVALUATE_EXPRESSION = 'EVALUATE_EXPRESSION';

export const addToExpression = (phrase: expression[0]) => {
  return {
    type: ADD_TO_EXPRESSION,
    phrase,
  };
};

const clearExpression = () => {
  return {
    type: REMOVE_EXPRESSION,
  };
};

const evaluation = () => {
  // evaluation process
};

export interface state {
  expression: expression;
  result?: number;
}

const initialState: state = {
  expression: [],
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_TO_EXPRESSION:
      return Object.assign({}, state, {
        expression: [...state.expression, action.phrase],
      });
    case REMOVE_EXPRESSION:
      return initialState;
    default:
      return state;
  }
};

export const store = legacy_createStore(reducer);
