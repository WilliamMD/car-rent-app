import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import "./Order.css";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { CheckoutModal } from "../../../components/User";

function Cart() {
  const [carts, setCarts] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    getCarts();
  }, []);

  const history = useHistory();

  const access_token = localStorage.getItem("access_token");

  const getCarts = async () => {
    try {
      let result = await axios({
        method: "GET",
        url: "http://localhost:3000/line_items/cart",
        headers: {
          access_token,
        },
      });
      setCarts(result.data);
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
            `Mobil telah dihapus dari keranjang.`,
            "success"
          );
          history.go(0);
        }
      });
    } catch (err) {
      Swal.fire("Opps!", `${err}`, "error");
    }
  };

  const checkout = async (nama) => {
    try {
      await axios({
        method: "PUT",
        url: `http://localhost:3000/line_items/checkout`,
        data: { nama },
        headers: {
          access_token,
        },
      });
      Swal.fire(
        "Checkout Sukses!",
        `Mobil telah dimasukkan ke checkout.`,
        "success"
      );
      history.go(0);
      // history.push("/cart/checkout");
    } catch (err) {
      Swal.fire("Opps!", `${err}`, "error");
    }
  };

  // const checkoutAll = async () => {
  //   try {
  //     await axios({
  //       method: "PUT",
  //       url: `http://localhost:3000/line_items/checkout_all`,
  //       data: carts,Z
  //       headers: {
  //         access_token,
  //       },
  //     });
  //     Swal.fire(
  //       "Checkout Sukses!",
  //       `Mobil telah dimasukkan ke checkout.`,
  //       "success"
  //     );
  //     history.push("/cart/checkout");
  //   } catch (err) {
  //     Swal.fire("Opps!", `${err}`, "error");
  //   }
  // };

  const deleteHandler = async (e, nama, CartId, LineItemId) => {
    e.preventDefault();
    deleteCart(nama, CartId, LineItemId);
  };

  const checkoutHandler = async (e, nama) => {
    e.preventDefault();
    checkout(nama);
  };

  // const checkoutAllHandler = async (e, carts) => {
  //   e.preventDefault();

  //   carts.forEach((cart, i) => {
  //     checkout(cart.LineItems[i].Car.nama);
  //   });
  // };

  const cartEmpty = () => {
    return (
      <div>
        <p className="text-center font-weight-bold">
          Keranjang masih kosong...
        </p>
      </div>
    );
  };

  let total_price = 0;

  return (
    <Container expand={"sm"}>
      <h4>
        <strong>Keranjang</strong>
      </h4>
      <hr />
      {carts.length === 0 ? (
        <>
          {cartEmpty()}
          <br />
          <br />
          <div className="total-price">
            <table>
              <tr>
                <td style={{ textAlign: "right" }}>
                  <Link
                    to="#"
                    style={{ fontSize: "15px" }}
                    onClick={() => setModalShow(true)}
                  >
                    Lihat Checkout
                  </Link>
                  <CheckoutModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </td>
              </tr>
            </table>
          </div>
        </>
      ) : (
        <>
          <table className="small-container cart-page">
            <thead>
              <tr>
                <th>Mobil</th>
                <th style={{ width: 30 }}>Kode Transaksi</th>
                <th>Jumlah Hari</th>
                <th style={{ width: 150 }}>Alamat</th>
              </tr>
            </thead>
            <tbody>
              {carts.map((cart) => {
                total_price += cart.LineItems[0].Order.total_due;
                return (
                  <>
                    <tr>
                      <td>
                        <div class="cart-info">
                          <Link to={`/car/${cart.LineItems[0].Car.id}`}>
                            <img
                              src={`http://localhost:3000/tmp/my-uploads/${cart.LineItems[0].Car.CarsImages[0].filename}`}
                              alt="gambar mobil"
                            />
                          </Link>
                          <div>
                            <p>{cart.LineItems[0].Car.nama}</p>
                            <small>
                              Subtotal: IDR{" "}
                              {(
                                cart.LineItems[0].Car.harga_sewa *
                                cart.LineItems[0].Order.total_days
                              ).toLocaleString("en")}
                            </small>
                            <br />
                            <small style={{ color: "red" }}>
                              Pajak (10%): IDR +
                              {cart.LineItems[0].Order.tax.toLocaleString("en")}
                            </small>
                            <br />
                            {cart.LineItems[0].Order.tax > 0 && (
                              <small style={{ color: "green" }}>
                                Diskon (15%): IDR -
                                {cart.LineItems[0].Order.discount.toLocaleString(
                                  "en"
                                )}
                              </small>
                            )}
                            <br />
                            <small>
                              Total: IDR{" "}
                              {cart.LineItems[0].Order.total_due.toLocaleString(
                                "en"
                              )}
                            </small>
                            <br />
                            <Button
                              variant="link"
                              size="sm"
                              onClick={(e) =>
                                checkoutHandler(e, cart.LineItems[0].Car.nama)
                              }
                            >
                              Checkout
                            </Button>
                            <Button
                              variant="link"
                              size="sm"
                              onClick={(e) =>
                                deleteHandler(
                                  e,
                                  cart.LineItems[0].Car.nama,
                                  cart.LineItems[0].CartId,
                                  cart.LineItems[0].id
                                )
                              }
                            >
                              Hapus
                            </Button>
                          </div>
                        </div>
                      </td>
                      <td style={{ width: 30 }}>
                        {cart.LineItems[0].Order.order_name}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {cart.LineItems[0].Order.total_days} hari
                      </td>
                      <td style={{ width: 150 }}>
                        {cart.LineItems[0].Order.address} <br />
                        {cart.LineItems[0].Order.city}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>

          <div className="total-price text-end" style={{ fontSize: "14px" }}>
            <table>
              <tr>
                <td>Total</td>
                <td>{total_price.toLocaleString("en")}</td>
              </tr>
            </table>
          </div>

          <div className="checkout-action">
            <table>
              <tr>
                <td style={{ textAlign: "left" }}>
                  <Link
                    to="#"
                    onClick={() => setModalShow(true)}
                    style={{ fontSize: "14px" }}
                  >
                    Lihat Checkout
                  </Link>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Button
                    variant="link"
                    size="sm"
                    // onClick={(e) => checkoutAllHandler(e, carts)}
                  >
                    Checkout Semua
                  </Button>
                  <CheckoutModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </td>
              </tr>
            </table>
          </div>
        </>
      )}
    </Container>
  );
}

export default Cart;
