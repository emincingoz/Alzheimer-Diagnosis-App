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

const PatientPageForm = () => {
  const [list, setList] = useState([""]);
  const [currentPage, setCurrentPage] = useState(1);
  const numQuestionPerPage = 8;

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
  function handleSubmit() {}

  return (
    <div className="patient-form">
      <div className="patient-form-title">
        <h1>Hasta Hikaye Formu</h1>
      </div>
      <div className="patient-form-questions">
        {list.map((item, index) => {
          return (
            <>
              {(index < numQuestionPerPage && currentPage == 1) ||
              (index >= numQuestionPerPage && currentPage == 2) ? (
                <FormQuestion
                  key={index + 1}
                  question={item.question}
                  id={index + 1}
                  answer={item.answer}
                  list={list}
                  setAnswer={setList}
                />
              ) : (
                <></>
              )}
            </>
          );
        })}
      </div>
      <div className="patient-form-pagination-box">
        <div className="patient-form-pagination">
          <button
            className={
              currentPage === 1
                ? "active form-pagination-button"
                : "form-pagination-button"
            }
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>
          <button
            className={
              currentPage === 2
                ? "active form-pagination-button"
                : "form-pagination-button"
            }
            onClick={() => setCurrentPage(2)}
          >
            2
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientPageForm;
