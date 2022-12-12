import { useRef, useState, useEffect } from "react";
import { Button, TextField, Snackbar, Alert, IconButton } from "@mui/material";
import axios from "../../services/axios";
import "./styles/MyPatients.css";
import { tr } from "date-fns/locale";
import { hover } from "@testing-library/user-event/dist/hover";
import { useCallback } from "react";
import formIcon from "../../assets/images/form-icon.png";
import messageBubbleIcon from "../../assets/images/message-bubble-icon.png";

const BASE_URL = "/api/doctor";
const GET_PATIENTS_URL = BASE_URL + "/get-allpatients";

const paginationCounts = [5, 8, 10];

const MyPatients = () => {
  const [allPatients, setAllPatients] = useState([]);
  const [numPages, setNumPages] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [numPatientsPerPage, setNumPatientsPerPage] = useState(
    paginationCounts[1]
  );

  useEffect(() => {
    getMyAllPatients();
  }, []);

  useEffect(() => {
    setNumPages(Math.ceil(allPatients.length / numPatientsPerPage));
  }, [allPatients]);

  useEffect(() => {
    let pageCount = Math.ceil(allPatients.length / numPatientsPerPage);
    setNumPages(pageCount);

    if (currPage > pageCount) {
      setCurrPage(1);
    }
  }, [numPatientsPerPage]);

  const getMyAllPatients = async (e) => {
    try {
      let tokenWithoutBearer = localStorage.getItem("accToken").toString();
      let token =
        "Bearer " +
        tokenWithoutBearer.substring(1, tokenWithoutBearer.length - 1);

      const response = await axios.get(GET_PATIENTS_URL, {
        headers: { "Content-Type": "application/json" },
        headers: { Authorization: token },
        withCredentials: true,
      });

      setAllPatients(response.data.data);
    } catch (e) {}
  };

  const handlePatientAge = (birthTime) => {
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
          className="doctor-mypatients-pagination-button"
          onClick={() => setCurrPage(i)}
        >
          {i}
        </button>
      );
    }

    return <div style={{ width: "33%", textAlign: "center" }}>{array}</div>;
  };

  const RenderPatients = () => {
    const lastItemIndex = currPage * numPatientsPerPage;
    const firsItemIndex = lastItemIndex - numPatientsPerPage;
    const items = allPatients.slice(firsItemIndex, lastItemIndex);

    var array = [];

    items.forEach((item, index) => {
      array.push(
        <tr key={index}>
          <td>
            {capitalizeFirstLetter(item.firstName) +
              " " +
              capitalizeFirstLetter(item.lastName)}
          </td>
          <td className="doctor-mypatients-small-screen-hide">{item.tckn}</td>
          <td className="doctor-mypatients-small-screen-hide">
            {handlePatientAge(item.birthDate)}
          </td>
          <td className="doctor-mypatients-medium-screen-hide doctor-mypatients-small-screen-hide">
            {item.email}
          </td>
          <td className="doctor-mypatients-medium-screen-hide doctor-mypatients-small-screen-hide">
            {item.phoneNumber}
          </td>
          <td>
            <img
              className="doctor-mypatients-form-icon"
              src={formIcon}
              alt="form-icon"
              onClick={() => handleShowForm(item)}
            />
          </td>
          <td>
            <img
              className="doctor-mypatients-message-icon"
              src={messageBubbleIcon}
              alt="message bubble"
              onClick={() => handleChangeMessageScreen(item)}
            />
          </td>
        </tr>
      );
    });

    return array;
  };

  // TODO:: Show patinets' form
  const handleShowForm = (patient) => {
    console.log("asdas");
    return <div>hello</div>;
  };

  // TODO:: Show message page with selected patient
  const handleChangeMessageScreen = (patient) => {
    console.log("aasdas");
    return <div>hello all</div>;
  };

  const RenderCurrentShowedPatientsInfo = () => {
    return (
      <div style={{ width: "33%" }}>
        <span style={{ fontWeight: "bold" }}>{allPatients.length}</span>{" "}
        {" hastadan "}{" "}
        <span style={{ fontWeight: "bold" }}>
          {currPage * numPatientsPerPage - numPatientsPerPage + 1}
        </span>
        {"-"}
        {""}
        <span style={{ fontWeight: "bold" }}>
          {currPage * numPatientsPerPage}
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
          className={`doctor-mypatients-pagination-counts ${
            numPatientsPerPage === item ? "active-pagination-count" : ""
          }`}
          onClick={() => changeNumPatientsPerPage(item)}
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
        <div className="doctor-mypatients-counts-box">{array}</div>
      </div>
    );
  };

  const changeNumPatientsPerPage = (count) => {
    setNumPatientsPerPage(count);
  };

  return (
    <div className="doctor-mypatients">
      <div className="doctor-mypatients-table-div">
        <table className="doctor-mypatients-table">
          <thead>
            <tr>
              <th>Ad Soyad</th>
              <th className="doctor-mypatients-small-screen-hide">
                TC-Kimlik No
              </th>
              <th className="doctor-mypatients-small-screen-hide">Yaş</th>
              <th className="doctor-mypatients-medium-screen-hide doctor-mypatients-small-screen-hide">
                E-Mail
              </th>
              <th className="doctor-mypatients-medium-screen-hide doctor-mypatients-small-screen-hide">
                Telefon
              </th>
              <th>Form</th>
              <th>Mesaj</th>
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

export default MyPatients;
