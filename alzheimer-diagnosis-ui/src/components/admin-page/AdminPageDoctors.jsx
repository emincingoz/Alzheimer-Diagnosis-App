import { useRef, useState, useEffect } from "react";
import { Button, TextField, Snackbar, Alert, IconButton } from "@mui/material";
import axios from "../../services/axios";
import "./styles/AdminPagePatients.css";
import { tr } from "date-fns/locale";
import { hover } from "@testing-library/user-event/dist/hover";
import { useCallback } from "react";
import formIcon from "../../assets/images/form-icon.png";
import messageBubbleIcon from "../../assets/images/message-bubble-icon.png";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import CustomUpdateModal from "../CustomUpdateModal";

const BASE_URL = "/api/admin";
const GET_DOCTORS_URL = BASE_URL + "/get-alldoctors";

const paginationCounts = [5, 8, 10];

const AdminPageDoctors = () => {
  const [allDoctors, setallDoctors] = useState([]);
  const [numPages, setNumPages] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [numDoctorsPerPage, setnumDoctorsPerPage] = useState(
    paginationCounts[1]
  );

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getMyAllDoctors();
  }, []);

  useEffect(() => {
    setNumPages(Math.ceil(allDoctors.length / numDoctorsPerPage));
  }, [allDoctors]);

  useEffect(() => {
    let pageCount = Math.ceil(allDoctors.length / numDoctorsPerPage);
    setNumPages(pageCount);

    if (currPage > pageCount) {
      setCurrPage(1);
    }
  }, [numDoctorsPerPage]);

  const getMyAllDoctors = async (e) => {
    try {
      let tokenWithoutBearer = localStorage.getItem("accToken").toString();
      let token =
        "Bearer " +
        tokenWithoutBearer.substring(1, tokenWithoutBearer.length - 1);

      const response = await axios.get(GET_DOCTORS_URL, {
        headers: { "Content-Type": "application/json" },
        headers: { Authorization: token },
        withCredentials: true,
      });

      setallDoctors(response.data.data);
    } catch (e) {}
  };

  const handleDoctorAge = (birthTime) => {
    const birthDate = new Date(birthTime);
    const difference = Date.now() - birthDate.getTime();
    const age = new Date(difference);
    const realAge = Math.abs(age.getUTCFullYear() - 1970);
    return realAge;
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const HandlePaginationButtons = () => {
    var array = [];

    for (let i = 1; i <= numPages; i++) {
      array.push(
        <button
          style={
            i === currPage
              ? { backgroundColor: "#ccc", pointerEvents: "none" }
              : {}
          }
          key={i}
          className="admin-mypatients-pagination-button"
          onClick={() => setCurrPage(i)}
        >
          {i}
        </button>
      );
    }

    return <div style={{ width: "33%", textAlign: "center" }}>{array}</div>;
  };

  const handleDoctorUpdate = () => {};

  const RenderPatients = () => {
    const lastItemIndex = currPage * numDoctorsPerPage;
    const firsItemIndex = lastItemIndex - numDoctorsPerPage;
    const items = allDoctors.slice(firsItemIndex, lastItemIndex);

    var array = [];

    items.forEach((item, index) => {
      array.push(
        <tr key={index}>
          <td>
            {capitalizeFirstLetter(item.firstName) +
              " " +
              capitalizeFirstLetter(item.lastName)}
          </td>
          <td className="admin-mypatients-small-screen-hide">{item.tckn}</td>
          <td className="admin-mypatients-small-screen-hide">
            {handleDoctorAge(item.birthDate)}
          </td>
          <td className="admin-mypatients-medium-screen-hide admin-mypatients-small-screen-hide">
            {item.email}
          </td>
          <td className="admin-mypatients-medium-screen-hide admin-mypatients-small-screen-hide">
            {item.phoneNumber}
          </td>
          <td className="admin-doctor-update-td">
            <div className="admin-doctor-update-button">
              <Button onClick={handleShow}>Güncelle</Button>
              <CustomUpdateModal
                handleClose={handleClose}
                handleShow={handleShow}
                show={show}
                email={item.email}
                phoneNumber={item.phoneNumber}
                tckn={item.tckn}
              />
            </div>
          </td>
        </tr>
      );
    });

    return array;
  };

  const RenderCurrentShowedPatientsInfo = () => {
    return (
      <div style={{ width: "33%" }}>
        <span style={{ fontWeight: "bold" }}>{allDoctors.length}</span>{" "}
        {" hastadan "}{" "}
        <span style={{ fontWeight: "bold" }}>
          {currPage * numDoctorsPerPage - numDoctorsPerPage + 1}
        </span>
        {"-"}
        {""}
        <span style={{ fontWeight: "bold" }}>
          {currPage * numDoctorsPerPage}
        </span>{" "}
        {" arası gösteriliyor"}
      </div>
    );
  };

  const RenderPaginationCounts = () => {
    let array = [];

    paginationCounts.map((item, index) => {
      array.push(
        <div
          key={index}
          className={`admin-mypatients-pagination-counts ${
            numDoctorsPerPage === item ? "active-pagination-count" : ""
          }`}
          onClick={() => changenumDoctorsPerPage(item)}
        >
          {item}
        </div>
      );
    });

    return (
      <div
        style={{
          width: "33%",
          display: "flex",
          justifyContent: "end",
          paddingRight: "2%",
        }}
      >
        <div className="admin-mypatients-counts-box">{array}</div>
      </div>
    );
  };

  const changenumDoctorsPerPage = (count) => {
    setnumDoctorsPerPage(count);
  };

  return (
    <div className="admin-mypatients">
      <div className="admin-mypatients-table-div">
        <table className="admin-mypatients-table">
          <thead>
            <tr>
              <th>Ad Soyad</th>
              <th className="admin-mypatients-small-screen-hide">
                TC-Kimlik No
              </th>
              <th className="admin-mypatients-small-screen-hide">Yaş</th>
              <th className="admin-mypatients-medium-screen-hide admin-mypatients-small-screen-hide">
                E-Mail
              </th>
              <th className="admin-mypatients-medium-screen-hide admin-mypatients-small-screen-hide">
                Telefon
              </th>
              <th>Güncelle</th>
            </tr>
          </thead>
          <tbody>
            <RenderPatients />
          </tbody>
          <tfoot>
            <tr style={{ backgroundColor: "#9b9999", border: "none" }}>
              <td colSpan={7} style={{ border: "none" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <RenderCurrentShowedPatientsInfo />

                  <HandlePaginationButtons />

                  <RenderPaginationCounts />
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default AdminPageDoctors;
