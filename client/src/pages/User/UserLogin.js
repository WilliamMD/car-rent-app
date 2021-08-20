import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "../LoginRegisterForm.css";
import axios from "axios";
import Swal from "sweetalert2";

function UserLogin() {
  const [ user, setUser ] = useState({
      email: '',
      password: ''
  });

  const history = useHistory();

  

  return (
    <div className="form-container">
    <h4 className="form-title">User Login</h4>
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
            <Link to="/admin/login">Admin Log in</Link>
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UserLogin;
