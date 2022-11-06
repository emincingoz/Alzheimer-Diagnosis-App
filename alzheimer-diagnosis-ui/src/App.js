import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register2 from "./components/authentication-page/Register2";
import Login2 from "./components/authentication-page/Login2";
import PatientPage from "./components/patient-page/PatientPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login2 />}></Route>
          <Route exact path="/register" element={<Register2 />}></Route>
          <Route exact path="/patient" element={<PatientPage />}></Route>
        </Routes>
      </BrowserRouter>
      {/*<BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register2 />}></Route>

          <Route exact path="/patient" element={<PatientPage />}></Route>
        </Routes>
      </BrowserRouter>*/}
    </div>
  );
}

export default App;
