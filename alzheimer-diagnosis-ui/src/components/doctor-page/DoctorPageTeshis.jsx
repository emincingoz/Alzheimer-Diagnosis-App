import { useRef, useState, useEffect } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import axios from "../../services/axios";
import "./styles/DoctorPageTeshis.css";
import CircularProgress from "@mui/material/CircularProgress";

const BASE_URL = "/api/doctor/doctor-teshis";
const UPLOAD_IMAGE = BASE_URL + "/upload-image";

const DoctorPageTeshis = () => {
  const hiddenFileInput = useRef(null);
  const [mri, setMri] = useState(null);
  const [predName, setPredName] = useState("");
  const [predVal, setPredVal] = useState("");
  const [flag, setFlag] = useState(false);

  const handleUploadFile = () => {
    hiddenFileInput.current.click();
  };

  const handleInputFileChange = async (event) => {
    const fileUploaded = event.target.files[0];
    //setMri(fileUploaded);
    setMri(URL.createObjectURL(fileUploaded));

    setFlag(true);

    let tckn = JSON.parse(localStorage.getItem("user")).tckn;
    let date = new Date().toISOString();
    let formattedDate = date.replace(":", "-");
    formattedDate = formattedDate.replace(":", "-");
    formattedDate = formattedDate.replace(".", "-");

    const imageData = new FormData();
    imageData.append("imageFile", fileUploaded);
    imageData.append("imageName", tckn + "_" + formattedDate);

    if (imageData.entries().next().value[1] !== null) {
      let tokenWithoutBearer = localStorage.getItem("accToken").toString();
      let token =
        "Bearer " +
        tokenWithoutBearer.substring(1, tokenWithoutBearer.length - 1);

      let tckn = JSON.parse(localStorage.getItem("user")).tckn;

      try {
        const response = await axios.post(
          UPLOAD_IMAGE,
          imageData,
          {
            headers: { "Content-Type": "application/json" },
            headers: { Authorization: token },
            withCredentials: true,
          },
          {
            onUploadProgress: (progressEvent) => {
              console.log(
                "Uploading : " +
                  (
                    (progressEvent.loaded / progressEvent.total) *
                    100
                  ).toString() +
                  "%"
              );
            },
          }
        );
        let data = response.data;
        setPredName(response.data.data["predClassName"]);
        let value = response.data.data["predValue"].toString();
        let val = parseFloat(value) * 100;
        setPredVal(val.toPrecision(5).toString());
        setFlag(false);
      } catch (e) {}
    }
  };

  return (
    <div className="doctor-teshis">
      <div className="doctor-teshis-mr-section">
        {mri == null ? (
          <p>Bir MRI Görüntüsü Yükleyin</p>
        ) : (
          <img src={mri} alt="" />
        )}
      </div>
      <div className="doctor-teshis-right-section">
        <div className="doctor-teshis-result">
          {flag === true ? (
            <CircularProgress color="inherit" />
          ) : predName == "" ? (
            <p>MRI Sonucu</p>
          ) : (
            <p>
              Tahmin edilen sınıf %{predVal} olasılık ile {predName}.
            </p>
          )}
        </div>
        <div className="doctor-teshis-upload-mr doctor-teshis-button">
          <Button className="doctor-teshis-button" onClick={handleUploadFile}>
            MRI Yükle
          </Button>
        </div>
        {/*<div className="doctor-teshis-generate-result doctor-teshis-button">
          <Button className="doctor-teshis-button">Teşhis Oluştur</Button>
        </div>*/}
        <input
          className="buttton"
          type="file"
          name="myImage"
          accept=".png, .jpg"
          ref={hiddenFileInput}
          style={{ display: "none" }}
          onChange={handleInputFileChange}
          /*onChange={(event) => {
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
          }}*/
        />
      </div>
    </div>
  );
};

export default DoctorPageTeshis;
