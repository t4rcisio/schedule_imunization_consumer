/*

 -> Generate a loading animation

*/

import { Col, Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <Col className="col-md-auto d-flex justify-content-center">
      <Spinner animation="border" role="status"></Spinner>
    </Col>
  );
};

export default Loading;
