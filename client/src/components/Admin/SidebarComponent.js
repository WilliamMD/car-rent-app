import React from "react";
import { Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./SidebarComponent.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUserCircle,
  faCar,
  faUsers,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";

function SidebarComponent() {
  return (
    <Col md={2} className="bg-secondary pr-3 pt-4" style={{ fontSize: 15 }}>
      <Nav defaultActiveKey="/admin" ml={3} className="flex-column mb-5">
        <Nav.Link className="text-white">
          <Link to="/" className="text-white" style={{ textDecoration: 0 }}>
            <FontAwesomeIcon icon={faTachometerAlt} className="nav-icon" />
            Dashboard
          </Link>
        </Nav.Link>{" "}
        <hr className="bg-secondary" />
        <Nav.Link eventKey="link-1" className="text-white">
          <Link
            to="/profile"
            className="text-white"
            style={{ textDecoration: 0 }}
          >
            <FontAwesomeIcon icon={faUserCircle} className="nav-icon" />
            Profil
          </Link>
        </Nav.Link>
        <hr className="bg-secondary" />
        <Nav.Link eventKey="link-1" className="text-white">
          <Link
            to="/car/list"
            className="text-white"
            style={{ textDecoration: 0 }}
          >
            <FontAwesomeIcon icon={faCar} className="nav-icon" />
            Daftar Mobil
          </Link>
        </Nav.Link>
        <hr className="bg-secondary" />
        <Nav.Link eventKey="link-2" className="text-white">
          <Link
            to="/transaction/list"
            className="text-white"
            style={{ textDecoration: 0 }}
          >
            <FontAwesomeIcon icon={faListAlt} className="nav-icon" />
            Transaksi Berlangsung
          </Link>
        </Nav.Link>
        <hr className="bg-secondary" />
        <Nav.Link eventKey="link-1" className="text-white">
          <Link
            to="/transaction/completed/list"
            className="text-white"
            style={{ textDecoration: 0 }}
          >
            <FontAwesomeIcon icon={faUsers} className="nav-icon" />
            Transaksi Sukses
          </Link>
        </Nav.Link>
        <hr className="bg-secondary" />
      </Nav>
    </Col>
  );
}

export default SidebarComponent;
