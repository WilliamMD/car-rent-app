import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faCar, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

import { CarListTable } from "../../../components/Admin";

function CarList() {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    getCars();
  }, []);

  const getCars = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      let result = await axios({
        method: "GET",
        url: "http://localhost:3000/cars/user_cars/",
        headers: {
          access_token,
          "Content-Type": "multipart/form-data",
        },
      });
      setCars(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Col md={10} className="p-5 pt-2">
        <h3>
          <FontAwesomeIcon icon={faCar} style={{ marginRight: 4 }} />
          Daftar Mobil
        </h3>
        <hr />
        <Row>
          <Col md={4}>
            <Link to="/car/add" className="btn btn-dark mb-3">
              <motion.div
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.9 }}
              >
                <FontAwesomeIcon
                  icon={faPlusSquare}
                  style={{ marginRight: 4 }}
                />
                Tambah Mobil
              </motion.div>
            </Link>
          </Col>
        </Row>
        <CarListTable key={cars.id} cars={cars} />
      </Col>
    </>
  );
}

export default CarList;
