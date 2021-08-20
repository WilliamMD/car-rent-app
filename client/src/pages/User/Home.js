import React from 'react';
import CarList from '../../components/Cars/CarList';
import CategoryList from '../../components/Categories/CategoryList';
import { Row } from "react-bootstrap";

function Home() {
    return (
        <Row>
            <CategoryList />
            <CarList/>
        </Row>
    )
}

export default Home;