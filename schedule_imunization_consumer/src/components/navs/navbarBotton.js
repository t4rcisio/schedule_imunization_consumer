/*

 -> Generate a botton bar to show some links

*/

import { Nav, Row, Col } from "react-bootstrap";

const NavbarBotton = () => {
  // Zoom efect on links
  const zoom = (element, size) => {
    const data = document.getElementById(element);
    data.style.fontSize = `${size}px`;
  };

  return (
    <>
      <Nav
        bg="dark"
        variant="dark"
        className=" fixed-bottom justify-content-center"
        style={{ height: "40px" }}
      >
        <Row className="mt-6 text-center">
          <Col>
            <a
              id="linkedinLink"
              href="https://www.linkedin.com/in/t4rcisio/"
              className="text-decoration-none alert-link  m-0 p-0"
              style={{ fontSize: 15 }}
              onMouseOver={() => zoom("linkedinLink", 20)}
              onMouseOut={() => zoom("linkedinLink", 15)}
            >
              Linkedin
            </a>
          </Col>
          <Col>
            <a
              id="gitLink"
              href="https://github.com/t4rcisio"
              className="text-decoration-none alert-link m-0 p-0"
              style={{ fontSize: 15 }}
              //onFocus={() => setSize(25)}
              onMouseOver={() => zoom("gitLink", 20)}
              onMouseOut={() => zoom("gitLink", 15)}
            >
              GitHub
            </a>
          </Col>
        </Row>
      </Nav>
    </>
  );
};

export default NavbarBotton;
