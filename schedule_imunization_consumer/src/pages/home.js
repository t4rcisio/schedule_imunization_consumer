import { Carousel } from "react-bootstrap";
import img0 from "../components/Images/img0.png";

const Home = () => {
  const images = require.context("../../public/images", true);

  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={img0} alt="First slide" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default Home;
