import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cell from "./Cell";
import { useNavigate } from "react-router-dom";

export default function ElementModal({ element, show, handleClose }) {
  const navigate = useNavigate(); // Hook from react-router-dom for navigation (not used in the component).

  // Don't render the modal if there is no element.
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
          {/* Display the phrase of the element */}
          <div className="idiomPhrase">{element.phrase}</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Content inside the body of the modal */}
        <div className="modalBodyContent">
          {/* Display the meaning of the element */}
          <div className="Meaning">{`Meaning: ${element.meaning}`}</div>
          {/* Display the usage of the element */}
          <div className="Usage">{`Usage: ${element.usage}`}</div>
          {/* Display the category of the element */}
          <div className="Category">{`Category: ${element.category}`}</div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        {/* Button to close the modal */}
        <Button variant="secondary" className="close" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
