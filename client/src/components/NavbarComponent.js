import React from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import './NavbarComponent.css';

export const NavbarComponent = () => {
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
              <Link to="/" className="link">Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/cart" className="link">Keranjang</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/transaction" className="link">Transaksi</Link>
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="Akun" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link to="/register" className="link-drop-down">Registrasi</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/login" className="link-drop-down">Login</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/profile" className="link-drop-down">Profil</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
