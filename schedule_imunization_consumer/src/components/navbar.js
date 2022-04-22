import { useState } from "react";
import { Nav, Container, Navbar } from "react-bootstrap";
import ModalSwitch from "./modalSwitch";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [modal, showModal] = useState(false);
  const [link, setLink] = useState(undefined);
  const navegate = useNavigate();

  const switchPage = (page) => {
    if (localStorage.getItem(process.env.REACT_APP_TOKEN_ID)) showModal(true);
    else navegate(page);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="ms-auto">
            <Nav.Link
              href="#"
              onClick={() => {
                setLink("/patient");
                switchPage("/patient");
              }}
            >
              Portal do paciente
            </Nav.Link>
            <Nav.Link
              href="#"
              onClick={() => {
                setLink("/nurse");
                switchPage("/nurse");
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
