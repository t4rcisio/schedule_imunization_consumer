import { useState } from "react";
import { Carousel, Container, Image, Nav, Col, Row } from "react-bootstrap";
import NavbarBotton from "../components/navs/navbarBotton";

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
      </Container>
      <NavbarBotton />
    </>
  );
};

export default Home;
