import { Field, Formik } from "formik";
import { Badge, Button, Form, FormGroup, Row } from "react-bootstrap";
import CalendarSession from "../calendar/calendarSession.js";
import OptionsForm from "../subcomponents/optionsFormClinic.js";
import axiosClient from "../../utils/axios.js";
import { useState } from "react";
import * as Yup from "yup";

const SearchSchema = Yup.object().shape({
  clinic: Yup.string().required("Selecione uma unidade de saúde"),
  date: Yup.date().required("Preencha o campo com uma data e horário"),
});

const Search = ({ setArraySessions, setError, setErrorServer, setLoading }) => {
  const [token, setToken] = useState(undefined);
  const [dateError, setErrorDate] = useState(false);

  if (localStorage.getItem(process.env.REACT_APP_TOKEN_ID) && !token)
    setToken(localStorage.getItem(process.env.REACT_APP_TOKEN_ID));

  const custonFetch = (params) => {
    setLoading(true);
    axiosClient
      .post("/nurse/search", params, { headers: { token: token } })
      .then((res) => {
        const data = Object.values(res.data);
        if (data.length) {
          setArraySessions(data);
          setError(false);
        } else {
          setArraySessions([]);
          setError(true);
        }
        console.log(res.data);
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
    const { clinic, date } = values;

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
                    if (!Object.values(errors).length) getSessions(values);
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
