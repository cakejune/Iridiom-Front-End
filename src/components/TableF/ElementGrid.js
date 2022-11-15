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
        <span className="cardAbbr">{element.abbr}</span>
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title>"{element.phrase}"</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-content">
          Meaning: 
          <p>"{element.meaning}"</p>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <sub className="tagSub">Tags:</sub>
          {element.tags.map((tag) => {
            return <sub className="tagSub">| {tag} |</sub>;
          })}
          <Button variant="secondary" className="close" onClick={handleClose}>
            Close
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
