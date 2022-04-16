import { Nav, Container, Navbar } from "react-bootstrap";

const NavBar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="ms-auto">
            <Nav.Link href="../patient">Portal do paciente</Nav.Link>
            <Nav.Link href="../nurse">Portal do servidor</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
