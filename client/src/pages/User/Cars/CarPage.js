import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import { CarDetails, CarAction, CarComments } from "../../../components/User";
import axios from "axios";

function CarPage({ login }) {
  const params = useParams();
  const id = +params.id;
  const [carComments, setCarComments] = useState([]);
  const [totalRating, setTotalRating] = useState([]);
  const [car, setCar] = useState({
    nama: "",
    harga_sewa: 0,
    penumpang: 0,
    bagasi: false,
    pintu: 0,
    ac: false,
    type: "",
    description: "",
    CarsImages: [],
  });

  useEffect(() => {
    getCarDetails();
    getComments();
    getTotalRating();
    console.log(totalRating);
  }, []);

  const getCarDetails = async () => {
    try {
      let result = await axios({
        method: "GET",
        url: `http://localhost:3000/cars/details/${id}`,
      });
      setCar(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getComments = async () => {
    try {
      let result = await axios({
        method: "GET",
        url: `http://localhost:3000/cars_comments/car/${id}`,
      });
      setCarComments(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTotalRating = async () => {
    try {
      let result = await axios({
        method: "GET",
        url: `http://localhost:3000/cars_comments/car/rating/${id}`,
      });
      setTotalRating(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  const [ratingState, setRatingState] = useState(0);
  const [hovered, setHovered] = useState(0);

  const rate = (param) => {
    setRatingState(param);
  };
  const hover = (param) => {
    setHovered(param);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={9} className="mb-3">
          <CarDetails
            car={car}
            rate={rate}
            hover={hover}
            ratingState={ratingState}
            hovered={hovered}
            login={login}
          />
        </Col>
        {login && (
          <Col md={3}>
            <CarAction className="mb-3" car={car} totalRating={totalRating} />
          </Col>
        )}
      </Row>
      <Row>
        <Col md={9} className="mb-3">
          {carComments.map((carComment) => {
            return <CarComments key={carComment.id} carComment={carComment} />;
          })}
        </Col>
      </Row>
    </Container>
  );
}

export default CarPage;
