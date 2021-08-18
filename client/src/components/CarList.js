import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import Cars from './Cars';

export default class CarList extends Component {
    render() {
        return (
            <Col md={11} mt="2">
                <h4><strong>Daftar Mobil</strong></h4>
                <hr/>
                <Row>
                    <Cars/>
                    <Cars/>
                    <Cars/>
                    <Cars/>
                    <Cars/>
                    <Cars/>
                    <Cars/>
                    <Cars/>
                    <Cars/>
                </Row>
            </Col>
        )
    }
}