import { Form, FormGroup, Button, Badge, Col, Spinner } from "react-bootstrap";
import axiosClient from "../utils/axios.js";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";

const LoginSchema = Yup.object().shape({
  cpf: Yup.string()
    .min(11, "Hii... não está correto")
    .max(11, "Hii... não está correto")
    .required("Informar o CPF é obrigatório"),
});

const LoginPatientForm = ({ setNewPatient, setToken }) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState(undefined);

  useEffect(() => {}, [params]);

  const custonFetch = async (cpf) => {
    axiosClient
      .post("/patient/login", { cpf })
      .then((res) => {
        localStorage.setItem(process.env.REACT_APP_TOKEN_ID, res.data.token);
        setResponse(res.data.token);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
        setToken(true);
      });
  };

  const loginPatient = (cpf) => {
    setLoading(true);
    custonFetch(cpf);
  };

  return (
    <>
      <Formik
        validationSchema={LoginSchema}
        newPatient={loginPatient}
        initialValues={{ cpf: "" }}
      >
        {({ values, errors, touched }) => (
          <Form>
            <FormGroup>
              <label>CPF</label>
              <br />
              <Field type="text" name="cpf" />
              <br />
              {errors.cpf && touched.cpf && (
                <small className="form-text text-muted">
                  <Badge bg="danger">{errors.cpf}</Badge>{" "}
                </small>
              )}
            </FormGroup>
            {loading && (
              <Col className="col-md-auto d-flex justify-content-center">
                <Spinner animation="border" role="status"></Spinner>
              </Col>
            )}
            <Button
              variant="success"
              className="btn btn-primary m-3"
              onClick={() => {
                if (!(Object.keys(errors).length === 0))
                  return alert("Preencha todos os campos!");
                loginPatient(values.cpf);
              }}
            >
              Fazer login
            </Button>
            <small className="form-text text-muted m-3 ms-3 me-3">
              <Badge bg="danger">OU</Badge>{" "}
            </small>
            <Button
              variant="success"
              className="btn btn-primary m-3"
              onClick={() => setNewPatient(true)}
            >
              Fazer cadastro
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginPatientForm;
