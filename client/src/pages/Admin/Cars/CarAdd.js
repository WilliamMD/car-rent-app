import React, { useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

import axios from "axios";
import Swal from "sweetalert2";

function CarAdd() {
  const [car, setCar] = useState({
    nama: "",
    harga_sewa: 0,
    penumpang: 0,
    bagasi: false,
    pintu: 0,
    ac: false,
    type: "",
  });
  const [carImages, setCarImages] = useState([]);

  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();

    addCar();
  };

  const addCar = async () => {
    try {
      let formData = new FormData();

      formData.append("nama", car.nama);
      formData.append("harga_sewa", car.harga_sewa);
      formData.append("penumpang", car.penumpang);
      formData.append("bagasi", car.bagasi);
      formData.append("pintu", car.pintu);
      formData.append("ac", car.ac);
      formData.append("type", car.type);
      formData.append("description", car.description);

      for (let i = 0; i < carImages.length; i++) {
        formData.append("file", carImages[i]);
      }

      const access_token = localStorage.getItem("access_token");
      await axios({
        method: "POST",
        url: "http://localhost:3000/cars/add",
        data: formData,
        headers: {
          access_token,
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire(`Sukses!`, "Mobil telah ditambahkan", "success");
      history.push("/car/list");
    } catch (err) {
      Swal.fire("Oops", `${err}`, "error");
    }
  };

  return (
    <Col md={10} className="p-5 pt-2">
      <h3>
        <FontAwesomeIcon icon={faCar} style={{ marginRight: 4 }} />
        Tambah Mobil
      </h3>
      <hr />
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Nama Mobil</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setCar({ ...car, nama: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" as={Col}>
            <Form.Label>Harga Sewa</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setCar({ ...car, harga_sewa: e.target.value })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Tipe Mobil</Form.Label>
            <Form.Select
              onChange={(e) => setCar({ ...car, type: e.target.value })}
            >
              <option disabled selected>
                -- Pilih tipe mobil --
              </option>
              <option value="Sedan">Sedan</option>
              <option value="City Car">City Car</option>
              <option value="Minivan">Minivan</option>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Double Cabin">Double Cabin</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Deskripsi</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Jumlah Pintu</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setCar({ ...car, pintu: e.target.value })}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Jumlah Seat</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setCar({ ...car, penumpang: e.target.value })}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group className="mb-3" id="formGridCheckbox" as={Col}>
            <Form.Check
              type="checkbox"
              label="Bagasi"
              onChange={(e) => setCar({ ...car, bagasi: true })}
            />
          </Form.Group>

          <Form.Group className="mb-3" id="formGridCheckbox" as={Col}>
            <Form.Check
              type="checkbox"
              label="AC"
              onChange={(e) => setCar({ ...car, ac: true })}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Gambar</Form.Label>
            <Form.Control
              type="file"
              name="file"
              accept="image/*"
              multiple
              onChange={(e) => setCarImages(e.target.files)}
            />
          </Form.Group>

          {/* <Form.Group as={Col}>
            <Form.Label>Gambar 2</Form.Label>
            <Form.Control
              type="file"
              name="file"
              accept="image/*"
              onChange={(e) => setCarImages(e.target.files)}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Gambar 3</Form.Label>
            <Form.Control
              type="file"
              name="file"
              accept="image/*"
              onChange={(e) => setCarImages(e.target.files)}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Gambar 4</Form.Label>
            <Form.Control
              type="file"
              name="file"
              accept="image/*"
              onChange={(e) => setCarImages(e.target.files)}
            />
          </Form.Group> */}
        </Row>
        <Button variant="dark" type="submit" onClick={(e) => submitHandler(e)}>
          <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.9 }}>
            Tambah
          </motion.div>
        </Button>
      </Form>
    </Col>
  );
}

export default CarAdd;
