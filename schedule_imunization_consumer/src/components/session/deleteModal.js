import { Modal, Button } from "react-bootstrap";

const DeletionModal = ({ showModal, cancel, confirm }) => {
  return (
    <Modal show={showModal} onHide={showModal}>
      <Modal.Header>
        <Modal.Title>Atenção!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Tem certeza que deseja desmarcar essa sessão? <br />A ação não poderá
        ser desfeita!
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            cancel();
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="warning"
          onClick={() => {
            confirm(false);
          }}
        >
          Desmarcar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletionModal;
