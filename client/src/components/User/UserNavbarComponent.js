import React, { useState, useEffect } from "react";
import { Nav, Navbar, NavDropdown, Container, Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./UserNavbarComponent.css";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";

const UserNavbarComponent = ({ login, userLogin }) => {
  const [user, setUser] = useState({});
  const history = useHistory();

  const logoutHandler = (e) => {
    e.preventDefault();
    userLogin(false);
    localStorage.clear();
    history.push("/");
  };

  // All this just so I can display the user name and avatar on the navbar
  useEffect(() => {
    getUser();
  }, [login]);

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
  //

  const avatarTemp = `http://localhost:3000/tmp/my-uploads/${user.avatar}`;

  return (
    <Navbar variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/" id="linkTitle">
            <strong>RentCar</strong>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/" className="link">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              {login ? (
                <Link to="/cart" className="link">
                  Keranjang
                </Link>
              ) : (
                <Link to="/login" className="link">
                  Keranjang
                </Link>
              )}
            </Nav.Link>
            <Nav.Link>
              {login ? (
                <Link to="/transaction" className="link">
                  Transaksi
                </Link>
              ) : (
                <Link to="/login" className="link">
                  Transaksi
                </Link>
              )}
            </Nav.Link>
          </Nav>
          <Nav>
            {login && (
              <Image className="nav-avatar" src={avatarTemp} alt="..." />
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
                    <Link className="link-drop-down" to="profile">
                      <FontAwesomeIcon
                        icon={faUserCircle}
                        className="nav-icon"
                      />
                      <span>Profile</span>
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link
                      className="link-drop-down"
                      onClick={(e) => logoutHandler(e)}
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
                    <Link className="link-drop-down" to="register">
                      Register
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link className="link-drop-down" to="login">
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
