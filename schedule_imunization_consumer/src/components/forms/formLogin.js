/*

 -> Generate form to login 

  This form generate two models to login
  1: Patient Login
  2: Nurse Login
*/

import { Form, FormGroup, Button, Badge, Card } from "react-bootstrap";
import axiosClient from "../../utils/axios.js";
import Loading from "../subcomponents/loading.js";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";

// form schema validator
const LoginSchema = Yup.object().shape({
  cpf: Yup.string()
    .min(11, "Hii... não está correto")
    .max(11, "Hii... não está correto")
    .required("Informar o CPF é obrigatório"),
  password: Yup.string().required("Preencha o campo da senha"),
});

const FormLogin = ({ setToken, showLoginForm }) => {
  const [serverError, setServertError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passReq, setPassReq] = useState(undefined);

  //Set view type. -> define password is required or not
  if (window.location.pathname === "/nurse" && !passReq) setPassReq(true);

  const custonFetch = (params, url) => {
    //Databse conncetion
    axiosClient
      .post(url, { ...params })
      .then((res) => {
        if (!res.data.error) {
          localStorage.setItem(process.env.REACT_APP_TOKEN_ID, res.data.token);
          setToken(res.data.token);
        } else setUserError(true);
      })
      .catch((err) => {
        setServertError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loginPatient = (values) => {
    setLoading(true);
    if (!passReq) custonFetch({ cpf: values.cpf }, "/patient/login");
    else
      custonFetch(
        { cpf: values.cpf, password: values.password },
        "/nurse/login"
      );
  };

  return (
    <>
      <Formik
        validationSchema={LoginSchema}
        newPatient={loginPatient}
        initialValues={{ cpf: "", password: "" }}
      >
        {({ values, errors, touched }) => (
          <Form>
            <p className="font-weight-light" style={{ fontSize: "30px" }}>
              Login
            </p>
            <FormGroup>
              <Card.Body>
                <label>
                  <span>
                    <Badge bg="dark" className="mb-2">
                      CPF (Apenas números)
                    </Badge>
                  </span>
                </label>
                <br />
                <Field type="text" name="cpf" />
                <br />
                {serverError && (
                  <small className="form-text text-muted">
                    <Badge bg="danger">
                      Falha com a conexão com o servidor
                    </Badge>{" "}
                  </small>
                )}
                {userError && (
                  <small className="form-text text-muted">
                    <Badge bg="danger">
                      Usuário não encontrado, verifique se digitou corretamente
                    </Badge>{" "}
                  </small>
                )}
                {errors.cpf && touched.cpf && (
                  <small className="form-text text-muted">
                    <Badge bg="danger">{errors.cpf}</Badge>{" "}
                  </small>
                )}
              </Card.Body>

              <Card.Body>
                {passReq && (
                  <>
                    <label>
                      <span>
                        <Badge bg="dark" className="mb-2">
                          Password
                        </Badge>
                      </span>
                    </label>
                    <br />
                    <Field type="password" name="password" autoComplete="on" />
                    <br />
                  </>
                )}
              </Card.Body>
            </FormGroup>
            {loading && <Loading />}
            <Button
              variant="success"
              className="btn btn-primary m-3"
              onClick={() => {
                if (((errors.cpf || errors.password) && passReq) || errors.name)
                  return alert("Preencha todos os campos corretamente");
                loginPatient(values);
              }}
            >
              Fazer login
            </Button>
            <small className="form-text text-muted me-3">
              <Badge bg="danger">OU</Badge>{" "}
            </small>
            <Button
              variant="success"
              className="btn btn-primary m-3"
              onClick={() => showLoginForm(false)}
            >
              Fazer cadastro
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormLogin;
