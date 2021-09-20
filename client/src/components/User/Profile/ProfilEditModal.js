import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

function ProfilEditModal({ ...props }) {
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
      history.go(0);
    } catch (err) {
      Swal.fire("Oops", `${err}`, "error");
    }
  };

  const birthdateTemp = user.birthdate.slice().split("T");
  const birthdateConverted = birthdateTemp[0];

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <FontAwesomeIcon icon={faUserEdit} style={{ marginRight: 4 }} /> Edit
          Profil
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nama </Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              value={user.name}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label for="birthdate">Tanggal Lahir</Form.Label>
            <Form.Control
              type="date"
              name="birthdate"
              value={birthdateConverted}
              onChange={(e) => setUser({ ...user, birthdate: e.target.value })}
            />
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
          >
            <Form.Label column>Jenis Kelamin</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                name="gender"
                label="Laki-laki"
                value="Laki-laki"
              />
              <Form.Check
                type="radio"
                name="gender"
                label="Perempuan"
                value="Perempuan"
              />
            </Col>
          </Form.Group>
          <div className="d-flex justify-content-evenly">
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => submitHandler(e)}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
              >
                Simpan
              </motion.div>
            </Button>
            <Button onClick={props.onHide} variant="danger">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
              >
                Tutup
              </motion.div>
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ProfilEditModal;
