/*

-> Patient Page

*/

import FormCreate from "../components/forms/formCreate.js";
import FormLogin from "../components/forms/formLogin.js";
import HomePage from "../components/cards&tables/patientSessionsTable.js";
import NewSession from "../components/forms/formCreateSession.js";
import UpdatePatientForm from "../components/forms/formUpdate.js";
import { useState } from "react";
import { Row, Container, Card, Button } from "react-bootstrap";

const PatientPage = () => {
  const [userToken, setToken] = useState(undefined);
  const [newSession, setSession] = useState(false);
  const [updateSession, setUpdateSession] = useState(true);
  const [updatePatient, setUpdatePatient] = useState(false);
  const [signin, setSignin] = useState(true);
  const [signup, setSignup] = useState(false);

  const showLoginForm = (state) => {
    setSignin(state);
    setSignup(!state);
  };

  const salveSession = () => setSession(false);
  const cancelSession = () => setSession(false);
  const reloadSession = (state) => setUpdateSession(state);
  const showUpdateForm = (state) => {
    reloadSession(!state);
    setUpdatePatient(state);
  };

  if (localStorage.getItem(process.env.REACT_APP_TOKEN_ID) && !userToken) {
    setToken(localStorage.getItem(process.env.REACT_APP_TOKEN_ID));
    setSignin(false);
    setSignup(false);
  }

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
              <Button className="ms-5" onClick={() => showUpdateForm(true)}>
                Meus Dados
              </Button>
            </Card.Header>
          )}
          <Card.Body>
            {updatePatient && (
              <UpdatePatientForm showUpdateForm={showUpdateForm} />
            )}
            {!userToken && signin && (
              <FormLogin setToken={setToken} showLoginForm={showLoginForm} />
            )}

            {!userToken && signup && (
              <FormCreate showLoginForm={showLoginForm} />
            )}
            {userToken && !updatePatient && (
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
