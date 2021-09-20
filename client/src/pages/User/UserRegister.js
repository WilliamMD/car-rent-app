import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function UserRegister() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    birthdate: "",
    type: "",
  });

  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(user);
    setUser({ ...user, type: "user" });
    register();
  };

  const register = async () => {
    try {
      let result = await axios({
        method: "POST",
        url: "http://localhost:3000/users/register",
        data: user,
      });
      Swal.fire(`You are now registered!`, "You may login now.", "success");
      history.push("/login");
    } catch (err) {
      Swal.fire("Oops", `${err}`, "error");
    }
  };

  return (
    <>
      <div
        className="form-container"
        style={{
          width: "600px",
          boxShadow:
            "0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2)",
          borderRadius: "30px",
          position: "absolute",
          left: "50%",
          top: "54%",
          transform: "translate(-50%, -50%)",
          padding: "10px",
        }}
      >
        <h4 className="form-title" style={{ textAlign: "center" }}>
          User Register
        </h4>
        <Form
          className="form"
          style={{
            marginTop: "40px",
            marginBottom: "40px",
            marginLeft: "50px",
            marginRight: "50px",
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ex: example@email.com"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
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
            <Form.Label>Birthdate</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter email"
              onChange={(e) => setUser({ ...user, birthdate: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Group
              className="mb-3"
              onChange={(e) => setUser({ ...user, gender: e.target.value })}
            >
              <Form.Check
                type="radio"
                inline
                id="gender"
                name="gender"
                value="Laki-laki"
                label="Laki-laki"
              />
              <Form.Check
                type="radio"
                inline
                id="gender"
                name="gender"
                value="Perempuan"
                label="Perempuan"
              />
            </Form.Group>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Text className="text-muted">
              Already have an account? Log in&nbsp;
              <Link to="/login">here</Link>!
            </Form.Text>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => submitHandler(e)}
          >
            Register
          </Button>
        </Form>
      </div>
    </>
  );
}

export default UserRegister;
