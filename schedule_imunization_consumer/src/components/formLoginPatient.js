import { Form, FormGroup, Button, Badge, Row, Col } from "react-bootstrap";
import axiosClient from "../utils/axios.js";
import Loading from "./loading.js";
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
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const teste = (data) => {
    console.log(data);
  };
  const custonFetch = async (cpf) => {
    axiosClient
      .post("/patient/login", { cpf })
      .then((res) => {
        if (!res.data.error) {
          localStorage.setItem(process.env.REACT_APP_TOKEN_ID, res.data.token);
          setToken(true);
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
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
            <p className="font-weight-light" style={{ fontSize: "30px" }}>
              Login
            </p>
            <FormGroup>
              <label>
                <span>
                  <Badge bg="dark" className="mb-2">
                    CPF (Apenas numeros)
                  </Badge>
                </span>
              </label>
              <br />
              <Field type="text" name="cpf" />
              {error && (
                <Badge bg="danger" className="ms-3">
                  Usuáio não encontrado
                </Badge>
              )}
              <br />
              {errors.cpf && touched.cpf && (
                <small className="form-text text-muted">
                  <Badge bg="danger">{errors.cpf}</Badge>{" "}
                </small>
              )}
            </FormGroup>

            {loading && <Loading />}
            <Button
              variant="success"
              className="btn btn-primary m-3 fluid"
              onClick={() => {
                if (!(Object.keys(errors).length === 0))
                  return alert("Preencha todos os campos corretamente");
                loginPatient(values.cpf);
              }}
            >
              Fazer login
            </Button>
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
