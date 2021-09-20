import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Button, Tooltip, Overlay, ListGroup } from "react-bootstrap";
import Cars from "./Cars";
import Pagination from "../../Pagination";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAmountDownAlt } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

function CarList({ search, typeFilter }) {
  const [cars, setCars] = useState([]);
  const URL = "http://localhost:3000";
  const [sort, setSort] = useState("");
  const [currentPage, setcurrentPage] = useState(1);

  useEffect(() => {
    getCars();
  }, [search, typeFilter, sort, currentPage]);

  const getCars = async () => {
    try {
      let cars = await axios({
        method: "GET",
        url: `${URL}/cars`,
        params: {
          nama: search,
          type: typeFilter,
          sort: sort,
          page: currentPage,
        },
      });
      setCars(cars.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadingCar = () => {
    return (
      <div>
        <p className="text-center font-weight-bold">
          Memuat daftar mobil... harap tunggu..
        </p>
      </div>
    );
  };

  const paginate = (pageNumber) => setcurrentPage(pageNumber);

  function Example() {
    const [show, setShow] = useState(false);
    const target = useRef(null);

    return (
      <>
        <Button
          ref={target}
          onClick={() => setShow(!show)}
          variant="link"
          style={{
            color: "black",
            textDecoration: "none",
          }}
        >
          <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.9 }}>
            <FontAwesomeIcon
              className="justify-content-right sort"
              icon={faSortAmountDownAlt}
              style={{ marginLeft: 5 }}
            />
          </motion.div>
        </Button>

        <Overlay target={target.current} show={show} placement="right">
          {(props) => (
            <Tooltip id="overlay-example" {...props}>
              <ListGroup>
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ListGroup.Item
                    style={{
                      padding: 0,
                      color: "white",
                      backgroundColor: "black",
                    }}
                    onClick={() => setSort("terbaru")}
                  >
                    Terbaru
                  </ListGroup.Item>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ListGroup.Item
                    style={{
                      padding: 0,
                      color: "white",
                      backgroundColor: "black",
                    }}
                    onClick={() => setSort("terlama")}
                  >
                    Terlama
                  </ListGroup.Item>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ListGroup.Item
                    style={{
                      padding: 0,
                      color: "white",
                      backgroundColor: "black",
                    }}
                    onClick={() => setSort("hargaTinggi")}
                  >
                    Harga Tertinggi
                  </ListGroup.Item>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ListGroup.Item
                    style={{
                      padding: 0,
                      color: "white",
                      backgroundColor: "black",
                    }}
                    onClick={() => setSort("hargaRendah")}
                  >
                    Harga Terendah
                  </ListGroup.Item>
                </motion.div>
              </ListGroup>
            </Tooltip>
          )}
        </Overlay>
      </>
    );
  }

  const container = {
    show: {
      transition: {
        staggerChildren: 0.35,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 200,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.6, 0.01, -0.05, 0.95],
        duration: 1.6,
      },
    },
    exit: {
      opacity: 0,
      y: -200,
      transition: {
        ease: "easeInOut",
        duration: 0.8,
      },
    },
  };

  return (
    <Col md={10}>
      <h4>
        <strong>Daftar Mobil</strong>
      </h4>
      <hr />
      <Example />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <Row>
          {cars.length === 0
            ? loadingCar()
            : cars.car.map((car, i) => {
                return <Cars variants={item} key={i} car={car} />;
              })}
        </Row>
      </motion.div>
      <Pagination
        itemsPerPage={cars.limit}
        totalItems={cars.totalCar}
        paginate={paginate}
      />
    </Col>
  );
}

export default CarList;
