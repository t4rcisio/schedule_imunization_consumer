import { ListGroup, ListGroupItem, Card, Badge, Button } from "react-bootstrap";

const SessionCardPatient = ({ params, showPopUp, setId }) => {
  const { sessionId, status, date, name, zipcode, address, district, number } =
    params;
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

const SessionCardClinc = ({ params, showpopUp, setId }) => {
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
                showpopUp(true);
                setId(id);
              }}
            >
              Atendimento Concluído
            </Button>
          )}
        </Card.Footer>
      </Card>
    </ListGroupItem>
  );
};

const SessionCards = ({ sessions, showPopUp, setId, type, changeStatus }) => {
  return (
    <>
      <Card className="mt-5">
        <Card.Header>Meus Agendamentos</Card.Header>
        <Card.Body>
          <ListGroup>
            {sessions.map((session) => {
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
                  id: session.sessionId,
                  status: session.status,
                  name: session.Patient.name,
                  cpf: session.Patient.cpf,
                };

                return (
                  <SessionCardClinc
                    key={session.sessionId}
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
