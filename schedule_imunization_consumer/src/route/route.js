import { Routes, BrowserRouter, Route } from "react-router-dom";

import Layout from "../components/Layout.js";
import Home from "../pages/home.js";
import NursePage from "../pages/nursePage.js";
import PatientPage from "../pages/patientPage.js";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<Home />} index />
          <Route path="/nurse" element={<NursePage />} />
          <Route path="/patient" element={<PatientPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
