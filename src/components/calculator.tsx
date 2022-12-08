import React from 'react';
import { connect } from 'react-redux';

import { addToExpression, expression, state } from '../redux/main';

class Presentational extends React.Component {
  render(): React.ReactNode {
    return <p>hello from calculator component</p>;
  }
}
const mapStateToProps = (state: state) => {
  return {
    expression: state.expression,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    addNewExpression: (phrase: expression[0]) => {
      dispatch(addToExpression(phrase));
    },
  };
};
const Calculator = connect(mapStateToProps, mapDispatchToProps)(Presentational);
export default Calculator;
