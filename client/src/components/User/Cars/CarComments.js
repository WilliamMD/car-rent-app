import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import "./Car.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import CarImageSlider from "../../../components/User/Cars/CarImageSlider";

function CarComments(props) {
  const { comments, created_on, rating, User } = props.carComment;

  const tempDate = created_on.slice().split("T");
  const date = tempDate[0];
  const time = tempDate[1].slice().split(".");
  return (
    <>
      <Card style={{ borderRadius: "0%", marginBottom: 15 }}>
        <Row>
          <Card.Body>
            <Card.Title>
              <img
                src={`http://localhost:3000/tmp/my-uploads/${User.avatar}`}
                style={{ width: 30, height: 30, marginLeft: 5 }}
                className="rounded"
              ></img>
              <span style={{ marginLeft: 5 }}>{User.name}</span>
            </Card.Title>
            <Card.Text>
              <span style={{ marginLeft: 5 }}>{comments}</span>
              <br />
              <span style={{ marginLeft: 5 }}>
                {[...Array(rating)].map((star) => {
                  return (
                    <FontAwesomeIcon
                      className="star"
                      icon={faStar}
                      color={"#ffc107"}
                    />
                  );
                })}
              </span>
              <br />
              <span style={{ marginLeft: 5 }}>
                {date} {time[0]}
              </span>
              <br />
            </Card.Text>
          </Card.Body>
        </Row>
      </Card>
    </>
  );
}

export default CarComments;
