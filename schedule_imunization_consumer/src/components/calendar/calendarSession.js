/*

 -> Generate a calendar with hour bar

*/

import DatePicker from "react-datepicker";
import { useField, useFormikContext } from "formik";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import pt_br from "date-fns/locale/pt-BR";

// force time zone
registerLocale("br", pt_br);
setDefaultLocale("br");

const CalendarSession = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  const getYear = (date) => date.getFullYear();
  const getMonth = (date) => date.getMonth();

  const years = new Array(getYear(new Date()) - 1900 + 1)
    .fill(undefined)
    .map((_, i) => i + 1900);
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  return (
    <DatePicker
      showTimeSelect
      timeIntervals={60}
      locale="br"
      dateFormat="dd-MM-yyyy HH:mm"
      minDate={new Date()}
      minTime={new Date(0, 0, 0, 8)}
      maxTime={new Date(0, 0, 0, 17)}
      placeholderText="Clique aqui para selecionar uma data"
      renderCustomHeader={({ date, changeYear, changeMonth }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(date) => {
        setFieldValue(field.name, date);
      }}
    />
  );
};

export default CalendarSession;
