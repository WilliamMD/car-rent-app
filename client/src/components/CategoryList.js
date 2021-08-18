import React, { Component } from "react";
import { Col, ListGroup, Accordion } from "react-bootstrap";
import './Category.css'

export default class CategoryList extends Component {
  render() {
    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Filter Mobil</strong>
        </h4>
        <hr />
        <Accordion defaultActiveKey="1" flush className="mb-1">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Tipe Mobil</Accordion.Header>
            <Accordion.Body>
              <ListGroup variant="flush">
                <ListGroup.Item style={{cursor: 'pointer'}} className="category">
                    Cras justo odio
                </ListGroup.Item>
                <ListGroup.Item style={{cursor: 'pointer'}} className="category">
                    Cras justo odio
                </ListGroup.Item>
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Accordion defaultActiveKey="1" flush className="mb-1">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Jumlah Seat</Accordion.Header>
            <Accordion.Body>
              <ListGroup variant="flush">
                <ListGroup.Item  style={{cursor: 'pointer'}} className="category">
                    Cras justo odio
                </ListGroup.Item >
                <ListGroup.Item style={{cursor: 'pointer'}} className="category">
                    Dapibus ac facilisis in
                </ListGroup.Item>
                <ListGroup.Item style={{cursor: 'pointer'}} className="category">
                    Morbi leo risus
                </ListGroup.Item>
                <ListGroup.Item style={{cursor: 'pointer'}} className="category">
                    Porta ac consectetur ac
                </ListGroup.Item>
                <ListGroup.Item style={{cursor: 'pointer'}} className="category">
                    Vestibulum at eros
                </ListGroup.Item>
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Accordion defaultActiveKey="1" flush className="mb-1">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Jarak</Accordion.Header>
            <Accordion.Body>
              <ListGroup variant="flush">
                <ListGroup.Item  style={{cursor: 'pointer'}} className="category">
                    Cras justo odio
                </ListGroup.Item >
                <ListGroup.Item style={{cursor: 'pointer'}} className="category">
                    Dapibus ac facilisis in
                </ListGroup.Item>
                <ListGroup.Item style={{cursor: 'pointer'}} className="category">
                    Morbi leo risus
                </ListGroup.Item>
                <ListGroup.Item style={{cursor: 'pointer'}} className="category">
                    Porta ac consectetur ac
                </ListGroup.Item>
                <ListGroup.Item style={{cursor: 'pointer'}} className="category">
                    Vestibulum at eros
                </ListGroup.Item>
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>
    );
  }
}
