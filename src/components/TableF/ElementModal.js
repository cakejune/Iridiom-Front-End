import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cell from "./Cell";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";

export default function ElementModal({ element, show, handleClose }) {
  // const [selectedElement, setSelectedElement] = useState(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await fetch(`/idioms/${element.id}`);
  //     const response = await data.json();
  //     console.log(response);
  //   };

  //   fetchData().catch(console.error);
  // }, [element]);

  const navigate = useNavigate();

  if (!element) {
    return <></>;
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      style={{ fontFamily: "Roboto Mono, monospace" }}
    >
      <Modal.Header closeButton>
        <Modal.Title className="idiomTitle">
          <Cell element={element} handleClick={null} searched={true} />
          <div className="idiomPhrase">{element.phrase}</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modalBodyContent">
          <div className="Meaning">{`Meaning: ${element.meaning}`}</div>
          <div className="Usage">{`Usage: ${element.usage}`}</div>
          <div className="Category">{`Category: ${element.category}`}</div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" className="edit" onClick={changeHandleClick}>
          Edit
        </Button> */}

        <Button variant="secondary" className="close" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
