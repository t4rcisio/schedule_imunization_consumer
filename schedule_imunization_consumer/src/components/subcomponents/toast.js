import { Row, Col, Toast } from "react-bootstrap";

const ToastNotification = ({ message, showNotification, setShow }) => {
  return (
    <Row className="mt-5">
      <Col>
        <Toast
          onClose={() => setShow(false)}
          show={showNotification}
          delay={5000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Atenção</strong>
          </Toast.Header>
          <Toast.Body>
            Não foi possível fazer as alterações! <br /> Motivo: {message}{" "}
          </Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
};

export default ToastNotification;
