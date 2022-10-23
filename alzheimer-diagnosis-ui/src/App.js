import "./App.css";
import Login from "./features/login/Login";
import Register from "./features/register/Register";
import Home from "./features/home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";
import LinkPage from "./components/LinkPage";
import PatientPage from "./features/home/PatientPage";
import DoctorPage from "./features/home/DoctorPage";
import Unauthorized from "./components/Unauthorized";
import Missing from "./components/Missing";
import AdminPage from "./features/home/AdminPage";

const ROLES = {
  Patient: "PATIENT",
  Doctor: "DOCTOR",
  Admin: "ADMIN",
};

/*const ROLES = {
  Patient: 11,
  Doctor: 12,
  Admin: 13,
};*/

function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/linkpage" element={<LinkPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          {/* we want to protect these routes */}
          {/*<Route
            element={
              <RequireAuth
                allowedRoles={[ROLES.Patient, ROLES.Doctor, ROLES.Admin]}
              />
            }
          >
            <Route path="/" element={<Home />} />
          </Route>*/}

          <Route
            element={
              <RequireAuth
                allowedRoles={[ROLES.Patient, ROLES.Doctor, ROLES.Admin]}
              />
            }
          >
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Patient]} />}>
            <Route path="/patient" element={<PatientPage />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Doctor]} />}>
            <Route path="/doctor" element={<DoctorPage />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="/admin" element={<AdminPage />} />
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
        </Route>
      </Routes>
      {/*<BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>*/}
    </main>
  );
}

export default App;
