import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import {
  addToExpression,
  clearExpression,
  deleteLastPhrase,
  state,
  updateExpression,
} from '../redux/main';

const numbers = [
  { text: '7', id: 'seven' },
  { text: '8', id: 'eight' },
  { text: '9', id: 'nine' },
  { text: '4', id: 'four' },
  { text: '5', id: 'five' },
  { text: '6', id: 'six' },
  { text: '1', id: 'one' },
  { text: '2', id: 'two' },
  { text: '3', id: 'three' },
  { text: '0', size: 2, id: 'zero' },
];

const operators = [
  { text: '/', id: 'divide' },
  { text: '*', id: 'multiply' },
  { text: '-', id: 'subtract' },
  { text: '+', id: 'add' },
];

const spaceBetweenKeys = 2;

class Presentational extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.onNumClicked = this.onNumClicked.bind(this);
    this.onOperatorClicked = this.onOperatorClicked.bind(this);
    this.onDecimalClicked = this.onDecimalClicked.bind(this);
    this.onEqualsClicked = this.onEqualsClicked.bind(this);
  }
  onNumClicked(number: string) {
    const expression = this.props.expression;
    const lastPhrase = expression[expression.length - 1];
    if (!lastPhrase && number === '0') {
      return;
    }
    if (lastPhrase && !isNaN(lastPhrase)) {
      this.props.updateLastPhrase(lastPhrase + number);
    } else {
      this.props.addPhraseToExpression(number);
    }
  }
  onOperatorClicked(operator: string) {
    const expression = this.props.expression;
    const lastPhrase = expression[expression.length - 1];
    const oneToTheLastPhrase = expression[expression.length - 2];
    if (operator === '-') {
      if (lastPhrase === '-') {
        if (!isNaN(oneToTheLastPhrase)) {
          return this.props.addPhraseToExpression(operator);
        }
      } else {
        return this.props.addPhraseToExpression(operator);
      }
    } else {
      if (!lastPhrase) {
        return;
      }
      if (isNaN(lastPhrase)) {
        if (isNaN(oneToTheLastPhrase)) {
          this.props.deleteLastPhrase();
        }
        return this.props.updateLastPhrase(operator);
      }
      return this.props.addPhraseToExpression(operator);
    }
  }
  onDecimalClicked() {
    const expression = this.props.expression;
    const lastPhrase: string = expression[expression.length - 1];
    if (!isNaN(lastPhrase as any)) {
      if (lastPhrase.includes('.')) {
        return;
      }
      this.props.updateLastPhrase(lastPhrase + '.');
    } else {
      this.props.addPhraseToExpression('0.');
    }
  }
  onEqualsClicked() {
    const result = eval(this.props.expression.join(' '));
    this.props.eraseExpression();
    this.props.addPhraseToExpression(result);
  }
  render(): React.ReactNode {
    return (
      <Row className={'gx-' + spaceBetweenKeys} id="keyboard">
        <Col xs={9}>
          <Row className={'g-' + spaceBetweenKeys}>
            <Col xs={12} className="">
              <Button onClick={this.props.eraseExpression} id="clear">
                AC
              </Button>
            </Col>
            {numbers.map((num, i) => (
              <Col xs={(num.size || 1) * 4} key={i}>
                <Button
                  variant="light"
                  id={num.id}
                  onClick={() => this.onNumClicked(num.text)}
                >
                  {num.text}
                </Button>
              </Col>
            ))}
            <Col>
              <Button
                variant="light"
                id="decimal"
                onClick={this.onDecimalClicked}
              >
                .
              </Button>
            </Col>
          </Row>
        </Col>
        <Col id="operators" xs={3}>
          <Row xs={1} className={'g-' + spaceBetweenKeys}>
            {operators.map((operator, i) => (
              <Col key={i}>
                <Button
                  variant="danger"
                  id={operator.id}
                  onClick={() => {
                    this.onOperatorClicked(operator.text);
                  }}
                >
                  {operator.text}
                </Button>
              </Col>
            ))}
            <Col>
              <Button
                variant="danger"
                id="equals"
                onClick={this.onEqualsClicked}
              >
                =
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = (state: state) => {
  return {
    expression: state.expression,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    updateLastPhrase: (newPhrase: string) => {
      dispatch(updateExpression(newPhrase));
    },
    eraseExpression: () => {
      dispatch(clearExpression());
    },
    addPhraseToExpression: (phrase: string | number) => {
      dispatch(addToExpression(phrase));
    },
    deleteLastPhrase: () => {
      dispatch(deleteLastPhrase());
    },
  };
};
const Keyboard = connect(mapStateToProps, mapDispatchToProps)(Presentational);
export default Keyboard;
