import { ListGroup, ListGroupItem, Card, Badge, Button } from "react-bootstrap";

const SessionCard = ({
  status,
  date,
  name,
  zipcode,
  address,
  district,
  number,
}) => {
  const [dateUTC] = date.split(".");

  date = new Date(dateUTC);
  const data = date.toLocaleDateString();
  const [month, day, year] = data.split("/");

  const hour = date.getHours();
  let minutes = date.getMinutes();
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
          <Button
            variant="danger"
            onClick={() => {
              console.log("apagar");
            }}
          >
            Desmarcar
          </Button>
        </Card.Footer>
      </Card>
    </ListGroupItem>
  );
};

const PatientSessionCards = ({ sessions }) => {
  return (
    <>
      <Card className="mt-5">
        <Card.Header>Meus Agendamentos</Card.Header>
        <Card.Body>
          <ListGroup>
            {sessions.map((session) => {
              const params = {
                status: session.status,
                date: session.Session.date,
                ...session.Session.clinic,
              };

              console.log(params);
              return <SessionCard key={session.id} {...params} />;
            })}
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
};

export default PatientSessionCards;
