import React, { useState, useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const renderEditTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Edit Mobil
  </Tooltip>
);

const renderDeleteTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Hapus Mobil
  </Tooltip>
);

function CarListTable({ car, index }) {
  const { nama, type, harga_sewa } = car;

  return (
    <tr>
      <td>{index}</td>
      <td>{nama}</td>
      <td>{type}</td>
      <td>IDR {harga_sewa.toLocaleString("en")}/hari</td>
      <td className="justify-content-evenly align-items-center d-flex">
        <Link to="#" className="btn btn-primary">
          Detail
        </Link>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderEditTooltip}
        >
          <Link variant="success">
            <Link to="#">
              <FontAwesomeIcon
                icon={faEdit}
                className="bg-success text-white rounded"
                style={{
                  fontSize: "2.3rem",
                  padding: "8px",
                  hover: { opacity: "0.8" },
                }}
              />
            </Link>
          </Link>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderDeleteTooltip}
        >
          <Link variant="success">
            <Link to="#">
              <FontAwesomeIcon
                icon={faTrashAlt}
                className="bg-danger text-white rounded"
                style={{
                  fontSize: "2.3rem",
                  padding: "8px",
                  hover: { opacity: "0.8" },
                }}
              />
            </Link>
          </Link>
        </OverlayTrigger>
      </td>
    </tr>
  );
}

export default CarListTable;
