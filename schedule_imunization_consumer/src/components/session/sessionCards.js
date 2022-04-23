import { ListGroup, ListGroupItem, Card, Badge, Button } from "react-bootstrap";

const SessionCardPatient = ({ params, setDelete, setIdDeletion }) => {
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
                setDelete(true);
                setIdDeletion(sessionId);
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

const SessionCardClinc = ({ params }) => {
  const { sessionId, name, cpf, status } = params;

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
                alert(sessionId);
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

const SessionCards = ({ sessions, setDelete, setIdDeletion, type }) => {
  return (
    <>
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
                  setDelete={setDelete}
                  setIdDeletion={setIdDeletion}
                />
              );
            } else if (type === "Clinic") {
              const params = {
                sessionId: session.id,
                status: session.status,
                name: session.Patient.name,
                cpf: session.Patient.cpf,
              };

              return (
                <SessionCardClinc key={session.sessionId} params={params} />
              );
            }
          })}
        </ListGroup>
      </Card.Body>
    </>
  );
};

export default SessionCards;
