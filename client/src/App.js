import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Col, Row, Container } from "react-bootstrap";
import "./App.css";
import "./index.css";

import { NavbarComponent, 
  CategoryList,
  CarList,
  Cars
} from "./components/";

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <div className="mt-3">
        <Container fluid>
          <Row>
            <CategoryList />
            <Col>
              <CarList/>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
