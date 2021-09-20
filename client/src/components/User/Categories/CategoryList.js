import React from "react";
import { Col, ListGroup, Accordion, FormControl, Form } from "react-bootstrap";
import "./Category.css";

function CategoryList({ searchFunction, typeFilterFunction }) {
  const clearAllFilters = () => {
    typeFilterFunction("");
    searchFunction("");
  };

  return (
    <Col md={2}>
      <h4>
        <strong>Filter Mobil</strong>
      </h4>
      <hr />
      <div>
        <Form>
          <FormControl
            type="search"
            placeholder="Cari Mobil..."
            className="mr-2"
            aria-label="Search"
            onChange={(e) => {
              searchFunction(`${e.target.value}`);
            }}
          />
        </Form>
      </div>

      <ListGroup variant="flush">
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          className="category"
          onClick={() => clearAllFilters()}
        >
          <strong>Bersihkan Filter</strong>
        </ListGroup.Item>
      </ListGroup>

      <Accordion
        defaultActiveKey="1"
        flush
        className="mb-1"
        style={{ backgroundColor: "black" }}
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header>Tipe Mobil</Accordion.Header>
          <Accordion.Body>
            <ListGroup variant="flush">
              {/* <ListGroup.Item
                style={{ cursor: "pointer" }}
                className="category"
                onClick={() => typeFilterFunction("Sedan")}
              >
                Sedan
              </ListGroup.Item> */}
              {/* <ListGroup.Item
                style={{ cursor: "pointer" }}
                className="category"
                onClick={() => typeFilterFunction("City Car")}
              >
                City Car
              </ListGroup.Item> */}
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                className="category"
                onClick={() => typeFilterFunction("Minivan")}
              >
                Minivan
              </ListGroup.Item>
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                className="category"
                onClick={() => typeFilterFunction("SUV")}
              >
                SUV
              </ListGroup.Item>
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                className="category"
                onClick={() => typeFilterFunction("Hatchback")}
              >
                Hatchback
              </ListGroup.Item>
              {/* <ListGroup.Item
                style={{ cursor: "pointer" }}
                className="category"
                onClick={() => typeFilterFunction("Double Cabin")}
              >
                Double Cabin
              </ListGroup.Item> */}
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* 
      <Accordion defaultActiveKey="1" flush className="mb-1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Jumlah Seat</Accordion.Header>
          <Accordion.Body>
            <ListGroup variant="flush">
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                className="category"
              >
                Cras justo odio
              </ListGroup.Item>
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                className="category"
              >
                Dapibus ac facilisis in
              </ListGroup.Item>
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                className="category"
              >
                Morbi leo risus
              </ListGroup.Item>
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                className="category"
              >
                Porta ac consectetur ac
              </ListGroup.Item>
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                className="category"
              >
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
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                className="category"
              >
                Cras justo odio
              </ListGroup.Item>
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                className="category"
              >
                Dapibus ac facilisis in
              </ListGroup.Item>
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                className="category"
              >
                Morbi leo risus
              </ListGroup.Item>
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                className="category"
              >
                Porta ac consectetur ac
              </ListGroup.Item>
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                className="category"
              >
                Vestibulum at eros
              </ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion> */}
    </Col>
  );
}

export default CategoryList;
