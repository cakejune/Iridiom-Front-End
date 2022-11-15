import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ElementGrid({ element }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleClick() {
    console.log(element);
    handleShow();
  }

  return (
    <>
      <Modal className="modal" show={show} onHide={handleClose}>
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title>{element.abbr}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-content">{element.phrase}</Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button variant="secondary" className="close" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        className={"elementCategory " + element.category}
        onClick={handleClick}
      >
        <div className="elNumber">{element.elNum}</div>
        <div className="elAbbr">{element.abbr}</div>
      </div>
    </>
  );
}