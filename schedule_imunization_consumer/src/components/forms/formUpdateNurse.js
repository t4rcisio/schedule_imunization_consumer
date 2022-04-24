import { Form, FormGroup, Button, Badge } from "react-bootstrap";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import Calendar from "../calendar/calendar.js";
import { Formik, Field } from "formik";
import Loading from "../subcomponents/loading.js";
import axiosClient from "../../utils/axios.js";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const UpdateSchema = Yup.object().shape({
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

const UpdatePatientForm = ({ showUpdateForm }) => {
  const [loading, setLoading] = useState(false);
  const [userToken, setToken] = useState("");
  const [finshUpdate, setExit] = useState(false);
  const [payload, setPyload] = useState(undefined);
  const [preValues, setValues] = useState(undefined);
  const navegate = useNavigate();

  if (localStorage.getItem(process.env.REACT_APP_TOKEN_ID) && !userToken)
    setToken(localStorage.getItem(process.env.REACT_APP_TOKEN_ID));

  if (userToken && !payload) setPyload(jwtDecode(userToken));

  if (payload && !preValues) {
    const [date] = payload.birthday.split("T");
    setValues({ name: payload.name, cpf: payload.cpf, birthday: date });
  }
  console.log(preValues);
  console.log({ payload: payload, userToken: userToken });

  const clearCredentials = () => {
    localStorage.removeItem(process.env.REACT_APP_TOKEN_ID);
  };

  const updatePatient = async (values) => {
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
        .post("/patient/edit", { ...params }, { headers: { token: userToken } })
        .then((res) => {
          if (!res.data.error) {
            setExit(true);
            alert("Seus dados foram atualizados");
            clearCredentials();
          } else alert("error");
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
          date: preValues
            ? new Date(preValues.birthday + " UTC-3")
            : new Date(),
          cpf: preValues ? preValues.cpf : "",
        }}
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
                      window.location.reload(false);
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

export default UpdatePatientForm;
