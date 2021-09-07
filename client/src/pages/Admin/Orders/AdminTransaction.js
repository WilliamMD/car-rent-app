import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Col, Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

function AdminTransaction() {
  const [orders, setOrders] = useState([]);
  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    getOrders();
  }, []);

  const history = useHistory();
  const getOrders = async () => {
    try {
      let result = await axios({
        method: "GET",
        url: "http://localhost:3000/line_items/admin/order",
        headers: {
          access_token,
        },
      });
      setOrders(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (status, order_name) => {
    try {
      await axios({
        method: "PUT",
        url: `http://localhost:3000/line_items/admin/status`,
        data: { order_name, status },
        headers: {
          access_token,
        },
      });
      Swal.fire(
        "Update Status Sukses!",
        `Status Pesanan telah diganti.`,
        "success"
      );
      history.go(0);
    } catch (err) {
      Swal.fire("Opps!", `${err}`, "error");
    }
  };

  const updateStatusHandler = async (e, status, order_name) => {
    e.preventDefault();
    updateStatus(status, order_name);
  };

  return (
    <Col md={10} className="p-5 pt-2">
      <h3>
        <FontAwesomeIcon icon={faClipboardList} style={{ marginRight: 4 }} />
        Daftar Transaksi
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
            <th style={{ color: "black", textAlign: "center" }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const tempDate = order.createdAt.slice("").split("T");
            const date = tempDate[0];
            return (
              <>
                <tr style={{ color: "black", textAlign: "center" }}>
                  <td>{date}</td>
                  <td>IDR {order.total_due.toLocaleString("en")}</td>
                  <td>{order.payt_trx_number}</td>
                  <td>
                    {order.address} {order.city}
                  </td>
                  <td>{order.status}</td>
                  <td>{order.User.name}</td>
                  <td>
                    {order.status === "open" ? (
                      <>
                        <Button
                          variant="dark"
                          style={{
                            fontSize: "13px",
                            marginRight: 10,
                            marginBottom: 15,
                          }}
                          onClick={(e) =>
                            updateStatusHandler(e, "paid", order.order_name)
                          }
                        >
                          <motion.div
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            &nbsp;Konfirmasi Pembayaran
                          </motion.div>
                        </Button>
                        <Button
                          variant="dark"
                          style={{
                            fontSize: "13px",
                            marginRight: 10,
                            marginBottom: 15,
                          }}
                          onClick={(e) =>
                            updateStatusHandler(
                              e,
                              "cancelled",
                              order.order_name
                            )
                          }
                        >
                          <motion.div
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            &nbsp;Batalkan Pesanan
                          </motion.div>
                        </Button>
                      </>
                    ) : order.status === "paid" ? (
                      <>
                        <Button
                          variant="dark"
                          style={{
                            fontSize: "13px",
                            marginRight: 10,
                            marginBottom: 15,
                          }}
                          onClick={(e) =>
                            updateStatusHandler(e, "rent", order.order_name)
                          }
                        >
                          <motion.div
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            &nbsp;Konfirmasi Rental
                          </motion.div>
                        </Button>
                        <Button
                          variant="dark"
                          style={{
                            fontSize: "13px",
                            marginRight: 10,
                            marginBottom: 15,
                          }}
                          onClick={(e) =>
                            updateStatusHandler(
                              e,
                              "cancelled",
                              order.order_name
                            )
                          }
                        >
                          <motion.div
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            &nbsp;Batalkan Pesanan
                          </motion.div>
                        </Button>
                      </>
                    ) : order.status === "rent" ? (
                      <>
                        <Button
                          variant="dark"
                          style={{
                            fontSize: "13px",
                            marginRight: 10,
                            marginBottom: 15,
                          }}
                          onClick={(e) =>
                            updateStatusHandler(e, "closed", order.order_name)
                          }
                        >
                          <motion.div
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            &nbsp;Selesaikan
                          </motion.div>
                        </Button>
                        <Button
                          variant="dark"
                          style={{
                            fontSize: "13px",
                            marginRight: 10,
                            marginBottom: 15,
                          }}
                          onClick={(e) =>
                            updateStatusHandler(
                              e,
                              "cancelled",
                              order.order_name
                            )
                          }
                        >
                          <motion.div
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            &nbsp;Batalkan Pesanan
                          </motion.div>
                        </Button>
                      </>
                    ) : order.status === "closed" ? (
                      <span style={{ color: "green" }}>Pesanan Selesai</span>
                    ) : order.status === "cancelled" ? (
                      <span style={{ color: "red" }}>Pesanan Dibatalkan</span>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </Col>
  );
}

export default AdminTransaction;
