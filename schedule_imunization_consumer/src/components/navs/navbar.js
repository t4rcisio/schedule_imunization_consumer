/*

 -> Generate a main navbar to switch pages

*/

import { useState } from "react";
import { Nav, Container, Navbar } from "react-bootstrap";
import ModalSwitch from "../modals/modalSwitch";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const NavBar = () => {
  const [modal, showModal] = useState(false);
  const [link, setLink] = useState(undefined);
  const navegate = useNavigate();

  const switchPage = (page) => {
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN_ID);
    if (token) {
      const payload = jwtDecode(token);
      const { permission } = payload;
      // if user click on current page, nothing happens
      if ("/" + permission === page) navegate(page);
      else showModal(true);
    } else navegate(page);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Nav.Link
          href="#"
          onClick={() => {
            navegate("./");
          }}
        >
          Home
        </Nav.Link>
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
