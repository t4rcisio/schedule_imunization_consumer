import { Nav, Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navegate = useNavigate();

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="ms-auto">
            <Nav.Link href="#" onClick={() => navegate("../patient")}>
              Portal do paciente
            </Nav.Link>
            <Nav.Link href="#" onClick={() => navegate("../nurse")}>
              Portal do servidor
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
