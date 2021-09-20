import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Type } from "react-bootstrap-table2-editor";

const { SearchBar } = Search;

const defaultSorted = [
  {
    dataField: "createdAt",
    order: "ASC",
  },
];

const CarListTable = (props) => {
  const columns = [
    {
      dataField: "createdAt",
      text: "Tanggal Ditambahkan",
      headerAlign: "center",
      align: "center",
      sort: true,
      headerStyle: { color: "black" },
      formatter: (cell) => {
        let dateObj = cell;
        if (typeof cell !== "object") {
          dateObj = new Date(cell);
        }
        return `${("0" + dateObj.getUTCDate()).slice(-2)}/${(
          "0" +
          (dateObj.getUTCMonth() + 1)
        ).slice(-2)}/${dateObj.getUTCFullYear()}`;
      },
      editor: {
        type: Type.DATE,
      },
    },
    {
      dataField: "nama",
      text: "Nama",
      sort: true,
      headerStyle: { color: "black" },
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "type",
      text: "Tipe",
      sort: true,
      headerAlign: "center",
      align: "center",
      headerStyle: () => {
        return { width: "15%", color: "black" };
      },
    },
    {
      dataField: "harga_sewa",
      text: "Harga Sewa",
      sort: true,
      headerStyle: () => {
        return { width: "15%", color: "black" };
      },
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "link",
      text: "Aksi",
      headerAlign: "center",
      align: "center",
      headerStyle: { color: "black" },
      formatter: (rowContent, row) => {
        return (
          <div>
            <Link to={`/car/${row.id}`}>
              <Button
                variant="dark"
                style={{ fontSize: "13px", marginRight: "4px" }}
              >
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FontAwesomeIcon icon={faInfo} />
                  &nbsp;Lihat
                </motion.div>
              </Button>
            </Link>

            <Link to={`/car/${row.id}/edit`}>
              <Button
                variant="dark"
                style={{ fontSize: "13px", marginRight: "4px" }}
              >
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FontAwesomeIcon icon={faEdit} />
                  &nbsp;Edit
                </motion.div>
              </Button>
            </Link>

            <Button
              variant="dark"
              style={{ fontSize: "13px", marginRight: "4px" }}
              onClick={() => deleteProductHandler(row.id)}
            >
              <motion.div
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.9 }}
              >
                <FontAwesomeIcon icon={faTrash} />
                &nbsp;Hapus
              </motion.div>
            </Button>
          </div>
        );
      },
    },
  ];
  const history = useHistory();

  const deleteProductHandler = (id) => {
    try {
      const access_token = localStorage.getItem("access_token");
      Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Hapus produk secara permanen",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios({
            method: "DELETE",
            url: `http://localhost:3000/cars/delete/${id}`,
            headers: {
              access_token,
            },
          });
          Swal.fire("Delete Success!", `Mobil telah dihapus.`, "success");
          history.go(0);
        }
      });
    } catch (err) {
      Swal.fire("Opps!", `${err}`, "error");
    }
  };

  return (
    <>
      <ToolkitProvider
        bootstrap4
        keyField="id"
        data={props.cars}
        columns={columns}
        defaultSorted={defaultSorted}
        search
      >
        {(props) => (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 5,
              }}
            >
              <SearchBar {...props.searchProps} placeholder="Cari mobil..." />
            </div>
            <div>
              <BootstrapTable
                {...props.baseProps}
                pagination={paginationFactory()}
              />
            </div>
          </div>
        )}
      </ToolkitProvider>
    </>
  );
};

export default CarListTable;
