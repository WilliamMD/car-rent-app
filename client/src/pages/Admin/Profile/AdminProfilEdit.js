import React, { useState, useEffect } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import "./AdminProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

function AdminProfilEdit() {
  const [user, setUser] = useState({
    name: "",
    birthdate: "",
    gender: "",
  });

  const history = useHistory();
  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      let result = await axios({
        method: "GET",
        url: "http://localhost:3000/users/details",
        headers: {
          access_token,
        },
      });

      setUser(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    updateUser();
  };

  const updateUser = async () => {
    try {
      await axios({
        method: "PUT",
        url: "http://localhost:3000/users/update",
        data: user,
        headers: {
          access_token,
        },
      });

      Swal.fire(`Sukses!`, "Profil sukses diedit", "success");
      history.push("/profile");
    } catch (err) {
      Swal.fire("Oops", `${err}`, "error");
    }
  };

  const birthdateTemp = user.birthdate.slice().split("T");
  const birthdateConverted = birthdateTemp[0];

  return (
    <Col md={10} className="p-5 pt-2">
      <h3>
        <FontAwesomeIcon icon={faUserEdit} style={{ marginRight: 4 }} />
        Edit Profil
      </h3>
      <hr />
      <Form>
        <Form.Group>
          <Form.Label>Nama </Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            value={user.name}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tanggal Lahir</Form.Label>
          <Form.Control
            type="date"
            onChange={(e) => setUser({ ...user, birthdate: e.target.value })}
            value={birthdateConverted}
          />
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          onChange={(e) => setUser({ ...user, gender: e.target.value })}
        >
          <Form.Label as="legend" column sm={2}>
            Jenis Kelamin
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="Laki-laki"
              value="Laki-laki"
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
            />
            <Form.Check
              type="radio"
              label="Perempuan"
              value="Perempuan"
              name="formHorizontalRadios"
              id="formHorizontalRadios2"
            />
          </Col>
        </Form.Group>

        <Button variant="dark" type="submit" onClick={(e) => submitHandler(e)}>
          <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.9 }}>
            Simpan
          </motion.div>
        </Button>
      </Form>
    </Col>
  );
}

export default AdminProfilEdit;
