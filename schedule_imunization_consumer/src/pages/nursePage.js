import { useState } from "react";
import { Container, Row, Card, Button, Accordion } from "react-bootstrap";
import FormLogin from "../components/forms/formLogin.js";
import FormCreate from "../components/forms/formCreate.js";
import Search from "../components/forms/formSearch.js";
import Loading from "../components/subcomponents/loading.js";
import SessionCards from "../components/session/sessionCards.js";

const NursePage = () => {
  const [token, setToken] = useState(false);
  const [signin, setSignin] = useState(true);
  const [signup, setSignup] = useState(false);
  const [sessions, setArraySessions] = useState([]);
  const [error, setError] = useState(false);
  const [errorServer, setErrorServer] = useState(false);
  const [loading, setLoading] = useState(false);

  const [type, setType] = useState("Clinic");

  const showLoginForm = (state) => {
    setSignin(state);
    setSignup(!state);
  };

  if (localStorage.getItem(process.env.REACT_APP_TOKEN_ID) && !token) {
    setToken(localStorage.getItem(process.env.REACT_APP_TOKEN_ID));
    setSignin(false);
    setSignup(false);
  }

  return (
    <>
      <Container>
        <Row className="mt-2">
          <Card>
            <Card.Header className="text-end">
              <Button className="me-3"> Meu Perfil</Button>
              <Button> Gerenciar unidades</Button>
            </Card.Header>
            <Card.Body>
              {loading && <Loading />}
              {token && (
                <>
                  {token && (
                    <Search
                      setArraySessions={setArraySessions}
                      setError={setError}
                      setErrorServer={setErrorServer}
                      setLoading={setLoading}
                    />
                  )}
                </>
              )}
            </Card.Body>

            <Card.Body>
              {!token && signin && (
                <FormLogin setToken={setToken} showLoginForm={showLoginForm} />
              )}
              {!token && signup && <FormCreate showLoginForm={showLoginForm} />}
              {sessions.length ? (
                <SessionCards
                  sessions={sessions}
                  type={type}
                  showPopUp={undefined}
                  setId={undefined}
                />
              ) : (
                <></>
              )}
              <></>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );
};

export default NursePage;
