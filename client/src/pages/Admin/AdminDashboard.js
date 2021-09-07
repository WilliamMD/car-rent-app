import React, { useState, useEffect } from "react";
import { Col, Card, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";
import axios from "axios";
import { motion } from "framer-motion";

import {
  faTachometerAlt,
  faCar,
  faClipboardList,
  faAngleDoubleRight,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";

function AdminDashboard() {
  const [cars, setCars] = useState([]);
  const [orders, setOrders] = useState([]);
  const [ordersDone, setOrdersDone] = useState([]);

  useEffect(() => {
    getCars();
    getOrders();
    getOrdersDone();
  }, []);

  const access_token = localStorage.getItem("access_token");

  const getCars = async () => {
    try {
      let result = await axios({
        method: "GET",
        url: "http://localhost:3000/cars/user_cars",
        headers: {
          access_token,
        },
      });
      setCars(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getOrders = async () => {
    try {
      let result = await axios({
        method: "GET",
        url: "http://localhost:3000/line_items/admin/order",
        headers: {
          access_token,
        },
      });
      setOrders(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getOrdersDone = async () => {
    try {
      let result = await axios({
        method: "GET",
        url: "http://localhost:3000/line_items/admin/order/done",
        headers: {
          access_token,
        },
      });
      setOrdersDone(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Col md={10} className="p-5 pt-2">
      <h3>
        <FontAwesomeIcon icon={faTachometerAlt} style={{ marginRight: 4 }} />
        Dashboard
      </h3>
      <hr />
      <Row>
        <Col md={4} className="text-white mb-2">
          <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.9 }}>
            <Card style={{ width: "18rem" }} className="bg-dark">
              <Card.Body>
                <div className="card-body-icon">
                  <FontAwesomeIcon icon={faCar} className="nav-icon" />
                </div>
                <Card.Title>Jumlah Mobil</Card.Title>
                <div className="display-4">{cars.length}</div>
                <Link to="/car/list" className="link">
                  <Card.Text className="text-white">
                    Lihat Detail
                    <FontAwesomeIcon
                      icon={faAngleDoubleRight}
                      style={{ marginLeft: "10px" }}
                    />
                  </Card.Text>
                </Link>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
        <Col md={4} className="text-white mb-2">
          <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.9 }}>
            <Card style={{ width: "18rem" }} className="bg-dark">
              <Card.Body>
                <div className="card-body-icon">
                  <FontAwesomeIcon
                    icon={faClipboardList}
                    className="nav-icon"
                  />
                </div>
                <Card.Title>Jumlah Transaksi</Card.Title>
                <div className="display-4">{orders.length}</div>
                <Link to="/transaction/list" className="link">
                  <Card.Text className="text-white">
                    Lihat Detail
                    <FontAwesomeIcon
                      icon={faAngleDoubleRight}
                      style={{ marginLeft: "10px" }}
                    />
                  </Card.Text>
                </Link>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
        <Col md={4} className="text-white mb-2">
          <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.9 }}>
            <Card style={{ width: "18rem" }} className="bg-dark">
              <Card.Body>
                <div className="card-body-icon">
                  <FontAwesomeIcon
                    icon={faClipboardCheck}
                    className="nav-icon"
                  />
                </div>
                <Card.Title>Jumlah Transaksi Sukses</Card.Title>
                <div className="display-4">{ordersDone.length}</div>
                <Link to="/transaction/completed/list" className="link">
                  <Card.Text className="text-white">
                    Lihat Detail
                    <FontAwesomeIcon
                      icon={faAngleDoubleRight}
                      style={{ marginLeft: "10px" }}
                    />
                  </Card.Text>
                </Link>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Col>
  );
}

export default AdminDashboard;
