import React from "react";
import {
  Col,
  Card,
  Image,
  Row,
  OverlayTrigger,
  Button,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Car.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDoorClosed,
  faCouch,
  faSuitcase,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

function Cars(props) {
  const { id, nama, harga_sewa, penumpang, bagasi, pintu, CarsImages } =
    props.car;

  const variants = props.variants;

  const images = CarsImages.map((image) => {
    return `http://localhost:3000/tmp/my-uploads/${image.filename}`;
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

  return (
    <Col md={4} xs={6} className="mb-4">
      <motion.div
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.9 }}
        variants={variants}
      >
        <Link className="link-car " to={`/car/${id}`}>
          <Card className="shadow">
            <Card.Img
              as={Image}
              variant="top"
              src={images}
              fluid={true}
              alt="Card image"
              className="card-image"
              style={{
                height: "230px",
                width: "350px",
                maxWdth: "100%",
                maxHeight: "100%",
              }}
            />
            <Card.Body>
              <Card.Title>
                <span>{nama}</span>
              </Card.Title>
              <Card.Text>
                <strong
                  style={{
                    opacity: "98",
                  }}
                >
                  IDR {harga_sewa.toLocaleString("en")}/hari
                </strong>
                <Row>
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
                        <span>{bagasi === true ? " ✓" : " x"}</span>
                      </Button>
                    </OverlayTrigger>
                  </Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </motion.div>
    </Col>
  );
}

export default Cars;
