/*

 -> Generate form to create a new Patient session

*/

import { Formik, Field } from "formik";
import { Modal, Button, Form, FormGroup, Badge, Card } from "react-bootstrap";
import OptionsForm from "../subcomponents/optionsFormClinic.js";
import { useState } from "react";
import * as Yup from "yup";
import axiosClient from "../../utils/axios.js";
import CalendarSession from "../calendar/calendarSession.js";
import Loading from "../subcomponents/loading.js";

// Form schema validator
const SessionSchema = Yup.object().shape({
  clinic: Yup.string()
    .min(2, "Selecione uma opção válida")
    .max(50, "Selecione uma opção válida")
    .required("Selecone uma opção"),
  date: Yup.date().required("Selecione uma data"),
});

const NewSession = ({
  newSession,
  salveSession,
  cancelSession,
  reloadSession,
}) => {
  const token = localStorage.getItem(process.env.REACT_APP_TOKEN_ID);
  const [alertDate, setAlertDate] = useState(false);
  const [alertClinic, setAlerClinic] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(true);
  const [showNotification, setShow] = useState(false);

  const verifyValues = (values) => {
    const ndate = new Date(values.date);
    const minutes = ndate.getMinutes();

    // Vefiy time params
    if (new Date() >= ndate) {
      setAlertDate(true);
      return false;
    }
    if (!values.clinic) {
      setAlerClinic(true);
      return false;
    }

    if (!(minutes === 0)) {
      setAlertDate(true);
      return false;
    }

    return true;
  };

  const buidSession = (values) => {
    setLoading(true);
    const ndate = new Date(values.date);

    //body params
    const params = {
      date: ndate.toLocaleDateString(),
      time: ndate.toLocaleTimeString(),
      clinicId: values.clinic,
    };

    //database connection
    const custonFetch = () => {
      axiosClient
        .post("/session/new", { ...params }, { headers: { token: token } })
        .then((res) => {
          if (!res.data.error) {
            reloadSession(true);
            cancelSession();
          } else {
            setError(res.data.message);
            setShow(true);
          }
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    custonFetch();
  };

  return (
    <>
      <Modal show={newSession} onHide={newSession}>
        <Modal.Header>
          <Modal.Title>Marcar nova Sessão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={SessionSchema}
            initialValues={{ clinic: "", date: "" }}
          >
            {({ values, errors, touched }) => (
              <Form className="mt-2">
                <FormGroup>
                  <label>Selecione a unidade de saúde</label>
                  <br />
                  <Card>
                    <Card.Body>
                      <Field as="select" name="clinic">
                        <option value="">Selecione</option>
                        <OptionsForm />
                      </Field>
                    </Card.Body>
                  </Card>
                  {alertClinic && (
                    <small className="form-text text-muted">
                      <Badge bg="danger">{errors.name}</Badge>{" "}
                    </small>
                  )}
                </FormGroup>
                <FormGroup>
                  <label>Selecione a data e horário de preferência</label>
                  <Card>
                    <Card.Body>
                      <CalendarSession name="date" type="date" />
                    </Card.Body>
                  </Card>
                  {alertDate && (
                    <small className="form-text text-muted">
                      <Badge bg="danger">Data inválida</Badge>{" "}
                    </small>
                  )}
                  {error && <Badge bg="danger">{error}</Badge>}
                </FormGroup>

                <>
                  <Button
                    variant="success"
                    className="btn btn-primary mt-3 me-3"
                    onClick={() => {
                      setError(false);
                      if (verifyValues(values)) buidSession(values);
                    }}
                  >
                    Agendar
                  </Button>
                </>
                <>
                  <Button
                    variant="warning"
                    className="btn btn-primary mt-3"
                    onClick={() => {
                      cancelSession(false);
                    }}
                  >
                    Cancelar
                  </Button>
                  {isLoading && <Loading className="ms-5" />}
                </>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewSession;
