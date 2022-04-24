/*

 -> Generate form to search sessions (nurse page only)

*/

import { Field, Formik } from "formik";
import { Badge, Button, Form, FormGroup, Row } from "react-bootstrap";
import CalendarSession from "../calendar/calendarSession.js";
import OptionsForm from "../subcomponents/optionsFormClinic.js";
import axiosClient from "../../utils/axios.js";
import { useState } from "react";
import * as Yup from "yup";

//input schema validator
const SearchSchema = Yup.object().shape({
  clinic: Yup.string().required("Selecione uma unidade de saúde"),
  date: Yup.date().required("Preencha o campo com uma data e horário"),
});

const Search = ({
  setArraySessions,
  setError,
  setErrorServer,
  setLoading,
  reload,
  setReload,
  setErrorUpdate,
}) => {
  const [token, setToken] = useState(undefined);
  const [dateError, setErrorDate] = useState(false);
  const [paramsData, setParams] = useState(undefined);

  // read token
  if (localStorage.getItem(process.env.REACT_APP_TOKEN_ID) && !token)
    setToken(localStorage.getItem(process.env.REACT_APP_TOKEN_ID));

  const custonFetch = (params) => {
    setLoading(true);

    //conncetion to database
    axiosClient
      .post("/session/search", params, { headers: { token: token } })
      .then((res) => {
        const data = Object.values(res.data);
        if (data.length) {
          setArraySessions(data);
          setError(false);
        } else {
          setArraySessions([]);
          setError(true);
        }
      })
      .catch((err) => {
        setError(false);
        setErrorServer(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getSessions = (values) => {
    setErrorUpdate(false);
    const { clinic, date } = values;

    // Adjust and verify date and time
    const ndate = new Date(date);
    if (ndate <= new Date()) return setErrorDate(true);

    const minutes = ndate.getMinutes();
    if (minutes !== 0) return setErrorDate(true);

    const session_date = ndate.toLocaleDateString();
    const session_time = ndate.getHours();

    const params = {
      clinicId: clinic,
      date: session_date + " " + session_time + ":00",
    };

    custonFetch(params);
  };

  // To reload list after update session
  if (reload) {
    setReload(false);
    getSessions(paramsData);
  }

  return (
    <>
      <Formik
        validationSchema={SearchSchema}
        initialValues={{ clinic: "", date: new Date() }}
      >
        {({ values, errors }) => (
          <Form>
            <FormGroup>
              <Row>
                <small>
                  Escolha a unidade de saúde{" "}
                  {errors.clinic && (
                    <Badge pill bg="warning" text="dark">
                      {errors.clinic}
                    </Badge>
                  )}
                </small>
                <Field as="select" name="clinic">
                  <option value={undefined}>Selecione</option>
                  <OptionsForm />
                </Field>
                <small>
                  Selecione a data e horário{" "}
                  {errors.date && (
                    <Badge pill bg="warning" text="dark">
                      {errors.date}
                    </Badge>
                  )}
                  {dateError && (
                    <Badge pill bg="warning" text="dark">
                      Informe uma data válida
                    </Badge>
                  )}
                </small>
                <CalendarSession name="date" type="date" />
                <Button
                  className="mt-2"
                  onClick={() => {
                    setErrorDate(false);
                    if (!Object.values(errors).length) {
                      setParams(values);
                      getSessions(values);
                    }
                  }}
                >
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
