import React, { useState, useEffect } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

import axios from "axios";
import Swal from "sweetalert2";

function CarEdit() {
  const params = useParams();
  const id = +params.id;
  const [car, setCar] = useState({
    nama: "",
    harga_sewa: 0,
    penumpang: 0,
    bagasi: false,
    pintu: 0,
    ac: false,
    type: "",
    CarsImages: [],
  });

  const history = useHistory();
  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    getCarDetails();
  }, []);

  const getCarDetails = async () => {
    try {
      let cars = await axios({
        method: "GET",
        url: `http://localhost:3000/cars/details/${id}`,
      });
      setCar(cars.data);
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    updateCar();
  };

  const updateCar = async () => {
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

      let IMAGE0 = false;
      let IMAGE1 = false;
      let IMAGE2 = false;
      let IMAGE3 = false;

      for (let i = 0; i < car.CarsImages.length + 1; i++) {
        if (i === 1) {
          IMAGE0 = true;
        } else if (i === 2) {
          IMAGE1 = true;
        } else if (i === 3) {
          IMAGE2 = true;
        } else if (i === 4) {
          IMAGE3 = true;
        }
      }
      formData.append("IMAGE0", IMAGE0);
      formData.append("IMAGE1", IMAGE1);
      formData.append("IMAGE2", IMAGE2);
      formData.append("IMAGE3", IMAGE3);

      for (let i = 0; i < car.CarsImages.length + 1; i++) {
        formData.append("file", car.CarsImages[i]);
      }

      await axios({
        method: "PUT",
        url: `http://localhost:3000/cars/update/${id}`,
        data: formData,
        headers: {
          access_token,
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire(`Sukses!`, "Mobil sukses diedit", "success");
      history.push(`/car/${id}`);
    } catch (err) {
      Swal.fire("Oops", `${err}`, "error");
    }
  };

  return (
    <Col md={10} className="p-5 pt-2">
      <h3>
        <FontAwesomeIcon icon={faCar} style={{ marginRight: 4 }} />
        Edit Mobil
      </h3>
      <hr />
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Nama Mobil</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setCar({ ...car, nama: e.target.value })}
              value={car.nama}
            />
          </Form.Group>

          <Form.Group className="mb-3" as={Col}>
            <Form.Label>Harga Sewa</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setCar({ ...car, harga_sewa: e.target.value })}
              value={car.harga_sewa}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Tipe Mobil</Form.Label>
            <Form.Select
              onChange={(e) => setCar({ ...car, type: e.target.value })}
              value={car.type}
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
            value={car.description}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Jumlah Pintu</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setCar({ ...car, pintu: e.target.value })}
              value={car.pintu}
              checked={car.pintu}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Jumlah Seat</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setCar({ ...car, penumpang: e.target.value })}
              value={car.penumpang}
              checked={car.penumpang}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group className="mb-3" id="formGridCheckbox" as={Col}>
            <Form.Check
              type="checkbox"
              label="Bagasi"
              onChange={(e) => setCar({ ...car, bagasi: true })}
              defaultChecked={car.bagasi}
            />
          </Form.Group>

          <Form.Group className="mb-3" id="formGridCheckbox" as={Col}>
            <Form.Check
              type="checkbox"
              label="AC"
              onChange={(e) => setCar({ ...car, ac: true })}
              defaultChecked={car.ac}
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
              onChange={(e) => setCar({ ...car, CarsImages: e.target.files })}
              // value={`http://localhost:3000/tmp/my-uploads/${car.CarsImages.filename}`}
            />
          </Form.Group>
        </Row>
        <Button variant="dark" type="submit" onClick={(e) => submitHandler(e)}>
          <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.9 }}>
            Simpan
          </motion.div>
        </Button>
      </Form>
    </Col>
  );
}

export default CarEdit;
