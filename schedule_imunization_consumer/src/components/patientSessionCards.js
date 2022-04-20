import { ListGroup, ListGroupItem, Card, Badge, Button } from "react-bootstrap";

const SessionCard = ({ params, setDelete, setIdDeletion }) => {
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

const PatientSessionCards = ({ sessions, setDelete, setIdDeletion }) => {
  return (
    <>
      <Card className="mt-5">
        <Card.Header>Meus Agendamentos</Card.Header>
        <Card.Body>
          <ListGroup>
            {sessions.map((session) => {
              const sesId = session.id;
              const params = {
                sessionId: sesId,
                status: session.status,
                date: session.Session.date,
                ...session.Session.clinic,
              };

              return (
                <SessionCard
                  key={session.id}
                  params={params}
                  setDelete={setDelete}
                  setIdDeletion={setIdDeletion}
                />
              );
            })}
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
};

export default PatientSessionCards;
