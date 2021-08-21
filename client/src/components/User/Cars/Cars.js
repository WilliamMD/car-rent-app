import React from "react";
import { Col, Card, Image } from "react-bootstrap";
import "./Car.css";

function Cars(props) {
  const {
    id,
    nama,
    harga_sewa,
    penumpang,
    bagasi,
    pintu,
    ac,
    type,
    description,
    CarsImages,
  } = props.car;

  const images = CarsImages.map((image) => {
    return `http://localhost:3000/tmp/my-uploads/${image.filename}`;
  });
  console.log(images);

  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className="shadow">
        <Card.Img
          as={Image}
          variant="top"
          src={images}
          fluid={true}
          alt="Card image"
          className="card-image"
        />
        <Card.Body>
          <Card.Title>{nama}</Card.Title>
          <Card.Text>IDR {harga_sewa.toLocaleString("en")}/hari</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Cars;
