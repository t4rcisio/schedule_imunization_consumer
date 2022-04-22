import { useState } from "react";
import { Nav, Container, Navbar } from "react-bootstrap";

import ModalSwitch from "./modalSwitch";

const NavBar = () => {
  const [modal, showModal] = useState(false);
  const [link, setLink] = useState(undefined);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="ms-auto">
            <Nav.Link
              href="#"
              onClick={() => {
                setLink("/patient");
                showModal(true);
              }}
            >
              Portal do paciente
            </Nav.Link>
            <Nav.Link
              href="#"
              onClick={() => {
                setLink("/nurse");
                showModal(true);
              }}
            >
              Portal do servidor
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {modal && <ModalSwitch showModal={showModal} link={link} />}
    </>
  );
};

export default NavBar;
