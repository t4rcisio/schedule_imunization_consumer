/*

 -> Generate form to nurse view profile information

*/

import { Form, FormGroup, Button, Badge } from "react-bootstrap";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import { Formik, Field } from "formik";
import Loading from "../subcomponents/loading.js";
import axiosClient from "../../utils/axios.js";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

// input schema validator
const UpdateSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Esse nome não é válido")
    .max(50, "Esse nome não é válido")
    .required("Informar seu nome é obrigatório"),
  cpf: Yup.string()
    .min(11, "Hii... não está correto")
    .max(11, "Hii... não está correto")
    .required("Informar o CPF é obrigatório"),
  password: Yup.string()
    .min(8, "A senha possui pelo menos 8 caracteres")
    .required("Digite sua senha"),
});

// set path
const path = "../nurse";

const FormNurseUpdate = ({ showUpdateForm }) => {
  const [loading, setLoading] = useState(false);
  const [userToken, setToken] = useState("");
  const [finshUpdate, setExit] = useState(false);
  const [payload, setPyload] = useState(undefined);
  const [preValues, setValues] = useState(undefined);
  const navegate = useNavigate();

  if (localStorage.getItem(process.env.REACT_APP_TOKEN_ID) && !userToken)
    setToken(localStorage.getItem(process.env.REACT_APP_TOKEN_ID));

  // Load account information from token
  if (userToken && !payload) setPyload(jwtDecode(userToken));

  // Set information from payload
  if (payload && !preValues) {
    setValues({ name: payload.name, cpf: payload.cpf });
  }

  //When user click on "Sair" button, credential must be deleted from local storage
  const clearCredentials = () => {
    localStorage.removeItem(process.env.REACT_APP_TOKEN_ID);
  };

  // Update data
  const updatePatient = async (values) => {
    setLoading(true);

    const params = {
      name: values.name,
      cpf: values.cpf,
      password: values.password,
    };

    const custonFetch = async () => {
      axiosClient
        .post("/nurse/edit", { ...params }, { headers: { token: userToken } })
        .then((res) => {
          if (!res.data.error) {
            setExit(true);
            alert("Seus dados foram atualizados");
            clearCredentials();
            navegate("../");
          } else alert(res.data.error);
        })
        .catch((err) => {
          alert(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    custonFetch();
  };

  return (
    <>
      <Formik
        validationSchema={UpdateSchema}
        initialValues={{
          name: preValues ? preValues.name : "",
          cpf: preValues ? preValues.cpf : "",
          password: "",
        }}
      >
        {({ values, errors, touched }) => (
          <Form>
            <FormGroup>
              <label>Nome</label>
              <br />
              <Field type="text" name="name" />
              <br />
              {errors.name && touched.name && (
                <small className="form-text text-muted">
                  <Badge bg="danger">{errors.name}</Badge>{" "}
                </small>
              )}
            </FormGroup>
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
            <FormGroup>
              <br />
              <label>Senha atual</label>
              <br />
              <Field type="password" name="password" />
              <br />
              {errors.password && touched.password && (
                <small className="form-text text-muted">
                  <Badge bg="danger">{errors.password}</Badge>{" "}
                </small>
              )}
            </FormGroup>
            {loading && <Loading />}
            {!loading && (
              <>
                <Button
                  variant="success"
                  className="btn btn-primary mt-3"
                  onClick={() => {
                    console.log({ ...errors });
                    if (!(Object.keys(errors).length === 0))
                      return alert("Preencha todos os campos!");
                    updatePatient(values);
                  }}
                >
                  Salvar
                </Button>

                {!finshUpdate && (
                  <Button
                    variant="secondary"
                    className="btn btn-primary mt-3 ms-3"
                    onClick={() => showUpdateForm(false)}
                  >
                    Cancelar
                  </Button>
                )}
                {finshUpdate && (
                  <Button
                    variant="secondary"
                    className="btn btn-primary ms-3 mt-3"
                    onClick={() => {
                      // Reload page
                      navegate(path);
                    }}
                  >
                    Voltar
                  </Button>
                )}
                <Button
                  variant="warning"
                  className="btn btn-primary mt-3 ms-3"
                  onClick={() => {
                    clearCredentials();
                    navegate("../");
                  }}
                >
                  Sair
                </Button>
              </>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormNurseUpdate;
