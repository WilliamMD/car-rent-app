import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function AdminLogin({ userLogin, getToken }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(user);
    loginAxios();
  };

  const loginAxios = async () => {
    try {
      let result = await axios({
        method: "POST",
        url: "http://localhost:3000/users/admin/login",
        data: user,
      });

      const access_token = result.data["access_token"];
      getToken(access_token);
      userLogin(true);
      Swal.fire(`Welcome back!`, "You are now logged in.", "success");
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="form-container"
      style={{
        width: "600px",
        boxShadow:
          "0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2)",
        borderRadius: "30px",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        padding: "10px",
      }}
    >
      <h4 className="form-title" style={{ textAlign: "center" }}>
        Admin Login
      </h4>
      <Form className="form">
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ex: tes@gmail.com"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Text className="text-muted ">
            <Link to="/login">User Log in</Link>
          </Form.Text>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => submitHandler(e)}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AdminLogin;
