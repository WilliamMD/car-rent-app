import React, { useState, useEffect } from "react";
import { Nav, Navbar, NavDropdown, Container, Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./AdminNavbarComponent.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";

function AdminNavbarComponent({ userLogin, user }) {
  const history = useHistory();

  const logoutHandler = (e) => {
    e.preventDefault();
    userLogin(false);
    localStorage.clear();
    history.push("/login");
  };

  return (
    <div>
      <Navbar variant="dark" className="bg-dark g-0" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/" id="linkTitle">
              <strong>AutoRent | ADMIN</strong>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Image
                className="nav-avatar"
                src={`http://localhost:3000/tmp/my-uploads/${user.avatar}`}
                alt="..."
                style={{
                  objectFit: "cover",
                }}
              />
              <NavDropdown
                title={<strong style={{ color: "white" }}>{user.name}</strong>}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>
                  <Link className="link-drop-down" to="profile">
                    <FontAwesomeIcon icon={faUserCircle} className="nav-icon" />
                    <span>Profile</span>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link
                    className="link-drop-down"
                    onClick={(e) => logoutHandler(e)}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" />
                    <span>Logout</span>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default AdminNavbarComponent;
