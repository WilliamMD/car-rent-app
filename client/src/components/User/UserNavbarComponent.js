import React, { useState, useEffect } from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Image,
  Badge,
} from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./UserNavbarComponent.css";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";

const UserNavbarComponent = ({ login, userLogin }) => {
  const [user, setUser] = useState({});
  const [carts, setCarts] = useState([]);
  const [orders, setOrders] = useState([]);
  const history = useHistory();
  const location = useLocation();

  const logoutHandler = (e) => {
    e.preventDefault();
    userLogin(false);
    localStorage.clear();
    history.push("/login");
  };

  const access_token = localStorage.getItem("access_token");
  useEffect(() => {
    getUser();
  }, [login]);

  useEffect(() => {
    getOrders();
    getCarts();
  }, [access_token]);

  const getUser = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      let loggedUser = await axios({
        method: "GET",
        url: "http://localhost:3000/users/details",
        headers: {
          access_token,
        },
      });
      setUser(loggedUser.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getCarts = async () => {
    try {
      let result = await axios({
        method: "GET",
        url: "http://localhost:3000/line_items/cart",
        headers: {
          access_token,
        },
      });
      setCarts(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getOrders = async () => {
    try {
      let result = await axios({
        method: "GET",
        url: "http://localhost:3000/line_items/order",
        headers: {
          access_token,
        },
      });
      console.log(result.data);
      setOrders(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const avatarTemp = `http://localhost:3000/tmp/my-uploads/${user.avatar}`;

  return (
    <Navbar variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/" id="linkTitle">
            <strong>AutoRent</strong>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/home" className="link">
                Home
              </Link>
            </Nav.Link>
            {login && (
              <Nav.Link>
                <Link to="/cart" className="link">
                  Keranjang{" "}
                  {carts.length > 0 && (
                    <Badge bg="danger">{carts.length}</Badge>
                  )}
                </Link>
              </Nav.Link>
            )}
            {login && (
              <Nav.Link>
                <Link to="/transaction" className="link">
                  Transaksi{" "}
                  {orders.length > 0 && (
                    <Badge bg="danger">{orders.length}</Badge>
                  )}
                </Link>
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {login && (
              <Image
                className="nav-avatar"
                src={avatarTemp}
                style={{
                  objectFit: "cover",
                }}
                alt="..."
              />
            )}
            <NavDropdown
              title={
                login ? (
                  <span style={{ color: "white" }}>{user.name}</span>
                ) : (
                  "Akun"
                )
              }
              id="basic-nav-dropdown"
            >
              {login ? (
                <>
                  <NavDropdown.Item>
                    <Link className="link-drop-down" to="/profile">
                      <FontAwesomeIcon
                        icon={faUserCircle}
                        className="nav-icon"
                      />
                      <span>Profil</span>
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link
                      className="link-drop-down"
                      onClick={(e) => logoutHandler(e)}
                      replace={location.pathname === "/login"}
                    >
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        className="nav-icon"
                      />
                      <span>Logout</span>
                    </Link>
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item>
                    <Link
                      className="link-drop-down"
                      to="/register"
                      replace={location.pathname === "/register"}
                    >
                      Register
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link
                      className="link-drop-down"
                      to="/login"
                      replace={location.pathname === "/login"}
                    >
                      Log In
                    </Link>
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserNavbarComponent;
