import React, { useState, useEffect } from "react";
import { Row, Col, Modal, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { CardElement } from "@stripe/react-stripe-js";

function CheckoutModal({ ...props }) {
  const [checkouts, setCheckouts] = useState([]);

  useEffect(() => {
    getCheckout();
  }, []);

  const history = useHistory();

  const access_token = localStorage.getItem("access_token");

  const getCheckout = async () => {
    try {
      let result = await axios({
        method: "GET",
        url: "http://localhost:3000/line_items/cart/checkout",
        headers: {
          access_token,
        },
      });
      console.log(result.data);
      setCheckouts(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCart = async (nama, CartId, LineItemId) => {
    try {
      Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Hapus produk dari keranjang",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios({
            method: "DELETE",
            url: `http://localhost:3000/line_items/delete/${CartId}/${LineItemId}`,
            data: { nama },
            headers: {
              access_token,
            },
          });
          Swal.fire(
            "Hapus Sukses!",
            `Mobil telah dihapus dari checkout.`,
            "success"
          );
          history.go(0);
        }
      });
    } catch (err) {
      Swal.fire("Opps!", `${err}`, "error");
    }
  };

  const pay = async (nama, CartId) => {
    try {
      axios({
        method: "POST",
        url: `http://localhost:3000/line_items/cart/pay/${CartId}`,
        data: { nama },
        headers: {
          access_token,
        },
      });
      Swal.fire(
        "Pembayaran sukses!",
        `Silakan hubungi admin untuk konfirmasi pembayaran.`,
        "success"
      );
      history.go(0);
    } catch (err) {
      Swal.fire("Opps!", `${err}`, "error");
    }
  };

  let total_price = 0;

  const deleteHandler = (e, nama, CartId, LineItemId) => {
    e.preventDefault();
    deleteCart(nama, CartId, LineItemId);
  };

  const payHandler = (e, nama, CartId) => {
    e.preventDefault();
    pay(nama, CartId);
  };

  const checkoutEmpty = () => {
    return (
      <div>
        <p className="text-center font-weight-bold">Checkout masih kosong...</p>
      </div>
    );
  };

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      size={"sm"}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>Checkout</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {checkouts.length === 0
          ? checkoutEmpty()
          : checkouts.map((checkout, index) => {
              total_price += checkout.LineItems[0].Order.total_due;

              const tempdeConverted = checkout.LineItems[0].Order.order_name
                .slice()
                .split("-");
              const deConverted = tempdeConverted[2];

              return (
                <>
                  <div style={{ marginBottom: 10 }}>
                    <Row>
                      <Col md={5}>
                        <div
                          className="text-start"
                          style={{ fontSize: "17px" }}
                        >
                          <span>{deConverted}</span>
                          <br />
                          <small className="text-secondary">
                            {checkout.LineItems[0].Order.total_days} hari
                          </small>
                        </div>
                      </Col>
                      <Col md={7}>
                        <div className="text-end">
                          <small style={{ fontSize: "12px" }}>
                            IDR{" "}
                            {checkout.LineItems[0].Order.total_due.toLocaleString(
                              "en"
                            )}
                          </small>
                          <br />
                          <div className="text-end">
                            <Button
                              style={{ fontSize: "12px" }}
                              variant="link"
                              size="sm"
                              onClick={(e) =>
                                payHandler(
                                  e,
                                  checkout.LineItems[0].Car.nama,
                                  checkout.LineItems[0].CartId
                                )
                              }
                            >
                              Bayar
                            </Button>
                            <Button
                              style={{ fontSize: "12px" }}
                              variant="link"
                              size="sm"
                              onClick={(e) =>
                                deleteHandler(
                                  e,
                                  checkout.LineItems[0].Car.nama,
                                  checkout.LineItems[0].CartId,
                                  checkout.LineItems[0].id
                                )
                              }
                            >
                              Hapus
                            </Button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </>
              );
            })}

        <p
          style={{
            fontSize: "13px",
          }}
          className="text-end"
        >
          Total: IDR {total_price.toLocaleString("en")}
        </p>
        {/* <div
          style={{
            fontSize: "12px",
            borderTopStyle: "solid",
            borderColor: "#22668a",
          }}
          className="text-end"
        >
          <Button
            style={{ marginTop: 10 }}
            size={"sm"}
            onClick={(e) =>
              payHandler(
                e,
                checkout.LineItems[0].Car.nama,
                checkout.LineItems[0].CartId
              )
            }
          >
            Bayar
          </Button>
        </div> */}
      </Modal.Body>
    </Modal>
  );
}

export default CheckoutModal;
