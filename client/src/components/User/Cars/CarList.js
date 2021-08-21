import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Cars from "./Cars";
import axios from "axios";
import Swal from "sweetalert2";

function CarList() {
  const [cars, setCars] = useState([]);
  const URL = "http://localhost:3000";

  useEffect(() => {
    getCars();
  }, []);

  const getCars = async () => {
    try {
      let cars = await axios({
        method: "GET",
        url: `${URL}/cars/`,
      });
      // console.log(cars.data);
      setCars(cars.data);
    } catch (err) {
      Swal.fire("Oops", `${err}`, "error");
    }
  };

  const loadingCar = () => {
    return (
      <div className="text-light bg-grey">
        <p className="text-center font-weight-bold">
          Memuat daftar mobil... harap tunggu..
        </p>
      </div>
    );
  };

  return (
    <Col md={8} mt="2">
      <h4>
        <strong>Daftar Mobil</strong>
      </h4>
      <hr />
      <Row>
        {
          cars.length === 0 ?
            loadingCar()
            :
            cars.map(car => {
              return (
                  <Cars key={car.id} car={car}/>
              )
          })
        }
      </Row>
    </Col>
  );
}

export default CarList;
