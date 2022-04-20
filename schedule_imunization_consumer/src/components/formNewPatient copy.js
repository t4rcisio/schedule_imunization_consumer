import { Form, FormGroup, Button, Badge } from "react-bootstrap";
import { useState } from "react";
import Calendar from "./calendar.js";
import { Formik, Field } from "formik";
import Loading from "./loading.js";
import axiosClient from "../utils/axios.js";
import * as Yup from "yup";

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

const NewPatientForm = ({ setNewPatient }) => {
  const [loading, setLoading] = useState(false);

  const newPatient = async (values) => {
    setLoading(true);
    const ndate = values.date.toISOString();
    const [date] = ndate.split("T");

    const params = {
      name: values.name,
      birthday: date,
      cpf: values.cpf,
    };

    const custonFetch = async () => {
      axiosClient
        .post("/patient/new", { ...params })
        .then((res) => {
          if (!res.data.error) alert("Done");
          else alert("Usuário já cadastrado");
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
              {errors.date && (
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
                <small className="form-text text-muted ms-3 me-3">
                  <Badge bg="danger">OU</Badge>{" "}
                </small>
                <Button
                  variant="secondary"
                  className="btn btn-primary mt-3"
                  onClick={() => setNewPatient(false)}
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

export default NewPatientForm;
