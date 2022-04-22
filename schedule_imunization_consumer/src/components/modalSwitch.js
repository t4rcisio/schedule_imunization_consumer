import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ModalSwitch = ({ showModal, link }) => {
  const navegate = useNavigate();

  const clearCredentials = () => {
    localStorage.removeItem(process.env.REACT_APP_TOKEN_ID);
  };

  return (
    <>
      <Modal show={true} fullscreen={"md-down"}>
        <Modal.Header>
          <Modal.Title>Antenção</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Você está prestes a trocar de ambiente, isso requer que você faça
          login novamente!
        </Modal.Body>
        <Modal.Body>
          <Button
            variant="success"
            className="me-3"
            onClick={() => {
              showModal(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="warning"
            onClick={() => {
              clearCredentials();
              showModal(false);
              navegate(link);
            }}
          >
            Continuar
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalSwitch;
