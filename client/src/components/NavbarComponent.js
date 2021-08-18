import React from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";

export const NavbarComponent = () => {
  return (
    <Navbar variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <strong>RentCar</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#cart">Cart</Nav.Link>
            <Nav.Link href="#transaction">Transaction</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item>Register</NavDropdown.Item>
              <NavDropdown.Item>Login</NavDropdown.Item>
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
