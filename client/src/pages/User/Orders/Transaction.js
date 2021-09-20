import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Order.css";

function Transaction() {
  const [orders, setOrders] = useState([]);
  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      let result = await axios({
        method: "GET",
        url: "http://localhost:3000/line_items/order",
        headers: {
          access_token,
        },
      });
      setOrders(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const transactionEmpty = () => {
    return (
      <div>
        <p className="text-center font-weight-bold">
          Transaksi masih kosong...
        </p>
      </div>
    );
  };

  let total_price = 0;
  return (
    <div>
      <Container>
        <h4>
          <strong>Transaksi</strong>
        </h4>
        <hr />
        {orders.length === 0 ? (
          <>{transactionEmpty()}</>
        ) : (
          <>
            <table className="small-container cart-page">
              <thead>
                <tr style={{ fontSize: 15 }}>
                  <th>Mobil</th>
                  <th style={{ width: 40 }}>Kode Transaksi</th>
                  <th>Kode Pembayaran </th>
                  <th>Alamat</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  total_price += order.total_due;
                  return (
                    <>
                      <tr style={{ fontSize: 13 }}>
                        <td>
                          <div class="cart-info">
                            <Link to={`/car/${order.LineItems[0].Car.id}`}>
                              <img
                                src={`http://localhost:3000/tmp/my-uploads/${order.LineItems[0].Car.CarsImages[0].filename}`}
                                alt="gambar mobil"
                              />
                            </Link>
                            <div>
                              <p style={{ fontSize: 14 }}>
                                {order.LineItems[0].Car.nama}
                              </p>
                              <small style={{ fontSize: 12 }}>
                                {order.total_days} hari x{" "}
                                {order.LineItems[0].Car.harga_sewa}
                                <br />
                                IDR {order.total_due.toLocaleString("en")}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>{order.order_name}</td>
                        <td>{order.payt_trx_number}</td>
                        <td>
                          {order.address} <br />
                          {order.city}
                        </td>
                        {order.status === "cancelled" ? (
                          <td style={{ color: "red" }}>Dibatalkan</td>
                        ) : order.status === "closed" ? (
                          <td style={{ color: "green" }}>Selesai</td>
                        ) : (
                          <td>{order.status}</td>
                        )}
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </Container>
    </div>
  );
}

export default Transaction;
