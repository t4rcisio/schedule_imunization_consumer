import { useEffect, useState } from "react";
import axiosClient from "../../utils/axios";
import Loading from "./loading.js";

const ClinicLabel = ({ params }) => {
  const { name, id } = params;
  return (
    <option key={name} value={id}>
      {name}
    </option>
  );
};

const OptionsForm = () => {
  const [clinics, setClinics] = useState(undefined);
  const [arrayClinics, setArray] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [searchClinic, setSearchClinic] = useState(true);
  const token = localStorage.getItem(process.env.REACT_APP_TOKEN_ID);

  const getClinics = () => {
    axiosClient["get"]("/clinic/all", { headers: { token: token } })
      .then((res) => {
        if (!res.data.error) {
          setClinics(res.data);
          setArray(Object.values(res.data));
        }
      })
      .catch((err) => {
        setError(err);
      });
  };

  if (searchClinic) {
    setSearchClinic(false);
    getClinics();
  }

  return (
    <>
      {arrayClinics ? (
        <>
          {arrayClinics.map((clinic) => {
            const params = {
              name: clinic.name,
              id: clinic.id,
            };
            return <ClinicLabel key={clinic.name} params={params} />;
          })}
        </>
      ) : null}
    </>
  );
};

export default OptionsForm;
