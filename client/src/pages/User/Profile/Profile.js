import React, { useState, useEffect } from "react";
import { Col, Card, Row, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import "./Profile.css";
import { ProfilEditModal } from "../../../components/User/";
import {
  faTwitterSquare,
  faFacebook,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import { faImage } from "@fortawesome/free-solid-svg-icons";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    birthdate: "",
    gender: "",
    avatar: "",
    createdAt: "",
  });
  const [modalShow, setModalShow] = useState(false);

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
    postAvatar();
  };

  const postAvatar = async () => {
    try {
      let formData = new FormData();
      formData.append("avatar", user.avatar);
      await axios({
        method: "PUT",
        url: "http://localhost:3000/users/upload",
        data: formData,
        headers: {
          access_token,
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire(`Sukses!`, "Avatar sukses diedit", "success");
      history.go(0);
    } catch (err) {
      Swal.fire("Oops", `${err}`, "error");
      console.log(err);
    }
  };

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUser({ avatar: reader.result });
      }

      reader.readAsDataURL(e.target.files[0]);
    };
  };

  // if (user.avatar) {
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setUser({ avatar: reader.result });
  //   };
  //   reader.readAsDataURL(user.avatar);
  // } else {
  //   return null;
  // }

  const tempBirthDate = user.createdAt.slice().split("T");
  const date = tempBirthDate[0];

  const tempDate = user.birthdate.slice().split("T");
  const birthdate = tempDate[0];

  return (
    <Container>
      <h4>
        <strong>Profil</strong>
      </h4>
      <hr />
      <Card style={{ marginBottom: 20 }}>
        <Row className="mb-10">
          <Col md={4} style={{ backgroundColor: "#292b2c" }}>
            <Card.Img
              variant="top"
              src={`http://localhost:3000/tmp/my-uploads/${user.avatar}`}
              style={{
                objectFit: "cover",
                height: "256px",
                maxWdth: "100%",
                maxHeight: "100%",
                marginRight: 10,
                marginTop: 10,
                marginBottom: 10,
              }}
            />
            <input
              style={{
                display: "none",
                margin: "10px",
              }}
              type="file"
              id="file"
              name="file"
              accept="image/*"
              onChange={(e) => {
                setUser({ ...user, avatar: e.target.files[0] });
                imageHandler();
              }}
            ></input>

            <div className="d-flex align-items-center justify-content-end">
              <label
                for="file"
                style={{
                  color: "white",
                  height: "40px",
                  width: "100px",
                  backgroundColor: "#6c757d",
                  margin: "auto",
                  fontSize: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: `"Source Sans Pro", sans-serif`,
                  marginBottom: "10px",
                  cursor: "pointer",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FontAwesomeIcon icon={faImage} />
                  &nbsp;Pilih Gambar
                </motion.div>
              </label>
              <Button
                variant="secondary"
                type="submit"
                size="sm"
                style={{
                  color: "white",
                  height: "40px",
                  width: "100px",
                  margin: "auto",
                  fontSize: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: `"Source Sans Pro", sans-serif`,
                  marginBottom: "10px",
                  cursor: "pointer",
                }}
                onClick={(e) => submitHandler(e)}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Save Avatar
                </motion.div>
              </Button>
            </div>
          </Col>
          <Col
            md={8}
            style={{ padding: 20, backgroundColor: "#F0F3F4 " }}
            className="info"
          >
            <Card.Title>
              <strong>Informasi User</strong>
            </Card.Title>
            <Row className="mb-4 mt-4">
              <Col md={4}>
                <Card.Text>Email</Card.Text>
                <Card.Text>Tanggal Lahir</Card.Text>
                <Card.Text>Jenis Kelamin</Card.Text>
                <Card.Text>Tanggal bergabung</Card.Text>
                <Card.Text>Sosial Media</Card.Text>
              </Col>
              <Col md={4}>
                <Card.Text>:&nbsp;&nbsp;{user.email}</Card.Text>
                <Card.Text>:&nbsp;&nbsp;{birthdate}</Card.Text>
                <Card.Text>:&nbsp;&nbsp;{user.gender}</Card.Text>
                <Card.Text>:&nbsp;&nbsp;{date}</Card.Text>
                <Card.Text>
                  :&nbsp;&nbsp;
                  <a href="#" className="icon">
                    <FontAwesomeIcon icon={faTwitterSquare} />
                  </a>
                  <a href="#" className="icon">
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                  <a href="#" className="icon">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                  <a href="#" className="icon">
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                </Card.Text>
              </Col>
            </Row>

            <Button
              variant="dark"
              className="info"
              onClick={() => setModalShow(true)}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
              >
                Edit Profil
              </motion.div>
            </Button>

            <ProfilEditModal
              show={modalShow}
              user={user}
              onHide={() => setModalShow(false)}
            />
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default Profile;
