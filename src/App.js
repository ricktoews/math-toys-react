import React from 'react';
import './App.css';
import Router from './Router';
import { Container, Row, Col } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <Router />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
