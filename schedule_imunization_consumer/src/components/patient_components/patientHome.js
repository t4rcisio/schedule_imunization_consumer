import { useState } from "react";
import { Card, Container } from "react-bootstrap";
import axiosClient from "../../utils/axios.js";
import SessionCards from "../session/sessionCards.js";
import DeletionModal from "../session/deleteModal.js";
import Loading from "../subcomponents/loading.js";

const HomePage = ({ updateSession, reloadSession }) => {
  //Fetch hooks
  const [sessions, setSessions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [type, setType] = useState("Patient");

  //Modal params
  const [showDeletion, setDelete] = useState(false);
  const [idDeletion, setIdDeletion] = useState("");

  const token = localStorage.getItem(process.env.REACT_APP_TOKEN_ID);

  const cancelDeletion = () => setDelete(false);
  const deleteSession = () => {
    setDelete(false);

    custonFetch("delete", `/patient/sessions/delete/${idDeletion}`);
  };

  const custonFetch = async (method, url) => {
    axiosClient[method](url, {
      headers: { token: token },
    })
      .then((res) => {
        if (method === "delete") reloadSession(true);
        else if (!res.data.patient_session.length) {
          setEmpty(true);
          setSessions([]);
        } else if (!res.data.error) {
          setSessions(res.data.patient_session);
          setEmpty(false);
        }
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (updateSession) {
    reloadSession(false);
    custonFetch("get", "/patient/sessions/scheduled");
  }

  return (
    <>
      <Container>
        <DeletionModal
          showDeletion={showDeletion}
          cancelDeletion={cancelDeletion}
          deleteSession={deleteSession}
        />
        {isLoading && <Loading />}
        {sessions.length ? (
          <Container>
            <Card className="mt-5">
              <Card.Header>Meus gendamentos</Card.Header>
              <SessionCards
                sessions={sessions}
                setDelete={setDelete}
                setIdDeletion={setIdDeletion}
                type={type}
              />
            </Card>
          </Container>
        ) : null}
        {error && <h1>Falha na conexão com o servidor</h1>}
        {empty && <h1>Não há registro de agendamentos</h1>}
      </Container>
    </>
  );
};

export default HomePage;
