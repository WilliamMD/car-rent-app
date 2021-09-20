import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row, Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

function TransactionSuccess() {
  const [ordersDone, setOrdersDone] = useState([]);
  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    getOrdersDone();
  }, []);

  const history = useHistory();
  const getOrdersDone = async () => {
    try {
      let result = await axios({
        method: "GET",
        url: "http://localhost:3000/line_items/admin/order/done",
        headers: {
          access_token,
        },
      });
      setOrdersDone(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Col md={10} className="p-5 pt-2">
      <h3>
        <FontAwesomeIcon icon={faClipboardCheck} style={{ marginRight: 4 }} />
        Daftar Transaksi Sukses
      </h3>
      <hr />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ color: "black", textAlign: "center" }}>
              Tanggal Pemesanan
            </th>
            <th style={{ color: "black", textAlign: "center" }}>
              Harga Pesanan
            </th>
            <th style={{ color: "black", textAlign: "center" }}>
              Kode Pembayaran
            </th>
            <th style={{ color: "black", textAlign: "center" }}>Alamat</th>
            <th style={{ color: "black", textAlign: "center" }}>Status</th>
            <th style={{ color: "black", textAlign: "center" }}>
              Nama Pembeli
            </th>
          </tr>
        </thead>
        <tbody>
          {ordersDone.map((orderDone) => {
            const tempDate = orderDone.createdAt.slice("").split("T");
            const date = tempDate[0];
            return (
              <>
                <tr style={{ color: "black", textAlign: "center" }}>
                  <td>{date}</td>
                  <td>IDR {orderDone.total_due.toLocaleString("en")}</td>
                  <td>{orderDone.payt_trx_number}</td>
                  <td>
                    {orderDone.address} {orderDone.city}
                  </td>
                  <td>{orderDone.status}</td>
                  <td>{orderDone.User.name}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </Col>
  );
}

export default TransactionSuccess;
