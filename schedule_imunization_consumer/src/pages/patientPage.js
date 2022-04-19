import NewPatientForm from "../components/newPatientForm.js";
import LoginPatientForm from "../components/loginPatientForm.js";
import { Container } from "react-bootstrap";
import { useState } from "react";
const PatientPage = () => {
  const [userToken, setToken] = useState(false);
  const [newPatient, setNewPatient] = useState(false);

  if (localStorage.getItem(process.env.REACT_APP_TOKEN_ID) && !userToken)
    setToken(true);

  return (
    <Container>
      {!userToken && !newPatient && (
        <LoginPatientForm setNewPatient={setNewPatient} setToken={setToken} />
      )}
      {!userToken && newPatient && (
        <NewPatientForm setNewPatient={setNewPatient} />
      )}
      {userToken && <>Logado</>}
    </Container>
  );
};

export default PatientPage;
