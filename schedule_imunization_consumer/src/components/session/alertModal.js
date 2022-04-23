import { Modal, Button } from "react-bootstrap";

const AlertModal = ({ showModal, cancel, confirm, data }) => {
  return (
    <Modal show={showModal} onHide={showModal}>
      <Modal.Header>
        <Modal.Title>{data.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{data.message}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            cancel();
          }}
        >
          {data.cancel}
        </Button>
        <Button
          variant="warning"
          onClick={() => {
            confirm();
          }}
        >
          {data.confirm}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;
