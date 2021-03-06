/*

 -> Generate session cards

 This componet provide two cards styles,
 1: from Patient view
 2: from Nurse view
*/

import { ListGroup, ListGroupItem, Card, Badge, Button } from "react-bootstrap";

// Patient model card
const SessionCardPatient = ({ params, showPopUp, setId }) => {
  const { sessionId, status, date, name, zipcode, address, district, number } =
    params;

  // Adjust date and time format
  const [dateUTC] = date.split(".");
  const sessionDate = new Date(dateUTC);
  const data = sessionDate.toLocaleDateString();
  const [month, day, year] = data.split("/");

  const hour = sessionDate.getHours();
  let minutes = sessionDate.getMinutes();
  if (minutes === 0) minutes = "00";

  const clinicAddress =
    address + ", " + number + ", " + district + ", " + zipcode;

  return (
    <ListGroupItem className="border-0">
      <Card>
        <Card.Body>
          <p>
            Status:{" "}
            {status === "Scheduled" ? (
              <Badge bg="primary">Marcado</Badge>
            ) : (
              <Badge bg="success">Concluído</Badge>
            )}
          </p>
          <p>
            Date: {day}/{month}/{year} às {hour}:{minutes}
          </p>
          <p>Local : {name}</p>
          <p>
            <small>{clinicAddress}</small>
          </p>
        </Card.Body>
        <Card.Footer>
          {status === "Scheduled" && (
            <Button
              variant="danger"
              onClick={() => {
                showPopUp(true);
                setId(sessionId);
              }}
            >
              Desmarcar
            </Button>
          )}
        </Card.Footer>
      </Card>
    </ListGroupItem>
  );
};

// Nurse session card
const SessionCardClinic = ({ params, showPopUp, setId }) => {
  const { id, name, cpf, status } = params;

  return (
    <ListGroupItem className="border-0">
      <Card>
        <Card.Body>
          <p>
            Status:{" "}
            {status === "Scheduled" ? (
              <Badge bg="primary">Marcado</Badge>
            ) : (
              <Badge bg="success">Concluído</Badge>
            )}
          </p>
          <p>Paciente : {name}</p>
          <p>CPF: {cpf}</p>
        </Card.Body>
        <Card.Footer>
          {status === "Scheduled" && (
            <Button
              variant="danger"
              onClick={() => {
                showPopUp(true);
                setId(id);
              }}
            >
              Marcar como concluído
            </Button>
          )}
        </Card.Footer>
      </Card>
    </ListGroupItem>
  );
};

const SessionCards = ({ sessions, showPopUp, setId, type }) => {
  return (
    <>
      <Card className="mt-5">
        <Card.Header>Meus Agendamentos</Card.Header>
        <Card.Body>
          <ListGroup>
            {sessions.map((session) => {
              // Grenerate itens from array received from database
              if (type === "Patient") {
                const sesId = session.id;
                const params = {
                  sessionId: sesId,
                  status: session.status,
                  date: session.Session.date,
                  ...session.Session.clinic,
                };
                return (
                  <SessionCardPatient
                    key={session.id}
                    params={params}
                    showPopUp={showPopUp}
                    setId={setId}
                  />
                );
              } else if (type === "Clinic") {
                const params = {
                  id: session.id,
                  status: session.status,
                  name: session.Patient.name,
                  cpf: session.Patient.cpf,
                };

                return (
                  <SessionCardClinic
                    key={session.id}
                    params={params}
                    showPopUp={showPopUp}
                    setId={setId}
                  />
                );
              }
            })}
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
};

export default SessionCards;
