import { useState } from "react";
import { Container, Row, Card, Button, Badge } from "react-bootstrap";
import FormLogin from "../components/forms/formLogin.js";
import FormCreateNurse from "../components/forms/formCreateNurse.js";
import Search from "../components/forms/formSearch.js";
import Loading from "../components/subcomponents/loading.js";
import SessionCards from "../components/cards&tables/sessionCards.js";
import axiosClient from "../utils/axios.js";
import AlertModal from "../components/modals/alertModal.js";

const data = {
  title: "Atenção!",
  message: "Tem certeza que deseja concluir essa sessão?",
  cancel: "Cancelar",
  confirm: "Concluir",
};

const type = "Clinic";

const NursePage = () => {
  const [token, setToken] = useState(false);
  const [signin, setSignin] = useState(true);
  const [signup, setSignup] = useState(false);
  const [sessions, setArraySessions] = useState([]);
  const [error, setError] = useState(false);
  const [errorServer, setErrorServer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(false);

  //Modal params
  const [showModal, showPopUp] = useState(false);
  const [idUpdate, setId] = useState("");

  const cancel = () => showPopUp(false);
  const confirm = () => {
    showPopUp(false);
    setLoading(true);
    changeState();
  };

  const showLoginForm = (state) => {
    setSignin(state);
    setSignup(!state);
  };

  if (localStorage.getItem(process.env.REACT_APP_TOKEN_ID) && !token) {
    setToken(localStorage.getItem(process.env.REACT_APP_TOKEN_ID));
    setSignin(false);
    setSignup(false);
  }

  const custonFetch = async (method, payload, url) => {
    console.log(payload);
    axiosClient[method](
      url,
      { ...payload },
      {
        headers: { token: token },
      }
    )
      .then((res) => {
        console.log(res.data);
        if (res.data.error) setErrorUpdate(true);
        else console.log("reload");
      })
      .catch((err) => {
        console.log(err);
        setErrorUpdate(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const changeState = () => {
    setErrorUpdate(false);
    const params = {
      id: idUpdate,
      status: "Done",
    };
    custonFetch("post", params, "/session/patient/confirm");
  };

  return (
    <>
      <Container>
        <AlertModal
          showModal={showModal}
          cancel={cancel}
          confirm={confirm}
          data={data}
        />
        <Row className="mt-2">
          <Card>
            {token && (
              <Card.Header className="text-end">
                <Button className="me-3"> Meu Perfil</Button>
                <Button> Gerenciar unidades</Button>
              </Card.Header>
            )}
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
                </>
              )}
              {errorUpdate && (
                <Badge pill bg="warning" text="dark">
                  Não foi possível atualizar
                </Badge>
              )}
            </Card.Body>
            <Card.Body>
              {!token && signin && (
                <FormLogin setToken={setToken} showLoginForm={showLoginForm} />
              )}
              {!token && signup && (
                <FormCreateNurse showLoginForm={showLoginForm} />
              )}
              {sessions.length ? (
                <SessionCards
                  sessions={sessions}
                  type={type}
                  showPopUp={showPopUp}
                  setId={setId}
                />
              ) : (
                <></>
              )}
              {loading && <Loading />}
              {error && <h3>Nenhuma sessão encontrada</h3>}
              {errorServer && <h3>Falha na comunicação com o servidor</h3>}
              <></>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );
};

export default NursePage;
