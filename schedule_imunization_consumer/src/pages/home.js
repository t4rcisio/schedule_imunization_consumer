import { useState } from "react";
import { Carousel, Container, Image, Nav, Col, Row } from "react-bootstrap";

const CarouselItem = ({ index }) => {
  return (
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={
          "https://1.cms.s81c.com/sites/default/files/2021-04-09/advice-publichealth-min.jpg"
        }
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
  );
};

const Home = () => {
  const [listImages, setList] = useState([...Array(Number(3)).keys()]);

  if (!listImages.length) setList([...Array(Number(3)).keys()]);
  console.log(listImages);

  const zoom = (element, size) => {
    const data = document.getElementById(element);
    data.style.fontSize = `${size}px`;
  };

  return (
    <>
      <Container>
        {listImages.length && (
          <Carousel>
            {listImages.map((id) => (
              <Carousel.Item>
                <Image
                  fluid
                  className="d-block w-100"
                  src={require(`../../public/images/img${id}.png`)}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>Agende já sua vacinação!</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
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
      </Container>
    </>
  );
};

export default Home;
