import React from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "../LoginRegisterForm.css";

function AdminLogin() {
  return (
    <div className="form-container">
    <h4 className="form-title">Admin Login</h4>
      <Form className="form">
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Ex: tes@gmail.com" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Text className="text-muted">
            <Link to="/login">User Log in</Link>
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AdminLogin;
