import NewPatientForm from "../components/newPatientForm.js";
import LoginPatientForm from "../components/loginPatientForm.js";
import HomePage from "../components/patientHome.js";
import NewSession from "../components/newSessionModal.js";
import { useState } from "react";
import { Row, Container, Card, Button } from "react-bootstrap";

const PatientPage = () => {
  const [userToken, setToken] = useState(undefined);
  const [newPatient, setNewPatient] = useState(false);
  const [newSession, setSession] = useState(false);

  const salveSession = () => setSession(false);
  const cancelSession = () => setSession(false);

  if (localStorage.getItem(process.env.REACT_APP_TOKEN_ID) && !userToken)
    setToken(localStorage.getItem(process.env.REACT_APP_TOKEN_ID));

  return (
    <Container>
      <Row className="mt-2">
        <Card>
          <Card.Header>
            {newSession && (
              <NewSession
                newSession={newSession}
                salveSession={salveSession}
                cancelSession={cancelSession}
              />
            )}
            <Button onClick={() => setSession(true)}>Novo Agendamento</Button>
          </Card.Header>
          <Card.Body>
            {!userToken && !newPatient && (
              <LoginPatientForm
                setNewPatient={setNewPatient}
                setToken={setToken}
              />
            )}
            {!userToken && newPatient && (
              <NewPatientForm setNewPatient={setNewPatient} />
            )}
            {userToken && <HomePage />}
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default PatientPage;
