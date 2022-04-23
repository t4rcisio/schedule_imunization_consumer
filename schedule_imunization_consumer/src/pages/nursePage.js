import { useState } from "react";
import { Container, Row, Card, Button, Badge } from "react-bootstrap";
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
                  {error && (
                    <small>
                      <Badge pill bg="danger">
                        Não foi possível verificar a data
                      </Badge>
                    </small>
                  )}
                  {errorServer && (
                    <small>
                      <Badge pill bg="danger">
                        Falha de conexão
                      </Badge>
                    </small>
                  )}
                </>
              )}
            </Card.Body>

            {token && !sessions && <>Preencha os campos para pesquisar</>}
            {token && !sessions.length && (
              <>Não há sessões para o local e data indicados</>
            )}
            <Card.Body>
              {!token && signin && (
                <FormLogin setToken={setToken} showLoginForm={showLoginForm} />
              )}
              {!token && signup && <FormCreate showLoginForm={showLoginForm} />}
              {sessions.length ? (
                <Card className="mt-5">
                  <Card.Header>Agendamentos de vacinação</Card.Header>
                  <SessionCards
                    sessions={sessions}
                    type={type}
                    setDelete={undefined}
                    setIdDeletion={undefined}
                  />
                </Card>
              ) : (
                <></>
              )}
              <></>
              {loading && <Loading />}
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );
};

export default NursePage;
