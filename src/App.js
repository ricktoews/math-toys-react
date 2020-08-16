import React from 'react';
import './App.css';
import Router from './Router';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <Container style={{ marginTop: '10px' }}>
      <Row>
        <Col>
          <Router />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
