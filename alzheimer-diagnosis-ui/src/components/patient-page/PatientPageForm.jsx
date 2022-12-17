import { useRef, useState, useEffect } from "react";
import {
  Button,
  TextField,
  Snackbar,
  Alert,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import "./styles/PatientPageForm.css";
import FormQuestion from "./FormQuestion";
import axios from "../../services/axios";

const BASE_URL = "/api/user-form-question";
const USER_FORM_URL = BASE_URL + "/get-all-questions";
const SUBMIT_FORM_URL = BASE_URL + "/submit-form";

const PatientPageForm = () => {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [numPages, setNumPages] = useState(0);
  const [numQuestionPerPage, setNumQuestionPerPage] = useState(8);

  const [checked, setChecked] = useState(false);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setNumPages(Math.ceil(list.length / numQuestionPerPage));

    let flag = true;

    for (let i = 0; i < list.length; i++) {
      if (list[i].answer === null) flag = false;
    }
    if (flag) setFlag(true);
    else setFlag(false);
  }, [list]);

  useEffect(() => {
    let pageCount = Math.ceil(list.length / numQuestionPerPage);
    setNumPages(pageCount);

    if (currentPage > pageCount) {
      setCurrentPage(1);
    }
  }, [numQuestionPerPage]);

  useEffect(() => {
    getUserFormQuestions();
  }, []);

  const getUserFormQuestions = async (e) => {
    try {
      const response = await axios.get(USER_FORM_URL, {
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
      });

      setList(response.data.data);
    } catch (e) {
      console.log("olmadı be");
    }
  };

  // TODO:: get all answer and send to database
  // TODO:: Check answer there is any null answer
  async function handleSendFormAnswers() {
    try {
      let tokenWithoutBearer = localStorage.getItem("accToken").toString();
      let token =
        "Bearer " +
        tokenWithoutBearer.substring(1, tokenWithoutBearer.length - 1);

      let tckn = JSON.parse(localStorage.getItem("user")).tckn;
      console.log("tckn: " + tckn);

      console.log("fgfhgf: " + JSON.stringify(list));
      console.log("fgfhgf: " + JSON.stringify({ hello: list }));

      const response = await axios.post(
        SUBMIT_FORM_URL + "/" + tckn,
        JSON.stringify(list),
        {
          headers: { "Content-Type": "application/json" },
          //headers: { Authorization: token },
          withCredentials: false,
        }
      );
    } catch (e) {
      console.log("error: " + e.toString());
    }
  }

  const HandlePaginationButtons = () => {
    var array = [];

    for (let i = 1; i <= numPages; i++) {
      array.push(
        <button
          style={
            i === currentPage
              ? { backgroundColor: "#ccc", pointerEvents: "none" }
              : {}
          }
          key={i}
          className="doctor-mypatients-pagination-button"
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }

    return <div style={{ width: "33%", textAlign: "center" }}>{array}</div>;
  };

  const RenderFormQuestions = () => {
    const lastItemIndex = currentPage * numQuestionPerPage;
    const firsItemIndex = lastItemIndex - numQuestionPerPage;
    const items = list.slice(firsItemIndex, lastItemIndex);

    var array = [];

    items.forEach((item, index) => {
      array.push(
        <FormQuestion
          key={index + 1}
          question={item.question}
          id={firsItemIndex + index + 1}
          answer={item.answer}
          list={list}
          setAnswer={setList}
          setFlag={setFlag}
        />
      );
    });

    return array;
  };

  return (
    <div className="patient-form">
      <div className="patient-form-title">
        <h1>Hasta Hikaye Formu</h1>
      </div>
      <div className="patient-form-questions">
        <RenderFormQuestions />
      </div>
      <div className="patient-form-pagination-box">
        <HandlePaginationButtons />
      </div>
      {currentPage === numPages ? (
        <div className="patient-form-footer">
          <div className="kvkk-checkbox" style={{ display: "flex" }}>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
            ></input>
            <p
              style={{
                fontSize: "14px",
                paddingLeft: "5px",
                display: "flex",
                alignItems: "center",
              }}
            >
              KVKK...
            </p>
          </div>
          <div className="patient-form-send-button">
            <Button
              disabled={!flag || !checked}
              style={
                !flag || !checked
                  ? { backgroundColor: "#d9d9d9", color: "black" }
                  : {}
              }
              onClick={handleSendFormAnswers}
            >
              Gönder
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PatientPageForm;
