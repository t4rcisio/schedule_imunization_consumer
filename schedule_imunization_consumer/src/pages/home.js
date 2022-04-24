import { useState } from "react";
import { Carousel, Container, Image } from "react-bootstrap";
import NavbarBotton from "../components/navs/navbarBotton";

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
