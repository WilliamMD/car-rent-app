import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { motion } from "framer-motion";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function CarImageSlider(props) {
  const { CarsImages } = props.car;
  const [current, setCurrent] = useState(0);

  const length = CarsImages.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(CarsImages) || CarsImages.length <= 0) {
    return null;
  }

  return (
    <>
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
                    height: "300px",
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
              top: "80%",
              left: "20px",
              fontSize: "2rem",
              color: "#000",
              zIndex: "10",
              cursor: "pointer",
              userSelect: "none",
            }}
            icon={faArrowLeft}
            onClick={prevSlide}
          />

          <FontAwesomeIcon
            className="right-arrow"
            style={{
              position: "absolute",
              top: "80%",
              left: "355px",
              fontSize: "2rem",
              color: "#000",
              zIndex: "10",
              cursor: "pointer",
              userSelect: "none",
            }}
            icon={faArrowRight}
            onClick={nextSlide}
          />
        </div>
        <br />
        <br />
      </section>
    </>
  );
}

export default CarImageSlider;
