import React, { useState } from "react";
import { CarList, CategoryList } from "../../components/User";
import { Row, Carousel } from "react-bootstrap";

function Home() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const searchFunction = (param) => {
    setSearch(param);
  };
  const typeFilterFunction = (param) => {
    setTypeFilter(param);
  };

  return (
    <>
      <Row>
        <CategoryList
          searchFunction={searchFunction}
          typeFilterFunction={typeFilterFunction}
        />
        <CarList search={search} typeFilter={typeFilter} />
      </Row>
    </>
  );
}

export default Home;
