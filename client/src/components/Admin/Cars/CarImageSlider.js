import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {
  faArrowCircleRight,
  faArrowCircleLeft,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

function CarImageSlider(props) {
  const { id, nama, CarsImages } = props.car;
  const [current, setCurrent] = useState(0);
  const length = CarsImages.length;
  const history = useHistory();
  const access_token = localStorage.getItem("access_token");

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(CarsImages) || CarsImages.length <= 0) {
    return null;
  }

  const deleteProductHandler = (id) => {
    try {
      Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Hapus produk secara permanen",
        icon: "warning",
        showCancelButton: true,
        confirmButtondivor: "#3085d6",
        cancelButtondivor: "#d33",
        confirmButtonText: "Ya, Hapus!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios({
            method: "DELETE",
            url: `http://localhost:3000/cars/delete/${id}`,
            headers: {
              access_token,
            },
          });
          Swal.fire("Delete Success!", `${nama} has been deleted.`, "success");
          history.push("/car/list");
        }
      });
    } catch (err) {
      Swal.fire("Opps!", `${err}`, "error");
    }
  };

  return (
    <section className="slider">
      {CarsImages.map((img, index) => {
        return (
          <div
            className={index === current ? "slide-active" : "slide"}
            key={index}
          >
            {index === current && (
              <Card.Img
                className="slider-img"
                style={{
                  height: "250px",
                  maxWdth: "100%",
                  paddingLeft: 10,
                  paddingTop: 10,
                }}
                src={`http://localhost:3000/tmp/my-uploads/${img.filename}`}
                alt="Gambar Mobil"
              />
            )}
          </div>
        );
      })}

      <div className="justify-content-center text-align-center">
        <FontAwesomeIcon
          className="left-arrow"
          style={{
            position: "absolute",
            top: "75%",
            left: "20px",
            fontSize: "2rem",
            color: "#000",
            zIndex: "10",
            cursor: "pointer",
            userSelect: "none",
          }}
          icon={faArrowCircleLeft}
          onClick={prevSlide}
        />

        <FontAwesomeIcon
          className="right-arrow"
          style={{
            position: "absolute",
            top: "75%",
            left: "280px",
            fontSize: "2rem",
            color: "#000",
            zIndex: "10",
            cursor: "pointer",
            userSelect: "none",
          }}
          icon={faArrowCircleRight}
          onClick={nextSlide}
        />
      </div>
      <br />
      <br />

      <div className="d-flex align-items-center justify-content-evenly mb-3 ">
        <div>
          <Link
            to={`/car/${id}/edit`}
            style={{ fontSize: "15px" }}
            variant="dark"
            className="btn btn-dark"
          >
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.9 }}>
              <FontAwesomeIcon icon={faEdit} />
              &nbsp;Edit
            </motion.div>
          </Link>
        </div>
        <div md={6}>
          <Button
            style={{ fontSize: "15px" }}
            variant="dark"
            onClick={() => deleteProductHandler(id)}
          >
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.9 }}>
              <FontAwesomeIcon icon={faTrash} />
              &nbsp;Hapus
            </motion.div>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CarImageSlider;
