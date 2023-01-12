import { useRef, useState, useEffect } from "react";
//import useAuth from "../../hooks/useAuth";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import CustomTextField from "./custom/CustomTextField";
import axios from "../../services/axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { HttpStatusCode } from "axios";
import "./styles/Login.css";
import PersonIcon from "@mui/icons-material/Person";
import InputAdornment from "@mui/material/InputAdornment";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailIcon from "@mui/icons-material/Email";
import useAuth from "../../hooks/useAuth";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

const BASE_URL = "/api/auth";
const LOGIN_URL = BASE_URL + "/login";
const BASE_URL2 = "/api/user";
const FORGOT_PASSWORD_URL = BASE_URL2 + "/forgotPassword";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,24}$/;
const TCNO_REGEX = /^[1-9]{1}[0-9]{9}[02468]{1}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const Login2 = (/*{ setLoggedIn, setAccToken, accToken }*/) => {
  // Tc No
  const [tckn, setTckn] = useState("");
  const [validTckn, setValidTckn] = useState(false);
  const [tcknFocus, setTcknFocus] = useState(false);

  const [tcno, setTcno] = useState("");
  const [tcnoFocus, setTcnoFocus] = useState(false);
  const [email, setEmail] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [dialog, setDialog] = useState(false);

  const { setAuth } = useAuth();

  // Password
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
    status: "error",
  });

  const { vertical, horizontal, open } = snackbar;

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, vertical: "top", horizontal: "center" });
  };

  const handleLoginButton = async (e) => {
    /*console.log(password);
    console.log(tckn);

    const resultTckn = TCNO_REGEX.test(tckn);
    const resultPassword = PWD_REGEX.test(password);

    console.log(resultTckn);
    console.log(resultPassword);

    if (!(resultPassword && resultTckn)) {
      setSnackbar({
        open: true,
        vertical: "top",
        horizontal: "right",
        message: "Kullanıcı Bilgileri Hatalı. Tekrar Giriniz.",
        status: "error",
      });
      return;
    }*/

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          password: password,
          tckn: tckn,
        }),
        {
          headers: { "Content-Type": "application/json" },
          //headers: {},
          withCredentials: true,
        }
      );

      /*console.log(JSON.stringify(response?.data));
      console.log(JSON.stringify(response));*/

      const token = response?.data?.data.token;
      const roles = response?.data?.data.roles;

      //setAccToken(token);
      //setLoggedIn(true);

      localStorage.setItem("accToken", JSON.stringify(token));
      localStorage.setItem("roles", JSON.stringify(roles));

      /*console.log(token);
      console.log(roles);

      console.log("tckn: ", tckn);
      console.log("pass: ", password);
      console.log("roles: ", roles);
      console.log("token: ", token);*/

      let userInfo = { tckn: tckn, roles: roles };
      localStorage.setItem("user", JSON.stringify(userInfo));

      setAuth({ tckn, password, roles, token });

      // Navigate to home page if login is successfull
      //navigate(from, { replace: true });
      navigate("/");
    } catch (e) {
      if (e.response?.status === 409) {
        setSnackbar({
          open: true,
          vertical: "top",
          horizontal: "right",
          message: "Kullanıcı zaten kayıtlı",
          status: "error",
        });
      } else {
        setSnackbar({
          open: true,
          vertical: "top",
          horizontal: "right",
          message: "Kullanıcı Bilgileri Hatalı. Tekrar Giriniz.",
          status: "error",
        });
      }
    }
  };

  const handleSignUpButton = () => {
    navigate("/register");
  };

  const handleDialogOpen = () => {
    setDialog(true);
  };

  const handleDialogClose = () => {
    setDialog(false);
  };
  const HandleSendEmailButton = async (e) => {
    /*const resultTcno = TCNO_REGEX.test(tcno);
    const resultEmail = EMAIL_REGEX.test(email);

    if (!(resultTcno && resultEmail)) {
      setSnackbar({
        open: true,
        vertical: "top",
        horizontal: "right",
        message: "Kullanıcı Bilgileri Hatalı. Tekrar Deneyiniz.",
        status: "error",
      });
      return;
    }*/
    try {
      const response = await axios.post(
        FORGOT_PASSWORD_URL,
        JSON.stringify({
          tcno: tcno,
          email: email,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setSnackbar({
        open: true,
        vertical: "top",
        horizontal: "right",
        message:
          "Şifre sıfırlama maili gönderildi, maillerinizi kontrol ediniz.",
        status: "success",
      });
    } catch (e) {
      setSnackbar({
        open: true,
        vertical: "top",
        horizontal: "right",
        message: "Kullanıcı Bilgileri Hatalı. Tekrar Deneyiniz.",
        status: "error",
      });
    }
    handleDialogClose();
  };

  return (
    <div className="login-page">
      <section className="login-section">
        <div>
          <h1 className="login-h1">Giriş Yap</h1>
        </div>

        <TextField
          placeholder="TC-Kimlik No"
          className="textField"
          id="tckn"
          //label="TC-Kimlik No"
          margin="normal"
          variant="outlined"
          type="text"
          autoComplete="off"
          size="small"
          inputProps={{ style: { fontSize: 14 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 14 } }} // font size of input label
          onChange={(e) => setTckn(e.target.value)}
          required
          onFocus={() => setTcknFocus(true)}
          onBlur={() => setTcknFocus(false)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          placeholder="Şifre"
          className="textField"
          id="pass"
          //label="TC-Kimlik No"
          margin="normal"
          variant="outlined"
          type="password"
          autoComplete="off"
          size="small"
          inputProps={{ style: { fontSize: 14 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 14 } }} // font size of input label
          onChange={(e) => setPassword(e.target.value)}
          required
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        <div>
          <p className="forgot-password">
            <Link onClick={handleDialogOpen}>Şifremi unuttum</Link>
          </p>
        </div>
        <br></br>
        <div className="buttons">
          <Button
            style={{
              borderRadius: "25px",
              //fontWeight: "bold",
              marginBottom: "10px",
              marginTop: "20px",
              marginRight: "30px",
              backgroundColor: "#d9d9d9",
              color: "black",
            }}
            className="signUpButton"
            disabled={tckn === "" || password === "" ? true : false}
            variant="outlined"
            onClick={handleLoginButton}
          >
            Giriş Yap
          </Button>

          <Button
            style={{
              borderRadius: "25px",
              fontWeight: "bold",
              marginBottom: "10px",
              marginTop: "20px",
              marginLeft: "30px",
              backgroundColor: "#385e8e",
              color: "#d2d9df",
            }}
            className="signUpButton"
            variant="outlined"
            onClick={handleSignUpButton}
          >
            Kayıt Ol
          </Button>
        </div>

        {/*<p style={{ fontSize: 13 }}>
          Hesabınız yoksa <Link to="/register">kayıt</Link> olabilirsiniz.
        </p>*/}
      </section>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.status}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Dialog open={dialog} onClose={handleDialogClose}>
        <DialogTitle align="center">Şifre Yenileme</DialogTitle>
        <TextField
          placeholder="TC Kimlik No"
          className="textField"
          id="tcno"
          margin="normal"
          style={{ marginLeft: "15px", marginRight: "15px" }}
          variant="outlined"
          type="text"
          autoComplete="off"
          size="small"
          inputProps={{ style: { fontSize: 14 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 14 } }} // font size of input label
          onChange={(e) => setTcno(e.target.value)}
          required
          onFocus={() => setTcnoFocus(true)}
          onBlur={() => setTcnoFocus(false)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          placeholder="E-mail"
          className="textField"
          id="email"
          margin="normal"
          style={{ marginLeft: "15px", marginRight: "15px" }}
          variant="outlined"
          type="text"
          autoComplete="off"
          size="small"
          inputProps={{ style: { fontSize: 14 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 14 } }} // font size of input label
          onChange={(e) => setEmail(e.target.value)}
          required
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <div className="buttons">
          <Button
            style={{
              borderRadius: "25px",
              marginBottom: "10px",
              marginTop: "20px",
              marginLeft: "27%",
              backgroundColor: "#d9d9d9",
              color: "black",
            }}
            disabled={tcno === "" || email === "" ? true : false}
            variant="outlined"
            onClick={HandleSendEmailButton}
          >
            E-mail Gönder
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default Login2;
