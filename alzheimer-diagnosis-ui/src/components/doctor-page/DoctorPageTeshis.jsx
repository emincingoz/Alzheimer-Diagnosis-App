import { useRef, useState, useEffect } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import axios from "../../services/axios";
import "./styles/DoctorPageTeshis.css";

const BASE_URL = "/api/doctor/doctor-teshis";
const UPLOAD_IMAGE = BASE_URL + "/upload-image";

const DoctorPageTeshis = () => {
  const hiddenFileInput = useRef(null);
  const [mri, setMri] = useState(null);

  const handleUploadFile = () => {
    hiddenFileInput.current.click();
  };

  const handleInputFileChange = async (event) => {
    const fileUploaded = event.target.files[0];
    //setMri(fileUploaded);
    setMri(URL.createObjectURL(fileUploaded));

    const imageData = new FormData();
    imageData.append("imageFile", fileUploaded);
    imageData.append("imageName", "imagenamebu");

    if (imageData.entries().next().value[1] !== null) {
      let tokenWithoutBearer = localStorage.getItem("accToken").toString();
      let token =
        "Bearer " +
        tokenWithoutBearer.substring(1, tokenWithoutBearer.length - 1);

      let tckn = JSON.parse(localStorage.getItem("user")).tckn;

      const response = await axios.post(
        UPLOAD_IMAGE,
        imageData,
        {
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
      /*dispatch({
        type: UPLOAD_IMAGE,
        payload: response.data,
      });*/
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
        <div className="doctor-teshis-result">MRI Sonucu</div>
        <div className="doctor-teshis-upload-mr doctor-teshis-button">
          <Button className="doctor-teshis-button" onClick={handleUploadFile}>
            MRI Yükle
          </Button>
        </div>
        <div className="doctor-teshis-generate-result doctor-teshis-button">
          <Button className="doctor-teshis-button">Teşhis Oluştur</Button>
        </div>
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
