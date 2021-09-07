import React, { useState } from "react";
import {
  Col,
  Card,
  Row,
  OverlayTrigger,
  Form,
  Button,
  Tooltip,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Car.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faDoorClosed,
  faCouch,
  faFan,
  faSuitcase,
} from "@fortawesome/free-solid-svg-icons";
import { CarImageSlider, StarRating } from "../";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

function CarDetails({ car, rate, hover, ratingState, hovered, login }) {
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
  } = car;

  const [carComments, setCarComments] = useState({
    comments: "",
    rating: 0,
  });

  const renderTooltipPenumpang = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Penumpang: {penumpang}
    </Tooltip>
  );
  const renderTooltipPintu = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Pintu: {pintu}
    </Tooltip>
  );
  const renderTooltipBagasi = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Bagasi: {bagasi === true ? " ada" : " tidak ada"}
    </Tooltip>
  );
  const renderTooltipAc = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      AC: {ac === true ? " ada" : " tidak ada"}
    </Tooltip>
  );

  const history = useHistory();

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const access_token = localStorage.getItem("access_token");
      await axios({
        method: "POST",
        url: `http://localhost:3000/cars_comments/add/${id}`,
        data: carComments,
        headers: {
          access_token,
        },
      });

      Swal.fire(`Sukses!`, "Komentar telah ditambahkan", "success");
      history.push(`/car/${id}`);
    } catch (err) {
      Swal.fire("Oops", `${err.message}`, "error");
    }
  };

  const addRate = (param) => {
    setCarComments({ ...carComments, rating: param });
  };

  return (
    <>
      <Card className="mb-3">
        <Row>
          <Col md={5}>
            <CarImageSlider car={car.id} car={car} />
          </Col>
          <Col md={7}>
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title>
                    <h2>{nama}</h2>
                  </Card.Title>
                </Col>
                <Col style={{ marginTop: 10 }}>
                  <FontAwesomeIcon
                    icon={faCar}
                    style={{ marginRight: 4, marginTop: 4 }}
                  />
                  {type}
                </Col>
              </Row>
              <Card.Text>
                <strong>Deskripsi:</strong> <br />
                {description}
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
                        <span style={{ marginLeft: 4 }}>{pintu}</span>
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
                        <span style={{ marginLeft: 4 }}>{penumpang}</span>
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
                          {bagasi === true ? " ✓" : " x"}
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
                          {ac === true ? " ✓" : " x"}
                        </span>
                      </Button>
                    </OverlayTrigger>
                  </Col>
                </Row>
              </Card.Text>
              <Card.Text>
                Harga sewa: IDR {harga_sewa.toLocaleString("en")}
                /hari
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      {login && (
        <Form>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>
                  <strong>Berikan Review</strong>
                </Form.Label>
                <Form.Group>
                  <StarRating
                    rate={rate}
                    hover={hover}
                    ratingState={ratingState}
                    hovered={hovered}
                    addRate={addRate}
                  />
                  <Form.Control
                    as="textarea"
                    rows={5}
                    onChange={(e) =>
                      setCarComments({
                        ...carComments,
                        comments: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ marginTop: 10 }}
                  onClick={(e) => setCarComments(addComment(e))}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Submit
                  </motion.div>
                </Button>
              </Form.Group>
            </Col>
            <Col md={4}></Col>
            <Col md={4}></Col>
          </Row>
        </Form>
      )}
    </>
  );
}

export default CarDetails;
