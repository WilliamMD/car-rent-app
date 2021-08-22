import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row, Table, FormControl, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faCar,
  faPlusSquare,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import { CarListTable } from "../../components/Admin/";
import Pagination from "../../components/Pagination";

function CarList() {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    getCars();
  }, []);

  const getCars = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      let result = await axios({
        method: "GET",
        url: "http://localhost:3000/cars/user_cars/",
        headers: {
          access_token,
          "Content-Type": "multipart/form-data",
        },
      });
      setCars(result.data);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  // real time search
  const [search, setSearch] = useState("");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage, setCarsPerPage] = useState(3);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

  return (
    <Col md={10} className="p-5 pt-2">
      <h3>
        <FontAwesomeIcon icon={faCar} style={{ marginRight: 4 }} />
        Daftar Mobil
      </h3>
      <hr />
      <Row>
        <Col md={4}>
          <Link to="#" className="btn btn-primary mb-3">
            <FontAwesomeIcon icon={faPlusSquare} style={{ marginRight: 4 }} />
            Tambah Mobil
          </Link>
        </Col>

        <Col md={4}>
          <Form className="d-flex">
            <FontAwesomeIcon
              icon={faSearch}
              style={{ marginRight: 10, marginTop: 10 }}
              className="bg-secondary"
              style={{ fontSize: "2.3rem", padding: "8px" }}
            />
            <FormControl
              type="search"
              placeholder="Cari Mobil..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </Form>
        </Col>
        <Col md={4}></Col>
      </Row>

      <Table striped bordered className="text-center">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Tipe</th>
            <th>Harga Sewa</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {currentCars
            .filter((car) => {
              if (search == "") {
                return car;
              } else if (
                car.nama.toLowerCase().includes(search.toLowerCase())
              ) {
                return car;
              }
            })
            .map((car, index) => {
              return <CarListTable key={car.id} car={car} index={index + 1} />;
            })}
        </tbody>
      </Table>
      <Pagination
        itemsPerPage={carsPerPage}
        totalItems={cars.length}
        paginate={paginate}
      />
    </Col>
  );
}

export default CarList;
