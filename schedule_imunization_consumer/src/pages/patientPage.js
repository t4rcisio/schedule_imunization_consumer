import NewPatientForm from "../components/newPatientForm.js";
import LoginPatientForm from "../components/loginPatientForm.js";
import { Container } from "react-bootstrap";
import { useState } from "react";
const PatientPage = () => {
  const [userCookie, setCookie] = useState("");
  const [newPatient, setNewPatient] = useState(false);

  const findCookies = () => {
    console.log({ Cookies: document.cookie });
  };
  findCookies();

  return (
    <Container>
      {!userCookie && !newPatient && (
        <LoginPatientForm setNewPatient={setNewPatient} />
      )}
      {newPatient && <NewPatientForm setNewPatient={setNewPatient} />}
    </Container>
  );
};

export default PatientPage;
