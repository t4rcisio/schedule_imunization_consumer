import { Field, Formik } from "formik";
import { Button, Form, FormGroup, Row } from "react-bootstrap";
import CalendarSession from "../session/calendarSession.js";
import OptionsForm from "../subcomponents/optionsFormClinic.js";
import axiosClient from "../../utils/axios.js";
import { useState } from "react";
import * as Yup from "yup";

const Search = ({ setArraySessions, setError, setErrorServer, setLoading }) => {
  const [token, setToken] = useState(undefined);

  if (localStorage.getItem(process.env.REACT_APP_TOKEN_ID) && !token)
    setToken(localStorage.getItem(process.env.REACT_APP_TOKEN_ID));

  const custonFetch = (params) => {
    console.log(params);
    console.log(token);

    setLoading(true);
    axiosClient
      .post("/nurse/search", params, { headers: { token: token } })
      .then((res) => {
        if (!res.data.error) {
          setArraySessions(Object.values(res.data));
        } else {
          setError(true);
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setErrorServer(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getSessions = (values) => {
    const { clinic, date } = values;

    const ndate = new Date(date);
    const session_date = ndate.toLocaleDateString();
    const session_time = ndate.getHours();

    const params = {
      clinicId: clinic,
      date: session_date + " " + session_time + ":00",
    };

    custonFetch(params);
  };

  return (
    <>
      <Formik initialValues={{ clinic: " ", date: new Date() }}>
        {({ values }) => (
          <Form>
            <FormGroup>
              <Row>
                <small>Escolha a unidade de saúde</small>
                <Field as="select" name="clinic">
                  <option value="">Selecione</option>
                  <OptionsForm />
                </Field>
                <small>Selecione a data e horário</small>
                <CalendarSession name="date" type="date" />
                <Button className="mt-2" onClick={() => getSessions(values)}>
                  Pesquisar
                </Button>
              </Row>
            </FormGroup>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Search;
