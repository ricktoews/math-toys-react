import React from 'react';
import './App.css';
import Router from './Router';
import Masthead from './Masthead';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <Masthead />
          <Router />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
