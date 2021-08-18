import React from "react";
import { Col, Card } from "react-bootstrap";

const Cars = () => {
  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className="shadow">
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>
            Toyota Grand New Avanza
          </Card.Title>
          <Card.Text>
            IDR 200.000,00/hari
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Cars;
