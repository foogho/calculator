import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

import './calculator.scss';
import Display from './display';
import Keyboard from './keyboard';

export default class Calculator extends React.Component {
  render(): React.ReactNode {
    return (
      <Card bg="light" className="rounded-4">
        <Card.Body className="p-0">
          <Container>
            <Row xs={1}>
              <Col>
                <Display />
              </Col>
              <Col className='rounded-4 p-3' id='keyboard-wrapper'>
                <Keyboard />
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    );
  }
}
