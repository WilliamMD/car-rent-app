import React from "react";
import { Col, Card, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

import {
  faTachometerAlt,
  faCar,
  faClipboardList,
  faAngleDoubleRight,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";

function AdminDashboard() {
  return (
    <Col md={10} className="p-5 pt-2">
      <h3>
        <FontAwesomeIcon icon={faTachometerAlt} style={{ marginRight: 4 }} />
        Dashboard
      </h3>
      <hr />
      <Row>
        <Col md={4} className="text-white mb-2">
          <Card style={{ width: "18rem" }} className="bg-primary">
            <Card.Body>
              <div className="card-body-icon">
                <FontAwesomeIcon icon={faCar} className="nav-icon" />
              </div>
              <Card.Title>Jumlah Mobil</Card.Title>
              <div className="display-4">4</div>
              <Link to="/admin/car_list" className="link">
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
        </Col>
        <Col md={4} className="text-white mb-2">
          <Card style={{ width: "18rem" }} className="bg-danger">
            <Card.Body>
              <div className="card-body-icon">
                <FontAwesomeIcon icon={faClipboardList} className="nav-icon" />
              </div>
              <Card.Title>Jumlah Transaksi</Card.Title>
              <div className="display-4">4</div>
              <Link to="/details" className="link">
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
        </Col>
        <Col md={4} className="text-white mb-2">
          <Card style={{ width: "18rem" }} className="bg-warning">
            <Card.Body>
              <div className="card-body-icon">
                <FontAwesomeIcon icon={faClipboardCheck} className="nav-icon" />
              </div>
              <Card.Title>Jumlah Transaksi Sukses</Card.Title>
              <div className="display-4">10</div>
              <Link to="/details" className="link">
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
        </Col>
      </Row>
    </Col>
  );
}

export default AdminDashboard;
