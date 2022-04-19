import { Formik, Field, FieldArray } from "formik";
import Calendar from "./calendar.js";
import { Modal, Button, Form, FormGroup, Badge } from "react-bootstrap";

const NewSession = ({ newSession, salveSession, cancelSession }) => {
  return (
    <Modal show={newSession} onHide={newSession}>
      <Modal.Header>
        <Modal.Title>Atenção!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik initialValues={{ s: "", cpf: "", date: "" }}>
          {({ values, errors, touched }) => (
            <Form>
              <FormGroup>
                <label>Selecione a unidade de saúde</label>
                <br />
                <Field as="select" name="color">
                  <option value="red">Red</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                </Field>
                <br />
                {errors.name && touched.name && (
                  <small className="form-text text-muted">
                    <Badge bg="danger">{errors.name}</Badge>{" "}
                  </small>
                )}
              </FormGroup>
              <FormGroup>
                <label>Selecione a data e horário de preferência</label>
                <Calendar name="date" type="date" />
                <br />
                {errors.date && (
                  <small className="form-text text-muted">
                    <Badge bg="danger">{errors.date}</Badge>{" "}
                  </small>
                )}
              </FormGroup>
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          className="btn btn-primary mt-3"
          onClick={() => {
            cancelSession(false);
          }}
        >
          Cancelar
        </Button>
        <small className="form-text text-muted ms-3 me-3">
          <Badge bg="danger">OU</Badge>{" "}
        </small>
        <Button
          variant="secondary"
          className="btn btn-primary mt-3"
          onClick={() => salveSession(false)}
        >
          Agendar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewSession;
