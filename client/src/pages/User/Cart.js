import React from 'react'
import { Row } from "react-bootstrap";
import CartForm from '../../components/Carts/CartForm';
import CartDetail from '../../components/Carts/CartDetail';

function Cart() {
    return (
        <div>
            <Row>
                <CartForm/>
                <CartDetail/>
            </Row>
        </div>
    )
}

export default Cart
