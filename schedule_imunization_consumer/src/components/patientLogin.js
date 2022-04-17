import { Form, FormGroup, Button } from "react-bootstrap";
import { useState } from "react";

const PatientLogin = () => {
  const [patientName, setPatientName] = useState("");
  const [patientCPF, setPatientCPF] = useState("");
  const [patientBirthday, setPatientBirthday] = useState("");

  const setName = (event) => {
    setPatientName(event.target.value);
  };

  const setCPF = (event) => {
    setPatientCPF(event.target.value);
  };

  const setBirthday = (event) => {
    setPatientBirthday(event.target.value);
  };

  const newPatient = async () => {
    const date = new Date(patientBirthday + "GMT-3");
    const ndate = date.toLocaleDateString();

    const params = {
      name: patientName,
      birthday: ndate,
      cpf: patientCPF,
    };

    const patientParams = JSON.stringify(params);

    const data = new FormData();
    data.append("json", JSON.stringify(params));

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const response = await fetch("http://localhost:5000/patient/new", {
      method: "POST",
      headers: myHeaders,
      mode: "cors",
      cache: "default",
      body: patientParams,
    });
    const object = await response.json();
    console.log(object);
  };

  return (
    <>
      <Form>
        <FormGroup>
          <label>Nome</label>
          <input
            type="text"
            className="form-control"
            placeholder="Digite seu nome completo"
            onChange={setName}
          />
          <small className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </FormGroup>
        <FormGroup>
          <label>CPF</label>
          <input
            type="text"
            className="form-control"
            placeholder="123.456.789-10"
            onChange={setCPF}
          />
        </FormGroup>
        <FormGroup>
          <label>Data de nascimento</label>
          <input
            type="date"
            className="form-control"
            placeholder="Exemplo: 15/03/1999"
            onChange={setBirthday}
          />
        </FormGroup>
        <Button
          variant="success"
          className="btn btn-primary"
          onClick={() => newPatient()}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default PatientLogin;
