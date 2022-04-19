import { useState } from "react";
import { Container } from "react-bootstrap";
import axiosClient from "../utils/axios.js";
import PatientSessionCards from "./patientSessionCards.js";
import Loading from "./loading.js";

const HomePage = () => {
  const [sessions, setSessions] = useState([]);
  const [deletionModal, setDelete] = useState(false)

  const custonFetch = async (token) => {
    axiosClient
      .get("patient/sessions/scheduled", {
        headers: { token: token },
      })
      .then((res) => {
        if (!res.data.error) setSessions(res.data.session);
      })
      .catch((err) => {
        //setError(err);
      })
      .finally(() => {
        //setLoading(false);
        //setToken(true);
      });
  };

  if (!sessions.length) {
    custonFetch(localStorage.getItem(process.env.REACT_APP_TOKEN_ID));
  }

  return (
    <>
      <Container>
        {!sessions && <Loading />}
        {sessions && <PatientSessionCards sessions={sessions} />}
      </Container>
    </>
  );
};

export default HomePage;
