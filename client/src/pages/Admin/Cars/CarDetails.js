import React, { useState, useEffect } from "react";
import {
  Col,
  Card,
  Row,
  Tooltip,
  Button,
  OverlayTrigger,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faDoorClosed,
  faCouch,
  faFan,
  faSuitcase,
} from "@fortawesome/free-solid-svg-icons";
import CarImageSlider from "../../../components/Admin/Cars/CarImageSlider";

import axios from "axios";

function CarDetails() {
  const params = useParams();
  const id = +params.id;

  const [car, setCar] = useState({
    nama: "",
    harga_sewa: 0,
    penumpang: 0,
    bagasi: false,
    pintu: 0,
    ac: false,
    type: "",
    CarsImages: [],
  });

  useEffect(() => {
    getCarDetails();
  }, []);

  const renderTooltipPenumpang = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Penumpang: {car.penumpang}
    </Tooltip>
  );
  const renderTooltipPintu = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Pintu: {car.pintu}
    </Tooltip>
  );
  const renderTooltipBagasi = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Bagasi: {car.bagasi === true ? " ada" : " tidak ada"}
    </Tooltip>
  );
  const renderTooltipAc = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      AC: {car.ac === true ? " ada" : " tidak ada"}
    </Tooltip>
  );

  const getCarDetails = async () => {
    try {
      let cars = await axios({
        method: "GET",
        url: `http://localhost:3000/cars/details/${id}`,
      });
      setCar(cars.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Col md={10} className="p-5 pt-2">
      <h3>
        <FontAwesomeIcon icon={faCar} style={{ marginRight: 4 }} />
        Detail Mobil
      </h3>
      <hr />
      <Row>
        <Col md={12} className="mb-2">
          <Card
            style={{
              boxShadow:
                "0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2)",
            }}
          >
            <Row>
              <Col md={4}>
                <CarImageSlider car={car.id} car={car} />
              </Col>
              <Col md={8}>
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title>
                        <h2>{car.nama}</h2>
                      </Card.Title>
                    </Col>
                    <Col style={{ marginTop: 10 }}>
                      <FontAwesomeIcon
                        icon={faCar}
                        style={{ marginRight: 4, marginTop: 4 }}
                      />
                      {car.type}
                    </Col>
                  </Row>
                  <Card.Text>
                    <strong>Deskripsi:</strong> <br />
                    {car.description}
                  </Card.Text>
                  <Card.Text>
                    <Row>
                      <Col>
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltipPintu}
                        >
                          <Button
                            variant="link"
                            style={{
                              color: "black",
                              textDecoration: "none",
                            }}
                          >
                            <FontAwesomeIcon icon={faDoorClosed} />
                            <span style={{ marginLeft: 4 }}>{car.pintu}</span>
                          </Button>
                        </OverlayTrigger>
                      </Col>
                      <Col>
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltipPenumpang}
                        >
                          <Button
                            variant="link"
                            style={{
                              color: "black",
                              textDecoration: "none",
                            }}
                          >
                            <FontAwesomeIcon icon={faCouch} />
                            <span style={{ marginLeft: 4 }}>
                              {car.penumpang}
                            </span>
                          </Button>
                        </OverlayTrigger>
                      </Col>
                    </Row>
                  </Card.Text>
                  <Card.Text>
                    <Row>
                      <Col>
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltipBagasi}
                        >
                          <Button
                            variant="link"
                            style={{
                              color: "black",
                              textDecoration: "none",
                            }}
                          >
                            <FontAwesomeIcon icon={faSuitcase} />
                            <span style={{ marginLeft: 4 }}>
                              {car.bagasi === true ? " ✓" : " x"}
                            </span>
                          </Button>
                        </OverlayTrigger>
                      </Col>
                      <Col>
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltipAc}
                        >
                          <Button
                            variant="link"
                            style={{
                              color: "black",
                              textDecoration: "none",
                            }}
                          >
                            <FontAwesomeIcon icon={faFan} />
                            <span style={{ marginLeft: 4 }}>
                              {car.ac === true ? " ✓" : " x"}
                            </span>
                          </Button>
                        </OverlayTrigger>
                      </Col>
                    </Row>
                  </Card.Text>
                  <Card.Text>
                    Harga sewa: IDR {car.harga_sewa.toLocaleString("en")}
                    /hari
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Col>
  );
}

export default CarDetails;
