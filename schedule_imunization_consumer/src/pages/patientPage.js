import NewPatientForm from "../components/formProfilePatient.js";
import LoginPatientForm from "../components/formLoginPatient.js";
import HomePage from "../components/patientHome.js";
import NewSession from "../components/newSessionModal.js";
import { useState } from "react";
import { Row, Container, Card, Button } from "react-bootstrap";

const PatientPage = () => {
  const [userToken, setToken] = useState(undefined);
  const [newPatient, setNewPatient] = useState(false);
  const [newSession, setSession] = useState(false);
  const [updateSession, setUpdateSession] = useState(true);

  const salveSession = () => setSession(false);
  const cancelSession = () => setSession(false);
  const reloadSession = (state) => setUpdateSession(state);

  if (localStorage.getItem(process.env.REACT_APP_TOKEN_ID) && !userToken)
    setToken(localStorage.getItem(process.env.REACT_APP_TOKEN_ID));

  return (
    <Container>
      <Row className="mt-2">
        <Card>
          {userToken && (
            <Card.Header className="text-end">
              {newSession && (
                <NewSession
                  newSession={newSession}
                  salveSession={salveSession}
                  cancelSession={cancelSession}
                  reloadSession={reloadSession}
                />
              )}
              <Button onClick={() => setSession(true)}>Novo Agendamento</Button>
              <Button className="ms-5" onClick={() => alert("data")}>
                Meus Dados
              </Button>
            </Card.Header>
          )}
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
            {userToken && (
              <HomePage
                updateSession={updateSession}
                reloadSession={reloadSession}
              />
            )}
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default PatientPage;
