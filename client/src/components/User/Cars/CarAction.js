import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Car.css";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

function CarAction({ car, totalRating }) {
  const { id, nama, harga_sewa } = car;

  const [order, setOrder] = useState({
    days: 0,
    city: "",
    address: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();

    addOrder(order.days, order.city, order.address, nama, harga_sewa);
  };

  const history = useHistory();
  const access_token = localStorage.getItem("access_token");

  const addOrder = async (...props) => {
    try {
      const [days, city, address, order_name, harga_sewa] = props;

      await axios({
        method: "POST",
        url: `http://localhost:3000/line_items/add/${id}`,
        data: {
          nama,
          days,
          city,
          address,
          harga_sewa,
        },
        headers: {
          access_token,
        },
      });
      Swal.fire(`Sukses!`, "Mobil telah ditambahkan", "success");
      history.push("/cart");
    } catch (err) {
      Swal.fire("Oops", `${err}`, "error");
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title className="card-action-title">
          {totalRating.total}
          Sewa Mobil
        </Card.Title>
        <Card.Text>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Kota</Form.Label>
              <Form.Select
                aria-label="Default select example"
                id="city"
                onChange={(e) => setOrder({ ...order, city: e.target.value })}
              >
                <option disabled selected value>
                  -- Pilih Kota --
                </option>
                <option value="DKI Jakarta">DKI Jakarta</option>
                <option value="Depok">Depok</option>
                <option value="Bogor">Bogor</option>
                <option value="Bekasi">Bekasi</option>
                <option value="Tangerang">Tangerang</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Alamat</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                rows={2}
                onChange={(e) =>
                  setOrder({ ...order, address: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Jumlah hari</Form.Label>
              <Form.Control
                type="number"
                min="1"
                onChange={(e) => setOrder({ ...order, days: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Text className="text-muted">
                Total harga: IDR{" "}
                {(harga_sewa * order.days).toLocaleString("en")}
              </Form.Text>
            </Form.Group>{" "}
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => submitHandler(e)}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
              >
                Sewa
              </motion.div>
            </Button>
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CarAction;
