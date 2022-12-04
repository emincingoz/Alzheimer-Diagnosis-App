import { useRef, useState, useEffect } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import axios from "../../services/axios";
import "./styles/MyPatients.css";
import { tr } from "date-fns/locale";
import { hover } from "@testing-library/user-event/dist/hover";
import { useCallback } from "react";

const BASE_URL = "/api/doctor";
const GET_PATIENTS_URL = BASE_URL + "/get-allpatients";

const paginationCounts = [2, 3, 5];

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
      const response = await axios.get(GET_PATIENTS_URL, {
        headers: { "Content-Type": "application/json" },
        //headers: {},
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
          <td>{item.tckn}</td>
          <td>{handlePatientAge(item.birthDate)}</td>
          <td>{item.email}</td>
          <td>{item.phoneNumber}</td>
          <td>form</td>
          <td>mesaj</td>
        </tr>
      );
    });

    return array;
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

    paginationCounts.map((item) => {
      array.push(
        <div
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
              <th>TC-Kimlik No</th>
              <th>Yaş</th>
              <th>E-Mail</th>
              <th>Telefon</th>
              <th>Hikaye Formu</th>
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
