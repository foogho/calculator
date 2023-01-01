import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { Provider } from 'react-redux';

import './App.scss';
import Calculator from './components/calculator';
import { store } from './redux/main';

function App() {
  return (
    <Provider store={store}>
      <Container fluid="md">
        <Row className="vh-100 align-items-center">
          <Col sm={5} md={4} className="mx-auto">
            <Calculator />
          </Col>
        </Row>
      </Container>
    </Provider>
  );
}

export default App;
