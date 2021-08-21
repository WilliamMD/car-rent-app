import React from "react";
import CarList from "../../components/User/Cars/CarList";
import CategoryList from "../../components/User/Categories/CategoryList";
import { Row } from "react-bootstrap";

function Home() {
  return (
    <Row>
      <CategoryList />
      <CarList />
    </Row>
  );
}

export default Home;
