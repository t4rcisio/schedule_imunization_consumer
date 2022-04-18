import { Form, FormGroup, Button, Badge } from "react-bootstrap";
import Calendar from "./calendar.js";
import { Formik, Field } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  cpf: Yup.string()
    .min(11, "Hii... não está correto")
    .max(11, "Hii... não está correto")
    .required("Informar o CPF é obrigatório"),
});

const LoginPatientForm = ({ setNewPatient }) => {
  const loginPatient = async (values) => {
    const params = {
      cpf: values.cpf,
    };

    const patientParams = JSON.stringify(params);

    const data = new FormData();
    data.append("json", JSON.stringify(params));

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const response = await fetch("http://localhost:5000/patient/login", {
      method: "POST",
      headers: myHeaders,
      mode: "cors",
      credentials: "include",
      cache: "default",
      body: patientParams,
    });
    const object = await response.json();
    console.log(object);
  };

  return (
    <>
      <Formik
        validationSchema={LoginSchema}
        newPatient={loginPatient}
        initialValues={{ cpf: "" }}
      >
        {({ values, errors, touched, setFieldValue }) => (
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
            <Button
              variant="success"
              className="btn btn-primary m-3"
              onClick={() => {
                console.log({ ...errors });
                if (!(Object.keys(errors).length === 0))
                  return alert("Preencha todos os campos!");
                loginPatient(values);
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
