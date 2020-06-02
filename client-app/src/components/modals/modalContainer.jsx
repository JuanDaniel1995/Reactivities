import React from "react";
import { Modal } from "semantic-ui-react";

const ModalContainer = ({ open, closeModal, content }) => {
  return (
    <Modal open={open} onClose={closeModal} size="mini">
      <Modal.Content>{content}</Modal.Content>
    </Modal>
  );
};

export default ModalContainer;
