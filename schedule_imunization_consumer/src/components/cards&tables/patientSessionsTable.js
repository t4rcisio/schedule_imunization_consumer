/*

 -> Generate a table wiht patient sessions 

*/
import { useState } from "react";
import { Container } from "react-bootstrap";
import axiosClient from "../../utils/axios.js";
import SessionCards from "./sessionCards.js";
import AlertModal from "../modals/alertModal.js";
import Loading from "../subcomponents/loading.js";

// Modal message content
const data = {
  title: "Atenção!",
  message:
    "Tem certeza que deseja desmarcar essa sessão? A ação não poderá ser desfeita!",
  cancel: "Cancelar",
  confirm: "Desmarcar",
};

// Set card type from sessionCard generator
const type = "Patient";

const HomePage = ({ updateSession, reloadSession }) => {
  //Fetch hooks
  const [sessions, setSessions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);

  //Modal params
  const [showModal, showPopUp] = useState(false);
  const [idDeletion, setId] = useState("");

  const token = localStorage.getItem(process.env.REACT_APP_TOKEN_ID);

  // Close Modal
  const cancel = () => showPopUp(false);

  // Run deletion on database
  const confirm = () => {
    showPopUp(false);
    setLoading(true);
    custonFetch("delete", `/session/delete/${idDeletion}`);
  };

  // Connect to database
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // To reload session array without interaction
  if (updateSession) {
    reloadSession(false);
    custonFetch("get", "/patient/scheduled");
  }

  return (
    <>
      <Container>
        <AlertModal
          showModal={showModal}
          cancel={cancel}
          confirm={confirm}
          data={data}
        />
        {isLoading && <Loading />}
        {sessions.length ? (
          <Container>
            <SessionCards
              sessions={sessions}
              showPopUp={showPopUp}
              setId={setId}
              type={type}
            />
          </Container>
        ) : null}
        {error && <h1>Falha na conexão com o servidor</h1>}
        {empty && <h1>Não há registro de agendamentos</h1>}
      </Container>
    </>
  );
};

export default HomePage;
