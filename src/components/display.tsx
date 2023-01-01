import React from 'react';
import { Stack } from 'react-bootstrap';
import { connect } from 'react-redux';

import { state } from '../redux/main';

class Presentational extends React.Component<any> {
  render(): React.ReactNode {
    const expression = this.props.expression;
    const lastPhrase = expression[expression.length - 1];
    return (
      <div id="display" className="p-5 position-relative">
        <Stack
          direction="vertical"
          className="position-absolute end-0 bottom-0 p-2 text-end"
        >
          <p>
            {expression.map((phrase: string, i: number) => (
              <span key={i}>{phrase}</span>
            ))}
          </p>
          <h3>{lastPhrase || 0}</h3>
        </Stack>
      </div>
    );
  }
}

const mapStateToProps = function (state: state) {
  return {
    expression: state.expression,
  };
};

const Display = connect(mapStateToProps, null)(Presentational);
export default Display;
