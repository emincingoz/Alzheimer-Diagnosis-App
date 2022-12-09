import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register2 from "./components/authentication-page/Register2";
import Login2 from "./components/authentication-page/Login2";
import PatientPage from "./components/patient-page/PatientPage";
import DoctorPage from "./components/doctor-page/DoctorPage";
import Layout from "./components/Layout";
import Unauthorized from "./components/Unauthorized";
import Missing from "./components/Missing";
import LinkPage from "./components/LinkPage";
import RequireAuth from "./components/RequireAuth";
import Home from "./features/home/Home";

const ROLES = {
  Patient: "PATIENT",
  Doctor: "DOCTOR",
  Admin: "ADMIN",
};

function App() {
  return (
    <div className="App">
      <Routes>
        {/*<Route path="/" element={<Layout />}></Route>*/}
        {/* public routes */}
        {/*<Route path="/" element={<Navigate to="/login" />}></Route>*/}
        <Route path="/login" element={<Login2 />} />
        <Route path="/register" element={<Register2 />} />
        <Route path="/linkpage" element={<LinkPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* we want to protect these routes */}
        <Route
          element={
            <RequireAuth
              allowedRoles={[ROLES.Patient, ROLES.Doctor, ROLES.Admin]}
            />
          }
        >
          <Route path="/" element={<Home />} />
        </Route>

        {/*<Route
            element={
              <RequireAuth
                allowedRoles={[ROLES.Patient, ROLES.Doctor, ROLES.Admin]}
              />
            }
          >
            <Route path="/" element={<Login2 />} />
          </Route>*/}

        <Route element={<RequireAuth allowedRoles={[ROLES.Patient]} />}>
          <Route path="/patient" element={<PatientPage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Doctor]} />}>
          <Route path="/doctor" element={<DoctorPage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          {/*<Route path="/admin" element={<AdminPage />} />*/}
        </Route>

        {/*<Route element={<RequireAuth allowedRoles={[ROLES.Doctor]} />}>
            <Route path="/" element={<Navigate to="/doctor" />}></Route>
            <Route path="/doctor" element={<DoctorPage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="/" element={<Navigate to="/admin" />}></Route>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Patient]} />}>
            <Route path="/" element={<Navigate to="/patient" />}></Route>
            <Route path="/patient" element={<PatientPage />} />
          </Route>
          */}
        {/*<Route
            element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}
          >
            <Route path="lounge" element={<Lounge />} />
          </Route>*/}
        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Routes>
      {/*<BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
      {/*<BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login2 />}></Route>
          <Route exact path="/register" element={<Register2 />}></Route>
          <Route exact path="/patient" element={<PatientPage />}></Route>
          <Route exact path="/doctor" element={<DoctorPage />}></Route>
        </Routes>
      </BrowserRouter>*/}
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
