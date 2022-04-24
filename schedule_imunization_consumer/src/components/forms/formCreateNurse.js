import { Form, FormGroup, Button, Badge, Card } from "react-bootstrap";
import axiosClient from "../../utils/axios.js";
import Loading from "../subcomponents/loading.js";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const newNurseSchema = Yup.object().shape({
  cpf: Yup.string()
    .min(11, "Hii... não está correto")
    .max(11, "Hii... não está correto")
    .required("Informar o CPF é obrigatório"),
  name: Yup.string()
    .min(2, "Digite um nome válido")
    .max(50, "Digite um nome válido")
    .required("Preencha com seu nome"),
  password: Yup.string()
    .min(8, "A senha deve ter pelo menos 8 cararcteres")
    .required("Preencha o campo da senha"),
});

const FormCreateNurse = ({ showLoginForm }) => {
  const [serverError, setServertError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navegate = useNavigate();

  const custonFetch = async (params, url) => {
    console.log({ params: params, url: url });

    axiosClient
      .post(url, { ...params })
      .then((res) => {
        if (!res.data.error) {
          alert("Usuário criado com sucesso!");
          navegate("../nurse");
        } else setUserError(true);
      })
      .catch((err) => {
        setServertError(err);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const createNurse = (values) => {
    setLoading(true);
    const params = {
      name: values.name,
      cpf: values.cpf,
      password: values.password,
    };
    custonFetch(params, "nurse/new");
  };

  return (
    <>
      <Formik
        validationSchema={newNurseSchema}
        initialValues={{ cpf: "", password: "", name: "" }}
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
                      Nome{" "}
                      {errors.name && touched.name && (
                        <Badge bg="danger">{errors.name}</Badge>
                      )}
                    </Badge>
                  </span>
                </label>
                <br />
                <Field type="text" name="name" />
                <br />
                <label>
                  <span>
                    <Badge bg="dark" className="mb-2">
                      CPF (Apenas números)
                      {errors.cpf && touched.cpf && (
                        <Badge bg="danger">{errors.cpf}</Badge>
                      )}
                    </Badge>
                  </span>
                </label>
                <br />
                <Field type="text" name="cpf" />
                <br />
                <label>
                  <span>
                    <Badge bg="dark" className="mb-2">
                      Senha (min 8 caracteres){" "}
                      {errors.password && touched.password && (
                        <Badge bg="danger">{errors.password}</Badge>
                      )}
                    </Badge>
                  </span>
                </label>
                <br />
                <Field type="password" name="password" />
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
                    <Badge bg="danger">Usuário já está cadastrado</Badge>{" "}
                  </small>
                )}
              </Card.Body>
            </FormGroup>
            {loading && <Loading />}
            <Button
              variant="success"
              className="btn btn-primary m-3"
              onClick={() => {
                if (Object.values(errors).length)
                  return alert("Preencha todos os campos corretamente");
                createNurse(values);
              }}
            >
              Salvar
            </Button>
            <small className="form-text text-muted me-3">
              <Badge bg="danger">OU</Badge>{" "}
            </small>
            <Button
              variant="success"
              className="btn btn-primary m-3"
              onClick={() => showLoginForm(true)}
            >
              Já tenho cadastro
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormCreateNurse;
