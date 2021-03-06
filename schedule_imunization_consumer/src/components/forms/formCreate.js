/*

 -> Generate form to create a new Patient account

*/

import { Form, FormGroup, Button, Badge } from "react-bootstrap";
import { useState } from "react";
import Calendar from "../calendar/calendar.js";
import { Formik, Field } from "formik";
import Loading from "../subcomponents/loading.js";
import axiosClient from "../../utils/axios.js";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

// Schema model to validate inputs
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Esse nome não é válido")
    .max(50, "Esse nome não é válido")
    .required("Informar seu nome é obrigatório"),
  cpf: Yup.string()
    .min(11, "Hii... não está correto")
    .max(11, "Hii... não está correto")
    .required("Informar o CPF é obrigatório"),
  date: Yup.date()
    .max(Date(), "A vacinação está disponível apenas para maiores de 5 anos!")
    .required("É preciso informar a data do seu nascimento"),
});

// Generate form to create a new Patient account
const FormCreate = ({ showLoginForm }) => {
  const [loading, setLoading] = useState(false);
  const navegate = useNavigate();

  //To save data on database
  const newPatient = (values) => {
    setLoading(true);

    // Adjust date and time
    const ndate = values.date.toISOString();
    const [date] = ndate.split("T");

    // body params
    const params = {
      name: values.name,
      birthday: date,
      cpf: values.cpf,
    };

    //Connect to databse
    const custonFetch = () => {
      axiosClient
        .post("/patient/new", { ...params })
        .then((res) => {
          if (!res.data.error) {
            alert("Usuário criado com sucesso");
            navegate("../");
          } else alert("Usuário já cadastrado");
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
        validationSchema={SignupSchema}
        newPatient={newPatient}
        initialValues={{ name: "", cpf: "", date: "" }}
      >
        {({ values, errors, touched, setFieldValue }) => (
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
              <label>Data de nascimento</label>
              <Calendar name="date" type="date" />
              <br />
              {errors.date && touched.date && (
                <small className="form-text text-muted">
                  <Badge bg="danger">{errors.date}</Badge>{" "}
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
                    newPatient(values);
                  }}
                >
                  Salvar
                </Button>
                <Button
                  variant="secondary"
                  className="btn btn-primary ms-3 mt-3"
                  onClick={() => showLoginForm(true)}
                >
                  Já tenho cadastro
                </Button>
              </>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormCreate;
