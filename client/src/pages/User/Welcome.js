import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Container, Card, Carousel, Row, Col } from "react-bootstrap";

function Welcome() {
  const { ref, inView } = useInView({
    // treshold: 0.2,
  });
  const animation = useAnimation();
  const buttonAnim = useAnimation();
  useEffect(() => {
    if (inView) {
      animation.start({
        x: 35,
        opacity: 1,
        transition: {
          type: "spring",
          duration: 1.5,
          bounce: 0.3,
        },
      });

      buttonAnim.start({
        y: 0,
        opacity: 1,
        transition: {
          duration: 1,
        },
      });
    }

    if (!inView) {
      animation.start({
        x: "-100vw",
        opacity: 0.5,
      });
      buttonAnim.start({
        y: -20,
        opacity: 0.5,
      });
    }
  }, [inView]);

  return (
    <Container fluid className="bg-dark">
      <Row>
        <Col md={1}></Col>
        <Col
          md={10}
          style={{ margin: "auto", marginTop: 20, marginBottom: 20 }}
        >
          <Carousel style={{ marginBottom: 20 }}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                style={{
                  width: "auto",
                  height: "740px",
                }}
                src="https://cdn.aarp.net/content/dam/aarp/benefits_discounts/providers/avis/1140x641-avis-toyota-skyline-bridges-trees-aug-2020.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h1>First slide label</h1>
                <h5>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </h5>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                style={{
                  width: "auto",
                  objectFit: "cover",
                  height: "740px",
                }}
                src="https://www.ukcarhire.net/assets/images/new_car_bg.jpg"
                alt="Second slide"
              />

              <Carousel.Caption>
                <h1>Second slide label</h1>
                <h5>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </h5>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                style={{
                  width: "auto",
                  objectFit: "cover",
                  height: "740px",
                }}
                src="https://www.desktopbackground.org/download/1680x1050/2013/06/16/592767_wide-hd-car-rental-wallpapers_2048x1121_h.jpg"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h1>Third slide label</h1>
                <h5>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </h5>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>

          <Row className="my-auto" ref={ref}>
            <Col md={4}>
              <motion.div
                animate={animation}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
              >
                <Card style={{ width: "18rem", cursor: "pointer" }}>
                  <Card.Img
                    style={{ height: "12rem" }}
                    variant="top"
                    src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i90YJ5pOhIcs/v0/1000x-1.jpg"
                  />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            <Col md={4}>
              <motion.div
                animate={animation}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
              >
                <Card style={{ width: "18rem", cursor: "pointer" }}>
                  <Card.Img
                    style={{ height: "12rem" }}
                    variant="top"
                    src="https://media.istockphoto.com/photos/car-dealershipyoung-man-receiving-car-key-from-saleswoman-picture-id1053485132?k=20&m=1053485132&s=612x612&w=0&h=2jqd27Fce74oEAO2jn7OtrJ5isN_nWQLV4JaZYHKexE="
                  />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>

              <motion.div
                animate={buttonAnim}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link
                  className="btn btn-primary pr-100"
                  style={{
                    marginTop: 20,
                    marginLeft: 105,
                  }}
                  to="/home"
                >
                  Rental Sekarang
                </Link>
              </motion.div>
            </Col>

            <Col md={4}>
              <motion.div
                animate={animation}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
              >
                <Card style={{ width: "18rem", cursor: "pointer" }}>
                  <Card.Img
                    style={{ height: "12rem" }}
                    variant="top"
                    src="https://zhurkamurkamagazine.ru/wp-content/uploads/2020/07/original.jpg"
                  />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </Col>
        <Col md={1}></Col>
      </Row>
    </Container>
  );
}

export default Welcome;
