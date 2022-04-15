import { Nav, Container, Row, Col, Navbar } from "react-bootstrap";

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="ms-auto">
            <Nav.Link href="#home">Agendar</Nav.Link>
            <Nav.Link href="#features">Meus agendamentos</Nav.Link>
            <Nav.Link href="#pricing">Portal do servidor</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default App;
