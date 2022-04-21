import { Modal, Button } from "react-bootstrap";

const DeletionModal = ({ showDeletion, cancelDeletion, deleteSession }) => {
  return (
    <Modal show={showDeletion} onHide={showDeletion}>
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
            cancelDeletion();
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="warning"
          onClick={() => {
            deleteSession(false);
          }}
        >
          Desmarcar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletionModal;
